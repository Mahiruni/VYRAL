import Link from 'next/link'
import { ArrowUpRight, Flame, Play, TrendingUp, Sparkles, Clock3, Stethoscope, ChevronRight } from 'lucide-react'
import { PageShell } from '@/app/components/page-shell'

const opportunities = [
  { id:'trend-1', tag:'RISING FAST', title:'The 3-second proof hook', description:'Show the result before the explanation. Your niche is under-supplied on this format.', velocity:94, fit:91, competition:'Medium', eta:'Best within 24h' },
  { id:'trend-2', tag:'EARLY SIGNAL', title:'Show me, then explain it', description:'A visual-first teaching format is gaining momentum with low creator competition.', velocity:87, fit:88, competition:'Low', eta:'Best within 48h' },
  { id:'trend-3', tag:'RISING', title:'One mistake I would never make again', description:'Confessional storytelling is creating unusually strong comment activity.', velocity:82, fit:85, competition:'Medium', eta:'Best within 72h' },
]

const videos = [
  { title:'Why I stopped doing this', views:'184.2K', completion:71, delta:'+28%', status:'Strong' },
  { title:'3 things nobody tells you', views:'93.6K', completion:64, delta:'+11%', status:'Healthy' },
  { title:'My biggest mistake', views:'41.2K', completion:58, delta:'-6%', status:'Needs work' },
]

