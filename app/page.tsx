import Link from 'next/link'
import { ArrowUpRight, Flame, Play, TrendingUp } from 'lucide-react'
import { PageShell, EmptyState } from '@/app/components/page-shell'

const demoTrends = [
  { id: 'trend-1', status: 'RISING', category: 'Creator Economy', title: 'The 3-second proof hook', velocity: 94, niche_fit: 91, competition: 'Medium' },
  { id: 'trend-2', status: 'EARLY', category: 'Education', title: 'Show me, then explain it', velocity: 87, niche_fit: 88, competition: 'Low' },
  { id: 'trend-3', status: 'RISING', category: 'Storytelling', title: 'One mistake I would never make again', velocity: 82, niche_fit: 85, competition: 'Medium' },
]

const demoVideos = [
  { views: 184200, completion_rate: 71 },
  { views: 93600, completion_rate: 64 },
  { views: 41200, completion_rate: 58 },
]

export default function Home() {
  const totalViews = demoVideos.reduce((n, v) => n + v.views, 0)
  const avgCompletion = Math.round(demoVideos.reduce((n, v) => n + v.completion_rate, 0) / demoVideos.length)
  const name = 'Mahir'

  return <PageShell title={`Good to see you, ${name}.`} description="Demo mode is active. Explore VYRAL with sample creator intelligence while integrations are being connected.">
    <div className="mb-6 rounded-xl border border-[#e5484d]/20 bg-[#e5484d]/5 p-4 text-sm text-zinc-300">
      <span className="font-semibold text-[#e5484d]">DEMO MODE</span> — VYRAL is running without Supabase/TikTok credentials. All numbers below are sample data.
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      <Stat icon={Flame} label="Signals available" value={String(demoTrends.length)} sub="Sample trend intelligence" />
      <Stat icon={Play} label="Views tracked" value={totalViews.toLocaleString()} sub="3 sample videos" />
      <Stat icon={TrendingUp} label="Avg. completion" value={`${avgCompletion}%`} sub="Across sample videos" />
    </div>
    <div className="mt-8 grid gap-7 xl:grid-cols-[1.5fr_.85fr]">
      <section><div className="flex items-end justify-between border-b border-white/10 pb-3"><div><p className="eyebrow">THE RADAR</p><h2 className="mt-1 font-display text-3xl">Worth looking at</h2></div><Link href="/trends" className="text-xs text-zinc-500 hover:text-white">See all signals ↗</Link></div>
        <div className="divide-y divide-white/10">{demoTrends.map((t,i)=><div key={t.id} className="group py-5"><div className="grid gap-4 md:grid-cols-[44px_1fr_auto] md:items-start"><span className="font-mono text-xs text-zinc-600">0{i+1}</span><div><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">{t.status} · {t.category}</span></div><h3 className="mt-2 max-w-xl font-display text-2xl leading-tight group-hover:text-[#e5484d]">{t.title}</h3><div className="mt-3 flex gap-5 text-xs text-zinc-500"><span>Velocity <b className="text-zinc-200">{t.velocity}%</b></span><span>Fit <b className="text-zinc-200">{t.niche_fit}%</b></span><span>Competition <b className="text-zinc-200">{t.competition}</b></span></div></div><Link href={`/studio?trend=${t.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white">Make something <ArrowUpRight size={13}/></Link></div></div>)}</div>
      </section>
      <aside className="border-l-0 border-white/10 xl:border-l xl:pl-7"><p className="eyebrow">NEXT MOVE</p><h2 className="mt-1 font-display text-3xl">What now?</h2><div className="mt-6"><p className="text-sm leading-6 text-zinc-500">Your strongest demo opportunity is the 3-second proof hook. Turn it into a short-form video while the signal is rising.</p><Link href="/studio" className="mt-5 inline-flex items-center gap-2 border-b border-[#e5484d] pb-1 text-xs font-semibold">Open Content Studio <ArrowUpRight size={13}/></Link></div></aside>
    </div>
    <div className="mt-10 border-t border-white/10 pt-5"><div className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-zinc-500"><Link href="/trends" className="hover:text-white">Trend Radar</Link><Link href="/studio" className="hover:text-white">Content Studio</Link><Link href="/analytics" className="hover:text-white">Analytics</Link><Link href="/competitors" className="hover:text-white">Competitors</Link><Link href="/calendar" className="hover:text-white">Calendar</Link></div></div>
  </PageShell>
}

function Stat({icon:Icon,label,value,sub}:{icon:any;label:string;value:string;sub:string}){return <div className="glass rounded-xl p-5 shadow-glow"><Icon size={17} className="text-zinc-500"/><p className="mt-7 font-mono text-[10px] uppercase tracking-wider text-zinc-600">{label}</p><p className="mt-1 font-display text-3xl">{value}</p><p className="mt-1 text-xs text-zinc-600">{sub}</p></div>}
