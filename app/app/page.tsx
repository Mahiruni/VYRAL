import Link from 'next/link'
import { ArrowRight, BarChart3, Check, ChevronRight, Flame, Play, Sparkles } from 'lucide-react'
import { PageShell } from '@/app/components/page-shell'

const opportunities = [
  { id:'trend-1', title:'The 3-second proof hook', description:'Show the result before the explanation. Strong momentum with manageable competition.', velocity:94, fit:91, competition:'Medium' },
  { id:'trend-2', title:'Show me, then explain it', description:'A visual-first teaching format is gaining momentum with low creator competition.', velocity:87, fit:88, competition:'Low' },
  { id:'trend-3', title:'One mistake I would never make again', description:'Confessional storytelling is creating unusually strong comment activity.', velocity:82, fit:85, competition:'Medium' },
]

const videos = [
  { title:'Why I stopped doing this', views:'184.2K', completion:71, delta:'+28%', status:'Strong' },
  { title:'3 things nobody tells you', views:'93.6K', completion:64, delta:'+11%', status:'Healthy' },
  { title:'My biggest mistake', views:'41.2K', completion:58, delta:'-6%', status:'Needs work' },
]

export default function Home(){
  return <PageShell title="Your next move" description="VYRAL puts the decision that matters most in front of you: what should you make next?">
    <section className="grid gap-0 border-y border-black/10 bg-[#111113] text-white lg:grid-cols-[1.15fr_.85fr]">
      <div className="p-7 sm:p-9 lg:p-12"><h2 className="max-w-3xl font-display text-5xl font-semibold leading-[.88] tracking-[-.05em] lg:text-7xl">Make something<br /><em className="text-[#ff6b7e]">worth watching.</em></h2><p className="mt-6 max-w-xl text-sm leading-6 text-white/45">Start with one opportunity. Build one strong video. Then use the response to decide what comes next.</p><Link href="/trends" className="mt-8 inline-flex items-center gap-2 bg-[#ff3d55] px-5 py-3 text-xs font-bold text-white transition hover:bg-white hover:text-black">Find an opportunity <ArrowRight size={14}/></Link></div>
      <div className="border-t border-white/10 p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-12"><p className="font-mono text-[8px] uppercase tracking-[.18em] text-white/30">This week</p><p className="mt-5 font-display text-4xl leading-none">One clear idea.</p><p className="mt-4 max-w-sm text-xs leading-5 text-white/40">Your audience is responding to specific examples. Build the next video around one.</p><div className="mt-10 flex items-end gap-2 border-t border-white/10 pt-7">{[24,36,31,52,45,62,58,76,69,88].map((h,i)=><span key={i} className="flex-1 bg-white/70" style={{height:`${h}px`}}/>)}</div></div>
    </section>

    <section className="mt-14">
      <div className="mb-6 flex items-end justify-between"><div><h2 className="font-display text-4xl font-semibold tracking-[-.035em]">Ideas with a reason to exist.</h2><p className="mt-2 text-xs text-black/40">Chosen for your niche, not just because they are trending.</p></div><Link href="/trends" className="text-[11px] font-semibold text-black/40 hover:text-black">View all →</Link></div>
      <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-3">
        {opportunities.map((o,i)=><Link href={`/studio?trend=${o.id}`} key={o.id} className="group bg-[#f4f3ee] p-6 transition hover:bg-white lg:p-7"><div className="flex items-center justify-between"><span className="font-mono text-[9px] text-black/25">0{i+1}</span><span className="text-[9px] font-bold text-[#ff3d55]">{o.velocity}% momentum</span></div><h3 className="mt-14 font-display text-3xl font-semibold leading-[.95] tracking-[-.03em]">{o.title}</h3><p className="mt-4 text-xs leading-5 text-black/45">{o.description}</p><div className="mt-7 grid grid-cols-3 border-t border-black/10 pt-4"><Metric label="Fit" value={`${o.fit}%`}/><Metric label="Competition" value={o.competition}/><Metric label="Next" value="Build"/></div><div className="mt-7 flex items-center justify-between text-[10px] font-bold"><span>Build this idea</span><ChevronRight size={14} className="transition group-hover:translate-x-1 group-hover:text-[#ff3d55]"/></div></Link>)}
      </div>
    </section>

    <section className="mt-16 grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
      <div><h2 className="font-display text-4xl font-semibold leading-[.9] tracking-[-.035em]">Your work<br />should teach you.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-black/45">Numbers are useful only when they change your next decision.</p><Link href="/analytics" className="mt-6 inline-flex items-center gap-2 text-xs font-bold">Read your results <ArrowRight size={14}/></Link></div>
      <div className="border-t border-black/10">
        {videos.map(v=><div key={v.title} className="grid grid-cols-[1fr_auto] gap-5 border-b border-black/10 py-5 md:grid-cols-[1fr_90px_90px_70px] md:items-center"><div><div className="flex items-center gap-2"><Play size={11} className="text-[#ff3d55]"/><p className="text-xs font-bold">{v.title}</p></div><p className="mt-1 text-[9px] text-black/30">{v.status} performance</p></div><div className="hidden md:block"><p className="text-xs font-bold">{v.views}</p><p className="text-[9px] text-black/30">views</p></div><div className="hidden md:block"><p className="text-xs font-bold">{v.completion}%</p><p className="text-[9px] text-black/30">completion</p></div><span className={`self-center text-[10px] font-bold ${v.delta.startsWith('+')?'text-[#19a865]':'text-[#ff3d55]'}`}>{v.delta}</span></div>)}
      </div>
    </section>

    <section className="mt-16 border-t border-black/10 pt-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-display text-3xl font-semibold">What do you want to do?</h2><p className="mt-1 text-xs text-black/40">Everything else is underneath.</p></div><div className="flex flex-wrap gap-2"><Quick icon={Flame} title="Discover" href="/trends"/><Quick icon={Sparkles} title="Create" href="/studio"/><Quick icon={BarChart3} title="Results" href="/analytics"/></div></div></section>
  </PageShell>
}
function Metric({label,value}:{label:string;value:string}){return <div><p className="text-[8px] font-bold uppercase tracking-wider text-black/30">{label}</p><p className="mt-1 text-[11px] font-bold text-black/75">{value}</p></div>}
function Quick({icon:Icon,title,href}:{icon:any;title:string;href:string}){return <Link href={href} className="group inline-flex items-center gap-2 border border-black/10 bg-white px-4 py-3 text-[10px] font-bold transition hover:border-black hover:bg-black hover:text-white"><Icon size={13} className="text-[#ff3d55] group-hover:text-white"/>{title}<ArrowRight size={12} className="transition group-hover:translate-x-0.5"/></Link>}
