import Link from 'next/link'
import { ArrowRight, BarChart3, ChevronRight, Flame, Play, Sparkles } from 'lucide-react'
import { PageShell, EmptyState } from '@/app/components/page-shell'
import { requireUser } from '@/lib/auth'

type Trend={id:string;title:string;category:string|null;score:number|null;velocity:number|null;niche_fit:number|null;competition:string|null;status:string|null}

type Video={id:string;title:string|null;views:number|null;likes:number|null;comments:number|null;shares:number|null;completion_rate:number|null;published_at:string|null}

export default async function Home(){
  const {supabase,user}=await requireUser()
  const [{data:trends},{data:videos},{data:profile},{data:posts}]=await Promise.all([
    supabase.from('trends').select('id,title,category,score,velocity,niche_fit,competition,status').order('score',{ascending:false,nullsFirst:false}).limit(12),
    supabase.from('videos').select('id,title,views,likes,comments,shares,completion_rate,published_at').eq('user_id',user.id).order('published_at',{ascending:false}).limit(6),
    supabase.from('creator_profiles').select('creator_score,niche,best_format,best_hook,sweet_spot,top_pillar').eq('user_id',user.id).maybeSingle(),
    supabase.from('scheduled_posts').select('id,caption,scheduled_for,status').eq('user_id',user.id).order('scheduled_for').limit(4),
  ])
  const opportunities=((trends||[]) as Trend[]).map(t=>({...t,opportunity:Math.round((t.score||0)*.45+(t.niche_fit||0)*.35+(t.velocity||0)*.2)})).sort((a,b)=>b.opportunity-a.opportunity).slice(0,3)
  const tracked=(videos||[]) as Video[]
  const totalViews=tracked.reduce((n,v)=>n+(v.views||0),0)
  const totalEngagement=tracked.reduce((n,v)=>n+(v.likes||0)+(v.comments||0)+(v.shares||0),0)
  const avgCompletion=tracked.filter(v=>v.completion_rate!=null).reduce((n,v)=>n+(v.completion_rate||0),0)/(tracked.filter(v=>v.completion_rate!=null).length||1)
  const topVideo=[...tracked].sort((a,b)=>(b.views||0)-(a.views||0))[0]
  const next=opportunities[0]

  return <PageShell title="Your next move" description="A working view of your creator account. If VYRAL does not have the data, it will say so.">
    <section className="grid gap-0 border-y border-black/10 bg-[#111113] text-white lg:grid-cols-[1.15fr_.85fr]">
      <div className="p-7 sm:p-9 lg:p-12">
        <p className="eyebrow text-white/35">RECOMMENDED NEXT MOVE</p>
        {next ? <><h2 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[.88] tracking-[-.05em] lg:text-7xl">{next.title}</h2><p className="mt-6 max-w-xl text-sm leading-6 text-white/45">{next.category||'Creator signal'} · {next.opportunity}/100 opportunity. VYRAL ranked it from the signal momentum and available niche fit.</p><Link href={`/studio?trend=${encodeURIComponent(next.id)}`} className="mt-8 inline-flex items-center gap-2 bg-[#ff3d55] px-5 py-3 text-xs font-bold text-white transition hover:bg-white hover:text-black">Build this idea <ArrowRight size={14}/></Link></> : <><h2 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[.88] tracking-[-.05em] lg:text-7xl">Nothing to chase yet.</h2><p className="mt-6 max-w-xl text-sm leading-6 text-white/45">Your recommendation feed needs verified signals. Connect TikTok and sync your account, or wait for your trend source to populate.</p><Link href="/trends" className="mt-8 inline-flex items-center gap-2 bg-[#ff3d55] px-5 py-3 text-xs font-bold text-white transition hover:bg-white hover:text-black">Check the radar <ArrowRight size={14}/></Link></>}
      </div>
      <div className="border-t border-white/10 p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-12"><p className="font-mono text-[8px] uppercase tracking-[.18em] text-white/30">Creator DNA</p><p className="mt-5 font-display text-4xl leading-none">{profile?.creator_score!=null?`${profile.creator_score}/100`:'Not scored yet'}</p><p className="mt-4 max-w-sm text-xs leading-5 text-white/40">{profile?.best_format?`Your strongest known format is ${profile.best_format}.`:'Import enough videos for VYRAL to establish a baseline.'}</p><div className="mt-10 grid grid-cols-3 border-t border-white/10 pt-7"><Small label="Videos" value={String(tracked.length)}/><Small label="Views" value={totalViews?totalViews.toLocaleString():'—'}/><Small label="Completion" value={avgCompletion?`${Math.round(avgCompletion)}%`:'—'}/></div></div>
    </section>

    <section className="mt-14">
      <div className="mb-6 flex items-end justify-between"><div><h2 className="font-display text-4xl font-semibold tracking-[-.035em]">Ideas with a reason to exist.</h2><p className="mt-2 text-xs text-black/40">Only verified signals from your workspace appear here.</p></div><Link href="/trends" className="text-[11px] font-semibold text-black/40 hover:text-black">View radar →</Link></div>
      {opportunities.length ? <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-3">{opportunities.map((o,i)=><Link href={`/studio?trend=${encodeURIComponent(o.id)}`} key={o.id} className="group bg-[#f4f3ee] p-6 transition hover:bg-white lg:p-7"><div className="flex items-center justify-between"><span className="font-mono text-[9px] text-black/25">0{i+1}</span><span className="text-[9px] font-bold text-[#ff3d55]">{o.velocity??'—'} momentum</span></div><h3 className="mt-14 font-display text-3xl font-semibold leading-[.95] tracking-[-.03em]">{o.title}</h3><p className="mt-4 text-xs leading-5 text-black/45">{o.category||'Creator signal'} · {o.competition||'competition unknown'} competition.</p><div className="mt-7 grid grid-cols-3 border-t border-black/10 pt-4"><Metric label="Opportunity" value={`${o.opportunity}/100`}/><Metric label="Fit" value={o.niche_fit!=null?`${o.niche_fit}%`:'—'}/><Metric label="Next" value="Build"/></div><div className="mt-7 flex items-center justify-between text-[10px] font-bold"><span>Build from signal</span><ChevronRight size={14} className="transition group-hover:translate-x-1 group-hover:text-[#ff3d55]"/></div></Link>)}</div> : <EmptyState title="The recommendation shelf is empty" description="VYRAL will not fill this area with invented trends. Connect TikTok and sync real data, then verified opportunities can appear here." href="/trends" action="Open trend radar"/>}
    </section>

    <section className="mt-16 grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
      <div><h2 className="font-display text-4xl font-semibold leading-[.9] tracking-[-.035em]">Your work<br />should teach you.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-black/45">{tracked.length?`Across ${tracked.length} imported videos, VYRAL has ${totalViews.toLocaleString()} tracked views and ${totalEngagement.toLocaleString()} recorded likes, comments and shares.`:'Import your videos first. VYRAL only diagnoses performance it can actually measure.'}</p><Link href="/analytics" className="mt-6 inline-flex items-center gap-2 text-xs font-bold">Read your results <ArrowRight size={14}/></Link></div>
      <div className="border-t border-black/10">{tracked.length?tracked.map(v=><div key={v.id} className="grid grid-cols-[1fr_auto] gap-5 border-b border-black/10 py-5 md:grid-cols-[1fr_90px_90px_70px] md:items-center"><div><div className="flex items-center gap-2"><Play size={11} className="text-[#ff3d55]"/><p className="text-xs font-bold">{v.title||'Untitled video'}</p></div><p className="mt-1 text-[9px] text-black/30">{v.published_at?new Date(v.published_at).toLocaleDateString():'Date unavailable'}</p></div><div className="hidden md:block"><p className="text-xs font-bold">{v.views!=null?v.views.toLocaleString():'—'}</p><p className="text-[9px] text-black/30">views</p></div><div className="hidden md:block"><p className="text-xs font-bold">{v.completion_rate!=null?`${v.completion_rate}%`:'—'}</p><p className="text-[9px] text-black/30">completion</p></div><span className="self-center text-[10px] font-bold text-black/35">{v.likes!=null?v.likes.toLocaleString():'—'} likes</span></div>):<div className="py-10 text-sm text-black/35">No imported videos yet. Your dashboard stays honest until TikTok data arrives.</div>}</div>
    </section>

    <section className="mt-16 border-t border-black/10 pt-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-display text-3xl font-semibold">What do you want to do?</h2><p className="mt-1 text-xs text-black/40">{posts?.length?`${posts.length} scheduled item${posts.length===1?'':'s'} in your queue.`:'Nothing scheduled yet.'}</p></div><div className="flex flex-wrap gap-2"><Quick icon={Flame} title="Discover" href="/trends"/><Quick icon={Sparkles} title="Create" href="/studio"/><Quick icon={BarChart3} title="Results" href="/analytics"/></div></div></section>
  </PageShell>
}
function Metric({label,value}:{label:string;value:string}){return <div><p className="text-[8px] font-bold uppercase tracking-wider text-black/30">{label}</p><p className="mt-1 text-[11px] font-bold text-black/75">{value}</p></div>}
function Small({label,value}:{label:string;value:string}){return <div><p className="text-[8px] font-bold uppercase tracking-wider text-white/30">{label}</p><p className="mt-1 text-xs font-bold">{value}</p></div>}
function Quick({icon:Icon,title,href}:{icon:any;title:string;href:string}){return <Link href={href} className="group inline-flex items-center gap-2 border border-black/10 bg-white px-4 py-3 text-[10px] font-bold transition hover:border-black hover:bg-black hover:text-white"><Icon size={13} className="text-[#ff3d55] group-hover:text-white"/>{title}<ArrowRight size={12} className="transition group-hover:translate-x-0.5"/></Link>}