export default function Home(){
  return <PageShell title="Good to see you, Mahir." description="Your growth system is ready. Here are the moves with the highest potential right now.">
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#ff3151]/20 bg-gradient-to-r from-[#ff3151]/[.09] via-white/[.025] to-transparent p-4">
      <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff3151]/15 text-[#ff3151]"><Sparkles size={17}/></div><div><p className="text-xs font-semibold">Demo intelligence is active</p><p className="mt-0.5 text-[11px] text-white/35">Sample signals are being used until TikTok integrations are connected.</p></div></div>
      <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[.16em] text-white/35">Demo mode</span>
    </div>

    <section className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
      <div className="relative overflow-hidden rounded-[24px] border border-white/[.08] bg-gradient-to-br from-white/[.07] via-white/[.025] to-[#ff3151]/[.035] p-6 lg:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#ff3151]/10 blur-3xl"/>
        <div className="relative"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.2em] text-[#ff3151]"><span className="h-1.5 w-1.5 rounded-full bg-[#ff3151]"/> Your next move</div><h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.02] lg:text-5xl">Turn the <em>3-second proof hook</em> into your next video.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/40">It has the strongest combination of momentum, niche fit and manageable competition in your current radar.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/studio?trend=trend-1" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-black transition hover:scale-[1.02]">Build this video <ArrowUpRight size={14}/></Link><Link href="/trends" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-semibold text-white/65 hover:bg-white/[.05]">Explore opportunities</Link></div></div>
      </div>
      <div className="rounded-[24px] border border-white/[.08] bg-[#0d0d0f] p-6"><div className="flex items-center justify-between"><div><p className="text-[9px] uppercase tracking-[.2em] text-white/30">Growth pulse</p><p className="mt-2 font-display text-4xl">+28%</p></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300"><TrendingUp size={18}/></div></div><div className="mt-8 h-20 flex items-end gap-1.5">{[28,35,32,48,44,57,51,68,64,78,73,92].map((h,i)=><span key={i} className="flex-1 rounded-t bg-white/[.12]" style={{height:`${h}%`}}/> )}</div><div className="mt-3 flex justify-between text-[10px] text-white/25"><span>Last 12 posts</span><span>Views momentum</span></div></div>
    </section>

    <section className="mt-10"><div className="flex items-end justify-between mb-4"><div><p className="text-[9px] uppercase tracking-[.2em] text-[#ff3151]">01 / OPPORTUNITIES</p><h2 className="mt-1 font-display text-3xl">Worth acting on</h2></div><Link href="/trends" className="text-[11px] text-white/35 hover:text-white">View radar →</Link></div>
      <div className="grid gap-3 lg:grid-cols-3">{opportunities.map((o,i)=><Link href={`/studio?trend=${o.id}`} key={o.id} className="group rounded-[20px] border border-white/[.08] bg-white/[.025] p-5 transition hover:-translate-y-1 hover:border-white/[.16] hover:bg-white/[.04]"><div className="flex items-center justify-between"><span className="text-[9px] font-bold tracking-[.16em] text-[#ff3151]">{o.tag}</span><span className="font-mono text-[9px] text-white/20">0{i+1}</span></div><h3 className="mt-7 font-display text-2xl leading-tight group-hover:text-white">{o.title}</h3><p className="mt-3 text-xs leading-5 text-white/35">{o.description}</p><div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/[.07] pt-4"><Metric label="Velocity" value={`${o.velocity}%`}/><Metric label="Niche fit" value={`${o.fit}%`}/><Metric label="Competition" value={o.competition}/></div><div className="mt-5 flex items-center justify-between text-[10px] text-white/30"><span>{o.eta}</span><ChevronRight size={14} className="transition group-hover:translate-x-1 group-hover:text-[#ff3151]"/></div></Link>)}</div>
    </section>

    <section className="mt-10 grid gap-4 xl:grid-cols-[1fr_360px]">
      <div className="rounded-[24px] border border-white/[.08] bg-white/[.02] p-5 lg:p-6"><div className="flex items-center justify-between"><div><p className="text-[9px] uppercase tracking-[.2em] text-white/30">02 / PERFORMANCE DOCTOR</p><h2 className="mt-1 font-display text-2xl">Your recent videos</h2></div><Link href="/analytics" className="text-[11px] text-white/35 hover:text-white">Open analytics →</Link></div><div className="mt-5 space-y-1">{videos.map((v,i)=><div key={v.title} className="grid grid-cols-[1fr_auto] gap-4 rounded-xl p-3 transition hover:bg-white/[.035] md:grid-cols-[1fr_90px_100px_80px]"><div className="min-w-0"><div className="flex items-center gap-2"><Play size={12} className="text-[#ff3151]"/><p className="truncate text-xs font-semibold">{v.title}</p></div><p className="mt-1 text-[10px] text-white/25">{v.status} performance</p></div><div className="hidden md:block"><p className="text-xs font-semibold">{v.views}</p><p className="text-[9px] text-white/25">views</p></div><div className="hidden md:block"><p className="text-xs font-semibold">{v.completion}%</p><p className="text-[9px] text-white/25">completion</p></div><span className={`self-center text-[10px] font-semibold ${v.delta.startsWith('+')?'text-emerald-300':'text-[#ff8b98]'}`}>{v.delta}</span></div>)}</div></div>
      <div className="rounded-[24px] border border-white/[.08] bg-[#0d0d0f] p-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3151]/10 text-[#ff3151]"><Stethoscope size={18}/></div><p className="mt-5 text-[9px] uppercase tracking-[.2em] text-white/30">AI diagnosis</p><h3 className="mt-2 font-display text-2xl">Your hook is the bottleneck.</h3><p className="mt-3 text-xs leading-5 text-white/35">Your strongest videos retain attention early. The weakest drops happen before the first 2 seconds.</p><Link href="/studio" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-white">Open Hook Lab <ArrowUpRight size={13}/></Link></div>
    </section>

    <section className="mt-10 grid gap-3 sm:grid-cols-3"><Quick icon={Flame} title="Find a signal" text="Scan emerging trends" href="/trends"/><Quick icon={Sparkles} title="Make a video" text="Generate your content kit" href="/studio"/><Quick icon={Clock3} title="Plan your week" text="Find the best windows" href="/calendar"/></section>
  </PageShell>
}

function Metric({label,value}:{label:string;value:string}){return <div><p className="text-[8px] uppercase tracking-wider text-white/25">{label}</p><p className="mt-1 text-[11px] font-semibold text-white/75">{value}</p></div>}
function Quick({icon:Icon,title,text,href}:{icon:any;title:string;text:string;href:string}){return <Link href={href} className="group rounded-2xl border border-white/[.07] bg-white/[.02] p-4 hover:bg-white/[.04]"><Icon size={16} className="text-[#ff3151]"/><div className="mt-5 flex items-center justify-between"><div><p className="text-xs font-semibold">{title}</p><p className="mt-1 text-[10px] text-white/30">{text}</p></div><ArrowUpRight size={14} className="text-white/20 group-hover:text-white"/></div></Link>}
