import Link from 'next/link'
import { ArrowRight, BarChart3, Check, ChevronRight, Flame, Play, Sparkles, Target, TrendingUp, Zap } from 'lucide-react'
import { PageShell } from '@/app/components/page-shell'

const steps = [
  { n: '01', title: 'Find your next opportunity', text: 'See what is gaining attention and choose an idea that fits your audience.', href: '/trends', action: 'Explore opportunities', icon: Flame },
  { n: '02', title: 'Build the video', text: 'Turn the opportunity into a hook, script and simple shot plan in minutes.', href: '/studio', action: 'Open Content Studio', icon: Sparkles },
  { n: '03', title: 'Learn from the result', text: 'After you post, VYRAL shows what worked and what to improve next time.', href: '/analytics', action: 'View performance', icon: BarChart3 },
]

const opportunities = [
  { id:'trend-1', tag:'RISING FAST', title:'The 3-second proof hook', description:'Show the result before the explanation. Strong momentum with manageable competition.', velocity:94, fit:91, competition:'Medium' },
  { id:'trend-2', tag:'EARLY SIGNAL', title:'Show me, then explain it', description:'A visual-first teaching format is gaining momentum with low creator competition.', velocity:87, fit:88, competition:'Low' },
  { id:'trend-3', tag:'RISING', title:'One mistake I would never make again', description:'Confessional storytelling is creating unusually strong comment activity.', velocity:82, fit:85, competition:'Medium' },
]

const videos = [
  { title:'Why I stopped doing this', views:'184.2K', completion:71, delta:'+28%', status:'Strong' },
  { title:'3 things nobody tells you', views:'93.6K', completion:64, delta:'+11%', status:'Healthy' },
  { title:'My biggest mistake', views:'41.2K', completion:58, delta:'-6%', status:'Needs work' },
]

