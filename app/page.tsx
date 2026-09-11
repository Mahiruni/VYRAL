import Link from 'next/link'
import { ArrowUpRight, BarChart3, Flame, Play, Sparkles, TrendingUp, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PageShell, EmptyState } from '@/app/components/page-shell'

export default async function Home() {
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser()
 if(!user)return <EmptyState title="Sign in to VYRAL" description="Your workspace is private. VYRAL only shows signals it can actually source." href="/login" action="Sign in"/>
 const [{data:profile},{data:trends},{data:videos},{data:scheduled}]=await Promise.all([
  supabase.from('creator_profiles').select('*').eq('user_id',user.id).maybeSingle(),
  supabase.from('trends').select('*').order('score',{ascending:false}).order('detected_at',{ascending:false}).limit(3),
  supabase.from('videos').select('*').eq('user_id',user.id).order('published_at',{ascending:false}).limit(50),
  supabase.from('scheduled_posts').select('*').eq('user_id',user.id).in('status',['draft','queued']).order('scheduled_for').limit(1)
 ])
 const totalViews=(videos||[]).reduce((n,v)=>n+(v.views||0),0)
 const avgCompletion=videos?.length?Math.round(videos.reduce((n,v)=>n+(v.completion_rate||0),0)/videos.length):0
 const name=profile?.display_name||user.email?.split('@')[0]||'creator'
 return <PageShell title={`Good to see you, ${name}.`} description="A working view of your creator account. If VYRAL doesn't have the data, it will say so.">
  {!profile&&<div className="mb-6"><EmptyState title="Start with your Creator DNA" description="Tell VYRAL what you make and who you make it for. This becomes the context behind every recommendation." href="/onboarding" action="Set up Creator DNA"/></div>}
  <div className="grid gap-4 md:grid-cols-3"><Stat icon={Flame} label="Signals available" value={trends?.length?String(trends.length):'—'} sub={trends?.length?'From the connected trend feed':'No approved trend feed connected'}/><Stat icon={Play} label="Views tracked" value={totalViews?totalViews.toLocaleString():'—'} sub={videos?.length?`${videos.length} recent videos`:'Connect TikTok to import videos'}/><Stat icon={TrendingUp} label="Avg. completion" value={videos?.length?`${avgCompletion}%`:'—'} sub={videos?.length?'Across imported videos':'Waiting for performance data'}/></div>
  <div className="mt-8 grid gap-7 xl:grid-cols-[1.5fr_.85fr]">
   <section><div className="flex items-end justify-between border-b border-white/10 pb-3"><div><p className="eyebrow">THE RADAR</p><h2 className="mt-1 font-display text-3xl">Worth looking at</h2></div><Link href="/trends" className="text-xs text-zinc-500 hover:text-white">See all signals ↗</Link></div>
   {trends?.length?<div className="divide-y divide-white/10">{trends.map((t,i)=><div key={t.id} className="group py-5"><div className="grid gap-4 md:grid-cols-[44px_1fr_auto] md:items-start"><span className="font-mono text-xs text-zinc-600">0{i+1}</span><div><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">{t.status} · {t.category}</span></div><h3 className="mt-2 max-w-xl font-display text-2xl leading-tight group-hover:text-[#e5484d]">{t.title}</h3><div className="mt-3 flex gap-5 text-xs text-zinc-500"><span>Velocity <b className="text-zinc-200">{t.velocity}%</b></span><span>Fit <b className="text-zinc-200">{t.niche_fit}%</b></span><span>Competition <b className="text-zinc-200">{t.competition}</b></span></div></div><Link href={`/studio?trend=${t.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white">Make something <ArrowUpRight size={13}/></Link></div></div>)}</div>:<EmptyState title="The radar is quiet" description="No trend feed is connected yet. VYRAL will not manufacture trends to fill the screen." href="/settings" action="Check connections"/>}</section>
   <aside className="border-l-0 border-white/10 xl:border-l xl:pl-7"><p className="eyebrow">NEXT MOVE</p><h2 className="mt-1 font-display text-3xl">What now?</h2>{scheduled?.[0]?<div className="mt-6"><p className="text-sm font-semibold">{scheduled[0].caption||'Scheduled post'}</p><p className="mt-2 font-mono text-[11px] text-zinc-500">{new Date(scheduled[0].scheduled_for).toLocaleString()}</p><Link href="/calendar" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#e5484d]">Open your calendar <ArrowUpRight size={13}/></Link></div>:<div className="mt-6"><p className="text-sm leading-6 text-zinc-500">There is nothing waiting in the queue. That is fine. The next useful step is to make something worth posting.</p><Link href="/studio" className="mt-5 inline-flex items-center gap-2 border-b border-[#e5484d] pb-1 text-xs font-semibold">Open Content Studio <ArrowUpRight size={13}/></Link></div>}</aside>
  </div>
  <div className="mt-10 border-t border-white/10 pt-5"><div className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-zinc-500"><Link href="/trends" className="hover:text-white">Trend Radar</Link><Link href="/studio" className="hover:text-white">Content Studio</Link><Link href="/analytics" className="hover:text-white">Analytics</Link><Link href="/competitors" className="hover:text-white">Competitors</Link><Link href="/calendar" className="hover:text-white">Calendar</Link></div></div>
 </PageShell>
}
function Stat({icon:Icon,label,value,sub}:{icon:any;label:string;value:string;sub:string}){return <div className="glass rounded-xl p-5 shadow-glow"><Icon size={17} className="text-zinc-500"/><p className="mt-7 font-mono text-[10px] uppercase tracking-wider text-zinc-600">{label}</p><p className="mt-1 font-display text-3xl">{value}</p><p className="mt-1 text-xs text-zinc-600">{sub}</p></div>}
