import Link from 'next/link'
import { ArrowUpRight, BarChart3, CalendarDays, Flame, Play, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PageShell, EmptyState } from '@/app/components/page-shell'

export default async function Home() {
 const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser()
 if (!user) return <EmptyState title="Sign in to VYRAL" description="Your workspace is private and metrics come from your connected creator account. Nothing is fabricated." href="/login" action="Sign in"/>
 const [{ data: profile }, { data: trends }, { data: videos }, { data: scheduled }] = await Promise.all([
  supabase.from('creator_profiles').select('*').eq('user_id',user.id).maybeSingle(),
  supabase.from('trends').select('*').order('score',{ascending:false}).order('detected_at',{ascending:false}).limit(3),
  supabase.from('videos').select('*').eq('user_id',user.id).order('published_at',{ascending:false}).limit(20),
  supabase.from('scheduled_posts').select('*').eq('user_id',user.id).in('status',['draft','queued']).order('scheduled_for').limit(1)
 ])
 const totalViews=(videos||[]).reduce((n,v)=>n+(v.views||0),0); const avgCompletion=videos?.length?Math.round(videos.reduce((n,v)=>n+(v.completion_rate||0),0)/videos.length):0
 const hasCreator=!!profile; const greeting=user.email?.split('@')[0] || 'creator'
 return <PageShell title={`Good to see you, ${profile?.display_name || greeting}.`} description="Real signals from your workspace. Connect your TikTok account and publish data to unlock the intelligence layer.">
  {!hasCreator && <div className="mb-5"><EmptyState title="Finish creator setup" description="Tell VYRAL your niche and connect TikTok before it calculates Creator DNA, opportunities and recommendations." href="/onboarding" action="Set up creator"/></div>}
  <div className="grid gap-4 md:grid-cols-3"><Stat icon={Flame} label="Live opportunities" value={trends?.length ? String(trends.length) : '—'} sub={trends?.length?'Signals currently available':'Waiting for trend data'}/><Stat icon={Play} label="Tracked views" value={totalViews?totalViews.toLocaleString():'—'} sub={videos?.length?`${videos.length} videos tracked`:'Connect TikTok to import videos'}/><Stat icon={TrendingUp} label="Avg completion" value={videos?.length?`${avgCompletion}%`:'—'} sub={videos?.length?'Across tracked videos':'No performance history yet'}/></div>
  <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
   <div className="glass rounded-2xl p-5 lg:p-6"><div className="flex items-center justify-between"><div><p className="eyebrow">TOP OPPORTUNITIES</p><h2 className="mt-2 font-display text-xl font-bold">What VYRAL sees now</h2></div><Link href="/trends" className="text-xs text-zinc-500 hover:text-white">Open radar →</Link></div>{trends?.length ? <div className="mt-5 space-y-3">{trends.map(t=><div key={t.id} className="rounded-xl border border-white/6 bg-white/[.02] p-4"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2"><span className="rounded bg-white/5 px-2 py-1 text-[9px] font-bold uppercase">{t.status}</span><span className="text-[11px] text-zinc-600">{t.category}</span></div><h3 className="mt-3 font-semibold">{t.title}</h3></div><strong className="font-display text-xl">{t.score}<span className="text-xs text-zinc-600">/100</span></strong></div><div className="mt-4 grid grid-cols-3 gap-3 text-xs"><Metric k="Velocity" v={`${t.velocity}%`}/><Metric k="Niche fit" v={`${t.niche_fit}%`}/><Metric k="Competition" v={t.competition}/></div></div>)}</div>:<EmptyState title="No trend intelligence yet" description="VYRAL will not invent trends. Add an approved trend data source to populate this workspace." href="/settings" action="Open settings"/>}</div>
   <div className="glass rounded-2xl p-5 lg:p-6"><p className="eyebrow">NEXT ACTION</p><h2 className="mt-2 font-display text-xl font-bold">Your queue</h2>{scheduled?.[0]?<div className="mt-5 rounded-xl bg-white/[.03] p-4"><p className="font-semibold">{scheduled[0].caption || 'Scheduled post'}</p><p className="mt-2 text-xs text-zinc-500">{new Date(scheduled[0].scheduled_for).toLocaleString()}</p><Link href="/calendar" className="mt-4 inline-flex text-xs font-bold text-rose-300">Open calendar <ArrowUpRight size={14}/></Link></div>:<div className="mt-5"><EmptyState title="Nothing queued" description="Create a content idea or schedule a post when you are ready." href="/studio" action="Open Content Studio"/></div>}</div>
  </div>
  <div className="mt-5 grid gap-4 sm:grid-cols-4"><Quick href="/trends" icon={Flame} title="Trend Radar"/><Quick href="/studio" icon={Sparkles} title="Content Studio"/><Quick href="/analytics" icon={BarChart3} title="Analytics"/><Quick href="/competitors" icon={Users} title="Competitors"/></div>
 </PageShell>
}
function Stat({icon:Icon,label,value,sub}:{icon:any;label:string;value:string;sub:string}){return <div className="glass rounded-2xl p-5"><Icon size={18} className="text-zinc-400"/><p className="mt-5 text-xs text-zinc-600">{label}</p><p className="mt-1 font-display text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-zinc-500">{sub}</p></div>}
function Metric({k,v}:{k:string;v:string}){return <div><p className="text-zinc-600">{k}</p><p className="mt-1 font-semibold text-zinc-200">{v}</p></div>}
function Quick({href,icon:Icon,title}:{href:string;icon:any;title:string}){return <Link href={href} className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/[.05]"><Icon size={17}/><span className="text-sm font-semibold">{title}</span><ArrowUpRight size={14} className="ml-auto text-zinc-600"/></Link>}