export default function Home(){
  return <PageShell title="Your creator home" description="VYRAL keeps the hard decisions simple: find one good opportunity, make one strong video, then learn from the result.">
    <section className="rounded-[30px] bg-[#111113] p-6 text-white shadow-[0_28px_70px_rgba(17,17,19,.14)] lg:p-9">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#ff6b7e]"><span className="h-1.5 w-1.5 rounded-full bg-[#ff3d55] pulse-dot"/> Start here</div>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[.96] tracking-[-.025em] lg:text-6xl">Know what to make. <em className="text-[#ff6b7e]">Then make it.</em></h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">You do not need to learn the whole platform. Follow the three steps below and VYRAL will guide the next move.</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/[.06] p-5">
          <div className="flex items-center justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-white/35">Today</p><p className="mt-2 text-xl font-semibold">One video is enough.</p></div><Target size={20} className="text-[#ff6b7e]"/></div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-1/3 rounded-full bg-[#ff3d55]"/></div>
          <p className="mt-3 text-[10px] text-white/40">Step 1 of 3 · Find an opportunity</p>
        </div>
      </div>
    </section>

    <section className="mt-10">
      <div className="mb-5"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#ff3d55]">THE SIMPLE LOOP</p><h2 className="mt-1 font-display text-3xl font-semibold tracking-tight lg:text-4xl">Three steps. One clear path.</h2></div>
      <div className="grid gap-3 lg:grid-cols-3">
        {steps.map(({n,title,text,href,action,icon:Icon})=><Link href={href} key={n} className="group rounded-[24px] border border-black/[.08] bg-white p-5 shadow-[0_10px_30px_rgba(17,17,19,.035)] interactive">
          <div className="flex items-center justify-between"><span className="font-mono text-[9px] font-bold text-black/25">{n}</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f6f6f2] text-[#ff3d55]"><Icon size={16}/></span></div>
          <h3 className="mt-8 font-display text-2xl font-semibold leading-tight">{title}</h3><p className="mt-2 text-xs leading-5 text-black/45">{text}</p>
          <div className="mt-6 flex items-center justify-between text-[10px] font-bold"><span>{action}</span><ArrowRight size={14} className="transition group-hover:translate-x-1 group-hover:text-[#ff3d55]"/></div>
        </Link>)}
      </div>
    </section>

    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#ff3d55]">WHAT TO MAKE NEXT</p><h2 className="mt-1 font-display text-3xl font-semibold">Good opportunities for you</h2><p className="mt-1 text-xs text-black/40">Pick one. VYRAL will help you build it.</p></div><Link href="/trends" className="text-[11px] font-semibold text-black/40 hover:text-black">See all →</Link></div>
      <div className="grid gap-4 lg:grid-cols-3">{opportunities.map((o,i)=><Link href={`/studio?trend=${o.id}`} key={o.id} className="group rounded-[24px] border border-black/[.08] bg-white p-5 shadow-[0_10px_30px_rgba(17,17,19,.035)] interactive"><div className="flex items-center justify-between"><span className="text-[9px] font-bold tracking-[.16em] text-[#ff3d55]">{o.tag}</span><span className="font-mono text-[9px] text-black/25">0{i+1}</span></div><h3 className="mt-7 font-display text-2xl font-semibold leading-tight">{o.title}</h3><p className="mt-3 text-xs leading-5 text-black/45">{o.description}</p><div className="mt-6 grid grid-cols-3 gap-2 border-t border-black/[.07] pt-4"><Metric label="Momentum" value={`${o.velocity}%`}/><Metric label="Your fit" value={`${o.fit}%`}/><Metric label="Competition" value={o.competition}/></div><div className="mt-5 flex items-center justify-between text-[10px] font-semibold text-black/40"><span>Build this idea</span><ChevronRight size={14} className="transition group-hover:translate-x-1 group-hover:text-[#ff3d55]"/></div></Link>)}</div>
    </section>

    <section className="mt-12 grid gap-4 xl:grid-cols-[1fr_330px]">
      <div className="rounded-[26px] border border-black/[.08] bg-white p-5 shadow-[0_10px_30px_rgba(17,17,19,.035)] lg:p-6"><div className="flex items-end justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.2em] text-black/35">YOUR LAST RESULTS</p><h2 className="mt-1 font-display text-3xl font-semibold">What happened?</h2></div><Link href="/analytics" className="text-[11px] font-semibold text-black/40 hover:text-black">See all results →</Link></div><div className="mt-5 space-y-1">{videos.map(v=><div key={v.title} className="grid grid-cols-[1fr_auto] gap-4 rounded-2xl p-3 transition hover:bg-[#f6f6f2] md:grid-cols-[1fr_90px_100px_80px]"><div className="min-w-0"><div className="flex items-center gap-2"><Play size={12} className="text-[#ff3d55]"/><p className="truncate text-xs font-bold">{v.title}</p></div><p className="mt-1 text-[10px] text-black/35">{v.status} performance</p></div><div className="hidden md:block"><p className="text-xs font-bold">{v.views}</p><p className="text-[9px] text-black/30">views</p></div><div className="hidden md:block"><p className="text-xs font-bold">{v.completion}%</p><p className="text-[9px] text-black/30">completion</p></div><span className={`self-center text-[10px] font-bold ${v.delta.startsWith('+')?'text-[#19a865]':'text-[#ff3d55]'}`}>{v.delta}</span></div>)}</div></div>
      <div className="rounded-[26px] bg-[#ff3d55] p-6 text-white shadow-[0_20px_50px_rgba(255,61,85,.16)] interactive"><Check size={18}/><p className="mt-5 text-[9px] font-bold uppercase tracking-[.2em] text-white/60">VYRAL tip</p><h3 className="mt-2 font-display text-3xl font-semibold leading-tight">Do not chase everything.</h3><p className="mt-3 text-xs leading-5 text-white/75">Choose one strong opportunity, make it well, and use the result to improve the next one.</p><Link href="/studio" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[11px] font-bold text-black">Create your next video <ArrowRight size={13}/></Link></div>
    </section>

    <section className="mt-12 grid gap-3 sm:grid-cols-3"><Quick icon={Flame} title="Discover" text="Find ideas worth making" href="/trends"/><Quick icon={Sparkles} title="Create" text="Build your next video" href="/studio"/><Quick icon={BarChart3} title="Improve" text="Learn from your results" href="/analytics"/></section>
  </PageShell>
}
function Metric({label,value}:{label:string;value:string}){return <div><p className="text-[8px] font-bold uppercase tracking-wider text-black/30">{label}</p><p className="mt-1 text-[11px] font-bold text-black/75">{value}</p></div>}
function Quick({icon:Icon,title,text,href}:{icon:any;title:string;text:string;href:string}){return <Link href={href} className="group rounded-[22px] border border-black/[.08] bg-white p-5 shadow-[0_10px_30px_rgba(17,17,19,.035)] interactive"><Icon size={17} className="text-[#ff3d55]"/><div className="mt-7 flex items-center justify-between"><div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-[10px] text-black/35">{text}</p></div><ArrowRight size={14} className="text-black/25 transition group-hover:translate-x-0.5 group-hover:text-black"/></div></Link>}
