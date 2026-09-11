import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { decryptToken } from '@/lib/tiktok'

export const dynamic = 'force-dynamic'

const API = 'https://open.tiktokapis.com/v2'

async function tiktokFetch(path: string, token: string, init?: RequestInit) {
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })
}

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'You need to sign in first.' }, { status: 401 })

  const { data: account, error: accountError } = await supabase
    .from('tiktok_accounts')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  if (accountError) return NextResponse.json({ error: accountError.message }, { status: 500 })
  if (!account) return NextResponse.json({ error: 'Connect TikTok before syncing.' }, { status: 400 })

  if (account.access_token_expires_at && new Date(account.access_token_expires_at).getTime() <= Date.now()) {
    return NextResponse.json({ error: 'Your TikTok connection has expired. Reconnect TikTok to continue syncing.' }, { status: 401 })
  }

  let accessToken: string
  try {
    accessToken = decryptToken(account.access_token_encrypted)
  } catch {
    return NextResponse.json({ error: 'The stored TikTok connection cannot be opened. Please reconnect TikTok.' }, { status: 500 })
  }

  const profileRes = await tiktokFetch('/user/info/?fields=open_id,display_name,avatar_url,follower_count', accessToken)
  const profileJson = await profileRes.json()
  if (!profileRes.ok || profileJson?.error?.code) {
    return NextResponse.json({ error: 'TikTok did not return your profile. Reconnect TikTok and try again.' }, { status: 502 })
  }

  const profile = profileJson?.data?.user
  if (profile) {
    const { error } = await supabase.from('creator_profiles').upsert({
      user_id: user.id,
      display_name: profile.display_name ?? account.display_name ?? null,
      follower_count: typeof profile.follower_count === 'number' ? profile.follower_count : null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const fields = 'id,create_time,title,video_description,duration,cover_image_url,share_url,like_count,comment_count,share_count,view_count'
  const videos: any[] = []
  let cursor: string | undefined
  let pages = 0

  do {
    const body: Record<string, unknown> = { max_count: 20 }
    if (cursor) body.cursor = cursor
    const response = await tiktokFetch(`/video/list/?fields=${fields}`, accessToken, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const json = await response.json()
    if (!response.ok || json?.error?.code) {
      return NextResponse.json({ error: json?.error?.message || 'TikTok video sync failed.' }, { status: 502 })
    }
    videos.push(...(json?.data?.videos || []))
    cursor = json?.data?.has_more ? json?.data?.cursor : undefined
    pages += 1
  } while (cursor && pages < 5)

  if (videos.length) {
    const rows = videos.map((video) => ({
      user_id: user.id,
      tiktok_video_id: video.id,
      title: video.title || video.video_description || null,
      published_at: video.create_time ? new Date(Number(video.create_time) * 1000).toISOString() : null,
      views: Number.isFinite(video.view_count) ? video.view_count : null,
      likes: Number.isFinite(video.like_count) ? video.like_count : null,
      comments: Number.isFinite(video.comment_count) ? video.comment_count : null,
      shares: Number.isFinite(video.share_count) ? video.share_count : null,
      avg_watch_time: null,
      completion_rate: null,
    }))
    const { error } = await supabase.from('videos').upsert(rows, { onConflict: 'user_id,tiktok_video_id' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    synced: videos.length,
    profile: {
      display_name: profile?.display_name ?? account.display_name ?? null,
      follower_count: profile?.follower_count ?? null,
    },
    synced_at: new Date().toISOString(),
  })
}
