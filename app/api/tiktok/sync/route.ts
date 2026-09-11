import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { decryptToken } from '@/lib/tiktok'

export const dynamic = 'force-dynamic'
const API = 'https://open.tiktokapis.com/v2'

async function tiktokFetch(path: string, token: string, init?: RequestInit) {
  return fetch(`${API}${path}`, { ...init, headers: { Authorization: `Bearer ${token}`, ...(init?.headers || {}) }, cache: 'no-store' })
}

function classify(title: string) {
  const t = title.toLowerCase()
  if (/how|tutorial|tips|guide|steps|learn/.test(t)) return 'How-to / educational'
  if (/story|storytime|experience|when i|my /.test(t)) return 'Story / personal'
  if (/review|\bvs\b|versus|test|testing|unbox/.test(t)) return 'Review / comparison'
  if (/day in|routine|morning|night|vlog/.test(t)) return 'Lifestyle / vlog'
  if (/mistake|things|reasons|ways|tips/.test(t)) return 'List / advice'
  return 'Other / mixed'
}

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'You need to sign in first.' }, { status: 401 })
  const { data: account, error: accountError } = await supabase.from('tiktok_accounts').select('*').eq('user_id', user.id).maybeSingle()
  if (accountError) return NextResponse.json({ error: accountError.message }, { status: 500 })
  if (!account) return NextResponse.json({ error: 'Connect TikTok before syncing.' }, { status: 400 })
  if (account.access_token_expires_at && new Date(account.access_token_expires_at).getTime() <= Date.now()) return NextResponse.json({ error: 'Your TikTok connection has expired. Reconnect TikTok to continue syncing.' }, { status: 401 })

  let accessToken: string
  try { accessToken = decryptToken(account.access_token_encrypted) } catch { return NextResponse.json({ error: 'The stored TikTok connection cannot be opened. Please reconnect TikTok.' }, { status: 500 }) }

  const profileRes = await tiktokFetch('/user/info/?fields=open_id,display_name,avatar_url', accessToken)
  const profileJson = await profileRes.json()
  if (!profileRes.ok || profileJson?.error?.code) return NextResponse.json({ error: 'TikTok did not return your profile. Reconnect TikTok and try again.' }, { status: 502 })
  const profile = profileJson?.data?.user
  if (profile) {
    const { error } = await supabase.from('creator_profiles').upsert({ user_id: user.id, display_name: profile.display_name ?? account.display_name ?? null, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const fields = 'id,create_time,title,video_description,like_count,comment_count,share_count,view_count'
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
    const rows = videos.map(video => ({ user_id: user.id, tiktok_video_id: video.id as string, title: (video.title || video.video_description || null) as string | null, published_at: video.create_time ? new Date(Number(video.create_time) * 1000).toISOString() : null, views: typeof video.view_count === 'number' ? video.view_count : null, likes: typeof video.like_count === 'number' ? video.like_count : null, comments: typeof video.comment_count === 'number' ? video.comment_count : null, shares: typeof video.share_count === 'number' ? video.share_count : null, avg_watch_time: null, completion_rate: null }))
    const { error } = await supabase.from('videos').upsert(rows, { onConflict: 'user_id,tiktok_video_id' })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: stored } = await supabase.from('videos').select('title,views,likes,comments,shares,published_at').eq('user_id', user.id).order('published_at', { ascending: false }).limit(100)
  const tracked = stored || []
  const measured = tracked.filter(v => typeof v.views === 'number' && v.views > 0)
  const totalViews = measured.reduce((n, v) => n + Number(v.views), 0)
  const avgViews = measured.length ? totalViews / measured.length : 0
  const ranked = [...measured].sort((a, b) => Number(b.views) - Number(a.views))
  const top = ranked.slice(0, Math.max(1, Math.ceil(ranked.length * 0.2)))
  const formatMap = new Map<string, { count: number; views: number }>()
  for (const v of tracked) { const key = classify(v.title || ''); const item = formatMap.get(key) || { count: 0, views: 0 }; item.count++; item.views += Number(v.views || 0); formatMap.set(key, item) }
  const bestFormat = [...formatMap.entries()].filter(([, x]) => x.views > 0).sort((a, b) => b[1].views / b[1].count - a[1].views / a[1].count)[0]?.[0] || null
  const bestHook = top[0]?.title || null
  const creatorScore = measured.length >= 3 ? Math.min(99, Math.max(1, Math.round(35 + Math.log10(Math.max(avgViews, 1)) * 8))) : null
  const dna = { creator_score: creatorScore, best_format: bestFormat, best_hook: bestHook, sweet_spot: measured.length ? `${Math.round(avgViews).toLocaleString()} average views` : null, top_pillar: null }
  const syncedAt = new Date().toISOString()
  const { error: dnaError } = await supabase.from('creator_profiles').update({ creator_score: dna.creator_score, best_format: dna.best_format, best_hook: dna.best_hook, sweet_spot: dna.sweet_spot, top_pillar: dna.top_pillar, updated_at: syncedAt }).eq('user_id', user.id)
  if (dnaError) return NextResponse.json({ error: dnaError.message }, { status: 500 })
  await supabase.from('tiktok_accounts').update({ last_synced_at: syncedAt, updated_at: syncedAt }).eq('user_id', user.id)
  return NextResponse.json({ ok: true, synced: videos.length, total_tracked: tracked.length, creator_dna: dna, synced_at: syncedAt })
}
