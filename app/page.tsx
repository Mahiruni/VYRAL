import Link from 'next/link'
import { ArrowUpRight, Check, Play, Zap } from 'lucide-react'

const people = [
  { name: 'Amara', role: 'Beauty', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88' },
  { name: 'Noah', role: 'Fitness', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88' },
  { name: 'Maya', role: 'Food', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=88' },
]

export default function MarketingHome() {
  return (
    <main className="min-h-screen bg-[#f4f3ee] text-[#111113]">
      <nav className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="VYRAL home">
          <span className="grid h-9 w-9 place-items-center bg-[#111113] text-white"><Zap size={15} fill="currentColor" /></span>
          <span className="font-display text-2xl font-semibold tracking-[-.04em]">VYRAL</span>
        </Link>
        <div className="hidden items-center gap-9 text-[11px] font-semibold text-black/50 md:flex">
          <a href="#why" className="hover:text-black">Why VYRAL</a>
          <a href="#how" className="hover:text-black">How it works</a>
          <a href="#creators" className="hover:text-black">For creators</a>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/login" className="hidden text-[11px] font-bold text-black/55 hover:text-black sm:block">Sign in</Link>
          <Link href="/app" className="inline-flex items-center gap-2 bg-[#111113] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#ff3d55]">Open VYRAL <ArrowUpRight size={13} /></Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-[1380px] items-center gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-12 lg:pb-28 lg:pt-16">
        <div className="max-w-[680px]">
          <p className="mb-7 text-[10px] font-bold uppercase tracking-[.22em] text-[#ff3d55]">Made for people who make things</p>
          <h1 className="font-display text-[clamp(4.4rem,8.6vw,8rem)] font-semibold leading-[.82] tracking-[-.06em]">Grow without <em className="text-[#ff3d55]">guessing.</em></h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-black/55 sm:text-lg">Find what people are watching. Turn it into your next video. Then see exactly what worked.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/app" className="inline-flex items-center gap-2 bg-[#ff3d55] px-6 py-3.5 text-xs font-bold text-white transition hover:bg-[#111113]">Start creating <ArrowUpRight size={14} /></Link>
            <a href="#how" className="inline-flex items-center gap-2 text-xs font-bold text-black/55 hover:text-black"><Play size={14} fill="currentColor" /> See how it works</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-black/10 pt-5 text-[10px] font-semibold text-black/45">
            <span className="inline-flex items-center gap-2"><Check size={13} /> Find ideas worth making</span>
            <span className="inline-flex items-center gap-2"><Check size={13} /> Build stronger hooks</span>
            <span className="inline-flex items-center gap-2"><Check size={13} /> Learn from every post</span>
          </div>
        </div>

        <div className="relative min-h-[520px] lg:min-h-[650px]">
          <div className="absolute inset-x-[13%] top-[7%] h-[86%] overflow-hidden bg-[#161618]">
            <img src={people[0].image} alt="Creator" className="h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
          <div className="absolute left-[2%] top-[15%] w-[30%] overflow-hidden border-[6px] border-[#f4f3ee] bg-white shadow-[0_22px_55px_rgba(17,17,19,.15)]">
            <img src={people[1].image} alt="Creator" className="aspect-[4/5] w-full object-cover" />
            <div className="flex items-center justify-between px-3 py-2"><span className="text-[9px] font-bold">NOAH</span><span className="font-mono text-[8px] text-black/35">FITNESS</span></div>
          </div>
          <div className="absolute bottom-[7%] right-[1%] w-[34%] overflow-hidden border-[6px] border-[#f4f3ee] bg-white shadow-[0_22px_55px_rgba(17,17,19,.15)]">
            <img src={people[2].image} alt="Creator" className="aspect-[4/5] w-full object-cover" />
            <div className="flex items-center justify-between px-3 py-2"><span className="text-[9px] font-bold">MAYA</span><span className="font-mono text-[8px] text-black/35">FOOD</span></div>
          </div>
          <div className="absolute bottom-[16%] left-[13%] bg-[#ff3d55] px-4 py-3 text-white shadow-[0_16px_35px_rgba(17,17,19,.14)]">
            <p className="font-mono text-[8px] uppercase tracking-[.16em] text-white/60">Worth making</p>
            <p className="mt-1 font-display text-2xl">91%</p>
          </div>
        </div>
      </section>

      <section id="why" className="border-y border-black/10 bg-white/35">
        <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#ff3d55]">Why VYRAL</p>
              <h2 className="mt-4 max-w-md font-display text-5xl font-semibold leading-[.9] tracking-[-.045em] sm:text-6xl">Your time is better spent making.</h2>
            </div>
            <div className="grid border-l border-black/10 pl-6 sm:grid-cols-3 sm:pl-8">
              <div className="border-b border-black/10 pb-7 sm:border-b-0 sm:border-r sm:pr-7"><p className="font-display text-3xl">01</p><h3 className="mt-8 text-sm font-bold">Know what to make</h3><p className="mt-2 text-xs leading-5 text-black/45">See rising ideas and formats that fit your audience.</p></div>
              <div className="border-b border-black/10 py-7 sm:border-b-0 sm:border-r sm:px-7 sm:py-0"><p className="font-display text-3xl">02</p><h3 className="mt-8 text-sm font-bold">Make it yours</h3><p className="mt-2 text-xs leading-5 text-black/45">Turn an idea into a hook, script and clear next step.</p></div>
              <div className="pt-7 sm:pl-7 sm:pt-0"><p className="font-display text-3xl">03</p><h3 className="mt-8 text-sm font-bold">Know what worked</h3><p className="mt-2 text-xs leading-5 text-black/45">Understand the result instead of staring at numbers.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#ff3d55]">How it works</p><h2 className="mt-4 max-w-md font-display text-5xl font-semibold leading-[.9] tracking-[-.045em] sm:text-6xl">One good idea at a time.</h2><p className="mt-6 max-w-md text-sm leading-6 text-black/45">No maze of dashboards. VYRAL keeps the important part in front of you: what should you do next?</p></div>
          <div className="border-t border-black/10">
            {[['Find', 'A new opportunity in your niche.'], ['Create', 'A hook and video plan you can actually use.'], ['Learn', 'A clear reason to repeat, change or move on.']].map(([title,text]) => <div key={title} className="flex items-center gap-6 border-b border-black/10 py-7 sm:py-9"><span className="w-20 font-mono text-[9px] uppercase tracking-[.18em] text-black/30">{title}</span><p className="font-display text-3xl font-semibold tracking-[-.025em] sm:text-4xl">{text}</p><ArrowUpRight size={18} className="ml-auto shrink-0 text-black/25" /></div>)}
          </div>
        </div>
      </section>

      <section id="creators" className="bg-[#111113] text-white">
        <div className="mx-auto grid max-w-[1380px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_.8fr] lg:px-12 lg:py-24">
          <div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#ff6b7e]">For creators</p><h2 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[.88] tracking-[-.045em] sm:text-7xl">Build a body of work, not a pile of posts.</h2><p className="mt-7 max-w-xl text-sm leading-6 text-white/50">VYRAL helps you keep the useful parts of your growth in one place, without turning creativity into a spreadsheet.</p><Link href="/app" className="mt-8 inline-flex items-center gap-2 bg-white px-5 py-3 text-xs font-bold text-black transition hover:bg-[#ff3d55] hover:text-white">Open your workspace <ArrowUpRight size={14} /></Link></div>
          <div className="flex items-end justify-end"><div className="w-full max-w-sm border border-white/10 p-6"><div className="flex items-center justify-between border-b border-white/10 pb-5"><span className="font-display text-2xl">This week</span><span className="font-mono text-[8px] text-white/35">VYRAL</span></div><div className="py-7"><p className="font-mono text-[8px] uppercase tracking-[.16em] text-white/35">Next move</p><p className="mt-3 font-display text-4xl leading-none">Test the proof.</p><p className="mt-4 text-xs leading-5 text-white/40">Your audience is responding to specific examples. Build the next video around one.</p></div><div className="border-t border-white/10 pt-5 text-[9px] text-white/35">1 idea · 1 video · 1 lesson</div></div></div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-[#f4f3ee]">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-8 sm:px-8 lg:px-12"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center bg-[#111113] text-white"><Zap size={11} fill="currentColor" /></span><span className="font-display text-lg font-semibold">VYRAL</span></div><span className="text-[9px] font-semibold text-black/35">Make something worth watching.</span></div>
      </footer>
    </main>
  )
}
