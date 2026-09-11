import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { decryptToken } from '@/lib/tiktok'

export const dynamic = 'force-dynamic'
const API = 'https://open.tiktokapis.com/v2'

async function tiktokFetch(path: string, token: string, init?: RequestInit) {
  return fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init?.headers || {}) },
    cache: 'no-store',
  })
}

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'You need to sign in first.' }, { status: 401 })

  const { data: account, error: accountError } = await supabase.from('tiktok_accounts').select('*').eq('user_id', user.id).maybeSingle()
  if (accountError) return NextResponse.json({ error: accountError.message }, { status: 500 })
  if (!account) return NextResponse.json({ error: 'Connect TikTok before syncing.' }, { status: 400 })
  if (account.access_token_expires_at && new Date(account.access_token_expires_at).getTime() <= Date.now()) {
    return NextResponse.json({ error: 'Your TikTok connection has expired. Reconnect TikTok to continue syncing.' }, { status: 401 })
  }

  let accessToken: string
  try { accessToken = decryptToken(account.access_token_encrypted) }
  catch { return NextResponse.json({ error: 'The stored TikTok connection cannot be opened. Please reconnect TikTok.' }, { status: 500 }) }

  // Keep this request inside the basic scope we ask for by default. Additional
  // profile/stat fields should only be requested after TikTok approves those scopes.
  const profileRes = await tiktokFetch('/user/info/?fields=open_id,display_name,avatar_url', accessToken)
  const profileJson = await profileRes.json()
  if (!profileRes.ok || profileJson?.error?.code) return NextResponse.json({ error: 'TikTok did not return your profile. Reconnect TikTok and try again.' }, { status: 502 })
  const profile = profileJson?.data?.user

  if (profile) {
    const { error } = await supabase.from('creator_profiles').upsert({ user_id: user.id, display_name: profile.display_name ?? account.display_name ?? null, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const fields = 'id,create_time,title,video_description,duration,cover_image_url,share_url,like_count,comment_count,share_count,view_count'
  const videos: Record<string, unknown>[] = []
  let cursor: string | undefined
  let pages = 0
  do {
    const body: Record<string, unknown> = { max_count: 20 }
    if (cursor) body.cursor = cursor
    const response = await tiktokFetch(`/video/list/?fields=${fields}`, accessToken, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const json = await response.json()
    if (!response.ok || json?.error?.code) return NextResponse.json({ error: json?.error?.message || 'TikTok video sync failed.' }, { status: 502 })
    videos.push(...((json?.data?.videos || []) as Record<string, unknown>[]))
    cursor = json?.data?.has_more ? json?.data?.cursor : undefined
    pages += 1
  } while (cursor && pages < 5)

  if (videos.length) {
    const rows = videos.map((video) => ({
      user_id: user.id,
      tiktok_video_id: video.id as string,
      title: (video.title || video.video_description || null) as string | null,
      published_at: video.create_time ? new Date(Number(video.create_time) * 1000).toISOString() : null,
      views: typeof video.view_count === 'number' ? video.view_count : null,
      likes: typeof video.like_count === 'number' ? video.like_count : null,
      comments: typeof video.comment_count === 'number' ? video.comment_count : null,
      shares: typeof video.share_count === 'number' ? video.share_count : null,
      avg_watch_time: null,
      completion_rate: null,
    }))
    const { error } = await supabase.from('videos').upsert(rows, { onConflict: 'user_id,tiktok_video_id' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const syncedAt = new Date().toISOString()
  await supabase.from('tiktok_accounts').update({ last_synced_at: syncedAt, updated_at: syncedAt }).eq('user_id', user.id)
  return NextResponse.json({ ok: true, synced: videos.length, profile: { display_name: profile?.display_name ?? account.display_name ?? null }, synced_at: syncedAt })
}
