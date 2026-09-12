'use server'

import { requireUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

function tagsFrom(title: string, niche?: string | null) {
  const base = ['tiktok', 'creator', 'fyp']
  const words = title.toLowerCase().match(/[a-z0-9]+/g)?.filter((w) => w.length > 3).slice(0, 3) ?? []
  if (niche) base.push(niche.toLowerCase().replace(/\s+/g, ''))
  return Array.from(new Set([...base, ...words])).slice(0, 7)
}

export async function createIdea(formData: FormData) {
  const { supabase, user } = await requireUser()
  const title = String(formData.get('title') || '').trim()
  const hook = String(formData.get('hook') || '').trim()
  const script = String(formData.get('script') || '').trim()
  const caption = String(formData.get('caption') || '').trim()
  const hashtags = String(formData.get('hashtags') || '').split(/[ ,]+/).map(x => x.replace(/^#/, '')).filter(Boolean)
  const trendId = String(formData.get('trend_id') || '').trim() || null

  if (!title || !hook) redirect('/studio?error=Title%20and%20hook%20are%20required')

  const { error } = await supabase.from('content_ideas').insert({
    user_id: user.id,
    title,
    hook,
    script,
    caption,
    hashtags,
    trend_id: trendId,
  })

  if (error) redirect(`/studio?error=${encodeURIComponent(error.message)}`)
  redirect('/studio?saved=1')
}

export async function generateContentKit(formData: FormData) {
  const { supabase, user } = await requireUser()
  const trendId = String(formData.get('trend_id') || '').trim()
  if (!trendId) redirect('/studio?error=Choose%20a%20verified%20opportunity%20first')

  const [{ data: trend }, { data: profile }] = await Promise.all([
    supabase.from('trends').select('id,title,category,score,niche_fit,competition').eq('id', trendId).maybeSingle(),
    supabase.from('creator_profiles').select('niche,best_format,best_hook').eq('user_id', user.id).maybeSingle(),
  ])

  if (!trend) redirect('/studio?error=That%20opportunity%20is%20no%20longer%20available')

  const niche = profile?.niche || trend.category || 'your niche'
  const format = profile?.best_format || 'short, visual explainer'
  const hook = `If you make ${niche} content, stop scrolling — try this before everyone else does.`
  const title = `${trend.title}: a ${format} test`
  const script = [
    hook,
    '',
    `Open with the result in the first 2 seconds. Then show one concrete example related to ${trend.title.toLowerCase()}.`,
    '',
    'Explain the lesson in one sentence. Cut anything that does not move the story forward.',
    '',
    'Close with: “Would you try this? Tell me why.”',
  ].join('\n')
  const caption = `${trend.title}. I would test this now while the signal is still moving. What would you change?`
  const hashtags = tagsFrom(trend.title, profile?.niche)

  const { error } = await supabase.from('content_ideas').insert({
    user_id: user.id,
    trend_id: trend.id,
    title,
    hook,
    script,
    caption,
    hashtags,
    score: Number(trend.score || 0),
  })

  if (error) redirect(`/studio?trend=${trend.id}&error=${encodeURIComponent(error.message)}`)
  redirect(`/studio?trend=${trend.id}&generated=1`)
}

export async function scheduleIdea(formData: FormData) {
  const { supabase, user } = await requireUser()
  const contentIdeaId = String(formData.get('content_idea_id') || '').trim()
  const scheduledFor = String(formData.get('scheduled_for') || '').trim()
  if (!contentIdeaId || !scheduledFor) redirect('/studio?error=Choose%20content%20and%20a%20posting%20time')

  const { data: idea } = await supabase.from('content_ideas').select('id,caption').eq('id', contentIdeaId).eq('user_id', user.id).maybeSingle()
  if (!idea) redirect('/studio?error=That%20content%20idea%20was%20not%20found')

  const { error } = await supabase.from('scheduled_posts').insert({
    user_id: user.id,
    content_idea_id: idea.id,
    scheduled_for: new Date(scheduledFor).toISOString(),
    status: 'queued',
    caption: idea.caption,
  })

  if (error) redirect(`/studio?error=${encodeURIComponent(error.message)}`)
  redirect('/calendar?scheduled=1')
}
