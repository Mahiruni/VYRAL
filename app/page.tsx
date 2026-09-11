import Link from 'next/link'
import { ArrowUpRight, BarChart3, Check, ChevronRight, Flame, Menu, Play, Sparkles, Target, Zap } from 'lucide-react'

const creators = [
  { name: 'Amara', role: 'Beauty & lifestyle', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85', tone: 'left-[4%] top-[10%] rotate-[-6deg]' },
  { name: 'Noah', role: 'Fitness', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85', tone: 'right-[5%] top-[3%] rotate-[5deg]' },
  { name: 'Maya', role: 'Food & travel', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85', tone: 'left-[16%] bottom-[3%] rotate-[5deg]' },
  { name: 'Daniel', role: 'Tech & business', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85', tone: 'right-[16%] bottom-[8%] rotate-[-5deg]' },
]

const signals = [
  ['01', 'Spot the signal', 'See what is accelerating in your niche before the feed becomes crowded.'],
  ['02', 'Build the angle', 'Turn a trend into a hook, structure and content kit that still sounds like you.'],
  ['03', 'Learn the pattern', 'Understand why your posts hold attention — and where viewers disappear.'],
]

export default function MarketingHome() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f6f2] text-[#111113]">
      <nav className="relative z-30 mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="VYRAL home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#111113] text-white"><Zap size={16} fill="currentColor" /></span>
          <span className="font-display text-2xl font-semibold tracking-[-.04em]">VYRAL</span>
        </Link>
        <div className="hidden items-center gap-8 text-[11px] font-semibold text-black/55 md:flex">
          <a href="#how-it-works" className="transition hover:text-black">How it works</a>
          <a href="#intelligence" className="transition hover:text-black">Creator intelligence</a>
          <a href="#proof" className="transition hover:text-black">Built for creators</a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-full px-4 py-2.5 text-[11px] font-bold text-black/55 transition hover:bg-white hover:text-black sm:block">Sign in</Link>
          <Link href="/app" className="inline-flex items-center gap-2 rounded-full bg-[#111113] px-4 py-2.5 text-[11px] font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5">Open VYRAL <ArrowUpRight size={13} /></Link>
        </div>
      </nav>

      <section className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-10 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
        <div className="absolute left-[-12%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#ff3d55]/10 blur-3xl" />
        <div className="absolute right-[-8%] top-[4%] h-[380px] w-[380px] rounded-full bg-[#315cff]/8 blur-3xl" />
        <div className="grid items-center gap-12 lg:grid-cols-[.93fr_1.07fr] lg:gap-4">
          <div className="relative z-10 max-w-[650px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-black/50 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff3d55] pulse-dot" /> The creator growth system
            </div>
            <h1 className="font-display text-[clamp(4rem,8.5vw,7.8rem)] font-semibold leading-[.84] tracking-[-.055em]">Make your next <em className="text-[#ff3d55]">move</em> count.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-black/55 sm:text-lg">VYRAL turns the noise around TikTok growth into a clear system: find the right signal, build a sharper video, then learn from what actually happened.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/app" className="inline-flex items-center gap-2 rounded-full bg-[#ff3d55] px-6 py-3.5 text-xs font-bold text-white shadow-[0_14px_40px_rgba(255,61,85,.22)] transition hover:-translate-y-1">Start creating <ArrowUpRight size={14} /></Link>
              <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-6 py-3.5 text-xs font-bold transition hover:bg-white">See the system <ChevronRight size={14} /></a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-semibold text-black/38">
              <span className="inline-flex items-center gap-2"><Check size={13} className="text-[#19a865]" /> Niche-aware signals</span>
              <span className="inline-flex items-center gap-2"><Check size={13} className="text-[#19a865]" /> Hook intelligence</span>
              <span className="inline-flex items-center gap-2"><Check size={13} className="text-[#19a865]" /> Performance diagnosis</span>
            </div>
          </div>

          <div className="relative mx-auto h-[590px] w-full max-w-[650px] lg:h-[650px]">
            <div className="absolute left-1/2 top-1/2 h-[78%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-[46%] bg-[#111113] shadow-[0_40px_100px_rgba(17,17,19,.18)]" />
            <div className="absolute left-1/2 top-1/2 z-10 flex h-[58%] w-[42%] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-[32px] border border-white/15 bg-[#18181b] p-5 text-white shadow-2xl">
              <div className="flex items-center justify-between"><span className="font-display text-xl">VYRAL</span><span className="rounded-full bg-white/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[.15em] text-white/45">Live radar</span></div>
              <div><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#ff6b7e]">Signal detected</p><p className="mt-3 font-display text-4xl leading-[.95]">The proof is the hook.</p><div className="mt-5 flex items-end gap-1.5">{[25,38,34,52,48,67,61,84,76,94].map((h, i) => <span key={i} className="flex-1 rounded-t bg-white/80" style={{ height: `${h}%` }} />)}</div></div>
              <div className="rounded-2xl bg-white/[.06] p-3"><div className="flex items-center justify-between text-[9px]"><span className="text-white/40">Momentum</span><strong className="text-[#72e2a8]">+94%</strong></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[94%] rounded-full bg-[#ff3d55]" /></div></div>
            </div>
            {creators.map((creator, i) => <div key={creator.name} className={`absolute z-20 h-[174px] w-[126px] overflow-hidden rounded-[22px] border-[5px] border-[#f6f6f2] bg-white shadow-[0_20px_50px_rgba(17,17,19,.17)] ${creator.tone} float`} style={{ animationDelay: `${i * 240}ms` }}><img src={creator.image} alt={`${creator.name}, ${creator.role} creator`} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-white"><p className="text-[10px] font-bold">{creator.name}</p><p className="text-[8px] text-white/65">{creator.role}</p></div></div>)}
            <div className="absolute bottom-[18%] left-[1%] z-30 rounded-2xl border border-black/10 bg-white/90 p-3 shadow-xl backdrop-blur interactive"><div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-xl bg-[#ff3d55]/10 text-[#ff3d55]"><Flame size={15} /></div><div><p className="text-[9px] font-bold">Your niche is moving</p><p className="mt-0.5 text-[8px] text-black/35">3 signals worth testing</p></div></div></div>
            <div className="absolute right-[1%] bottom-[20%] z-30 rounded-2xl bg-[#ff3d55] px-4 py-3 text-white shadow-xl shadow-[#ff3d55]/20"><p className="font-mono text-[8px] uppercase tracking-[.16em] text-white/55">Creator fit</p><p className="mt-1 font-display text-2xl">91<span className="text-sm">%</span></p></div>
          </div>
        </div>
      </section>

      <section id="proof" className="border-y border-black/[.07] bg-white/45">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px bg-black/[.07] sm:grid-cols-4">
          {[['01', 'Signal', 'Know what is worth making'], ['02', 'Angle', 'Turn insight into a hook'], ['03', 'Feedback', 'See what held attention'], ['04', 'Momentum', 'Build a repeatable system']].map(([n, title, text]) => <div key={n} className="bg-[#f6f6f2] px-5 py-7 sm:px-7"><p className="font-mono text-[8px] text-black/25">{n}</p><p className="mt-5 text-[11px] font-bold">{title}</p><p className="mt-1 text-[9px] leading-4 text-black/40">{text}</p></div>)}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#ff3d55]">01 / THE SYSTEM</p><h2 className="mt-3 max-w-md font-display text-5xl font-semibold leading-[.94] tracking-[-.04em] sm:text-6xl">Less guessing. More signal.</h2><p className="mt-5 max-w-md text-sm leading-6 text-black/45">A serious creator platform should not ask you to stare at dashboards and hope. VYRAL turns your data and the moving feed into decisions you can act on.</p></div>
          <div className="grid gap-3">{signals.map(([n, title, text]) => <div key={n} className="group rounded-[26px] border border-black/[.08] bg-white p-6 shadow-[0_12px_35px_rgba(17,17,19,.035)] interactive sm:p-7"><div className="flex items-start gap-5"><span className="font-mono text-[9px] text-[#ff3d55]">{n}</span><div className="flex-1"><h3 className="font-display text-3xl font-semibold">{title}</h3><p className="mt-2 max-w-lg text-xs leading-5 text-black/40">{text}</p></div><ArrowUpRight size={16} className="text-black/20 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#ff3d55]" /></div></div>)}</div>
        </div>
      </section>

      <section id="intelligence" className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[38px] bg-[#111113] text-white shadow-[0_30px_90px_rgba(17,17,19,.16)]">
          <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-14">
            <div><div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#ff6b7e]"><Sparkles size={13} /> Creator intelligence</div><h2 className="mt-5 max-w-2xl font-display text-5xl font-semibold leading-[.92] tracking-[-.04em] sm:text-6xl">Your content deserves a better feedback loop.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/50">VYRAL connects trend momentum, niche fit, hook quality and post performance so you can stop treating every upload like a fresh experiment.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/app" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-black">Explore the dashboard <ArrowUpRight size={14} /></Link><span className="inline-flex items-center rounded-full border border-white/10 px-4 py-3 text-[9px] font-bold uppercase tracking-[.15em] text-white/45">Built for TikTok creators</span></div></div>
            <div className="relative min-h-[330px] rounded-[28px] border border-white/10 bg-white/[.035] p-5"><div className="absolute right-6 top-5 text-right"><p className="font-mono text-[8px] uppercase tracking-[.15em] text-white/30">Growth pulse</p><p className="mt-1 font-display text-5xl text-white">+28%</p></div><div className="absolute inset-x-5 bottom-6"><div className="mb-4 flex items-end gap-2">{[25,34,29,48,41,55,49,64,59,73,68,88].map((h, i) => <span key={i} className="flex-1 rounded-t bg-white/75" style={{ height: `${h * 2.1}px` }} />)}</div><div className="flex justify-between border-t border-white/10 pt-3 text-[8px] uppercase tracking-[.15em] text-white/25"><span>12 recent posts</span><span>Attention momentum</span></div></div><div className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-xl bg-[#ff3d55]/15 text-[#ff6b7e]"><BarChart3 size={17} /></div></div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/[.07]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#111113] text-white"><Zap size={12} fill="currentColor" /></span><span className="font-display text-xl font-semibold">VYRAL</span></div><p className="text-[9px] text-black/30">Engineer the opportunity. Create with intention.</p><Link href="/app" className="inline-flex items-center gap-1 text-[10px] font-bold">Open creator dashboard <ArrowUpRight size={12} /></Link></div>
      </footer>
    </main>
  )
}
