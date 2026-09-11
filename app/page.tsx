import Link from 'next/link'
import { ArrowUpRight, Play, Zap } from 'lucide-react'

const people = [
  { name: 'Amara', role: 'Beauty', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1100&q=90' },
  { name: 'Noah', role: 'Fitness', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1100&q=90' },
  { name: 'Maya', role: 'Food', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1100&q=90' },
]

const pillars = [
  ['01', 'Find the opening', 'See the conversations, formats and ideas beginning to move in your world.'],
  ['02', 'Make the move', 'Shape the idea into a hook, story and video that still feels like you.'],
  ['03', 'Read the result', 'Know what earned attention and carry that lesson into the next post.'],
]

export default function MarketingHome() {
  return (
    <main className="min-h-screen bg-[#f4f3ee] text-[#111113]">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-7 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="VYRAL home">
          <span className="grid h-9 w-9 place-items-center bg-[#111113] text-white"><Zap size={15} fill="currentColor" /></span>
          <span className="font-display text-[25px] font-semibold tracking-[-.05em]">VYRAL</span>
        </Link>
        <div className="hidden items-center gap-10 text-[11px] font-semibold text-black/45 md:flex">
          <a href="#approach" className="transition hover:text-black">Approach</a>
          <a href="#how" className="transition hover:text-black">How it works</a>
          <a href="#creators" className="transition hover:text-black">Creators</a>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/login" className="hidden text-[11px] font-bold text-black/45 transition hover:text-black sm:block">Sign in</Link>
          <Link href="/app" className="inline-flex items-center gap-2 bg-[#111113] px-5 py-3 text-[11px] font-bold text-white transition hover:bg-[#ff3d55]">Open VYRAL <ArrowUpRight size={13} /></Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:px-12 lg:pb-28 lg:pt-12">
        <div className="relative z-10 max-w-[710px]">
          <h1 className="font-display text-[clamp(4.7rem,9.3vw,9rem)] font-semibold leading-[.79] tracking-[-.07em]">Make work<br />people <em className="text-[#ff3d55]">notice.</em></h1>
          <p className="mt-9 max-w-xl text-base leading-7 text-black/55 sm:text-lg">VYRAL helps creators find the right idea, make it sharper and understand what deserves another shot.</p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link href="/app" className="inline-flex items-center gap-2 bg-[#ff3d55] px-6 py-4 text-xs font-bold text-white transition hover:bg-[#111113]">Start creating <ArrowUpRight size={14} /></Link>
            <a href="#how" className="inline-flex items-center gap-2 text-xs font-bold text-black/50 transition hover:text-black"><Play size={13} fill="currentColor" /> See how it works</a>
          </div>
        </div>

        <div className="relative min-h-[540px] lg:min-h-[680px]">
          <div className="absolute right-[7%] top-0 h-[86%] w-[61%] overflow-hidden bg-[#171719]">
            <img src={people[0].image} alt="Creator" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="absolute left-[1%] top-[14%] z-10 w-[29%] overflow-hidden border-[5px] border-[#f4f3ee] bg-white shadow-[0_24px_60px_rgba(17,17,19,.16)]">
            <img src={people[1].image} alt="Creator" className="aspect-[4/5] w-full object-cover" />
            <div className="flex items-center justify-between px-3 py-2.5"><span className="text-[9px] font-bold">NOAH</span><span className="font-mono text-[8px] text-black/30">FITNESS</span></div>
          </div>
          <div className="absolute bottom-[4%] right-[1%] z-10 w-[34%] overflow-hidden border-[5px] border-[#f4f3ee] bg-white shadow-[0_24px_60px_rgba(17,17,19,.16)]">
            <img src={people[2].image} alt="Creator" className="aspect-[4/5] w-full object-cover" />
            <div className="flex items-center justify-between px-3 py-2.5"><span className="text-[9px] font-bold">MAYA</span><span className="font-mono text-[8px] text-black/30">FOOD</span></div>
          </div>
          <div className="absolute bottom-[13%] left-[14%] z-20 bg-[#111113] px-5 py-4 text-white shadow-[0_18px_45px_rgba(17,17,19,.2)]">
            <p className="font-mono text-[8px] uppercase tracking-[.15em] text-white/40">Creator signal</p>
            <p className="mt-1 font-display text-3xl">Worth a look.</p>
          </div>
        </div>
      </section>

      <section id="approach" className="border-y border-black/10 bg-[#111113] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div><h2 className="max-w-xl font-display text-5xl font-semibold leading-[.88] tracking-[-.05em] sm:text-7xl">Good growth starts with better decisions.</h2><p className="mt-7 max-w-md text-sm leading-6 text-white/45">The feed changes every day. Your process should not have to.</p></div>
            <div className="grid border-t border-white/10 sm:grid-cols-3 sm:border-l sm:border-t-0 sm:pl-8">
              {pillars.map(([n,title,text]) => <div key={n} className="border-b border-white/10 py-7 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0"><span className="font-mono text-[9px] text-[#ff6b7e]">{n}</span><h3 className="mt-12 font-display text-3xl font-semibold leading-none">{title}</h3><p className="mt-4 text-xs leading-5 text-white/40">{text}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
          <div><h2 className="max-w-md font-display text-5xl font-semibold leading-[.88] tracking-[-.05em] sm:text-7xl">Less noise.<br />More <em className="text-[#ff3d55]">direction.</em></h2><p className="mt-7 max-w-md text-sm leading-6 text-black/45">VYRAL brings discovery, creation and performance together without asking you to become an analyst.</p></div>
          <div className="border-t border-black/10">
            {[['Discover', 'Find the idea with a reason to exist now.'], ['Create', 'Give it a hook, a story and a point of view.'], ['Learn', 'Use the response to make the next decision better.']].map(([title,text]) => <div key={title} className="group flex items-center gap-6 border-b border-black/10 py-8 sm:py-10"><span className="w-24 shrink-0 font-mono text-[9px] uppercase tracking-[.18em] text-black/30">{title}</span><p className="font-display text-3xl font-semibold tracking-[-.03em] sm:text-4xl">{text}</p><ArrowUpRight size={18} className="ml-auto shrink-0 text-black/20 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#ff3d55]" /></div>)}
          </div>
        </div>
      </section>

      <section id="creators" className="border-t border-black/10 bg-[#e8e6df]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_.75fr] lg:px-12 lg:py-24">
          <div><h2 className="max-w-3xl font-display text-5xl font-semibold leading-[.86] tracking-[-.05em] sm:text-7xl">For people building something worth following.</h2><p className="mt-7 max-w-xl text-sm leading-6 text-black/45">Whether you are growing from your bedroom, your studio or a team around the world, VYRAL keeps the focus on the work.</p><Link href="/app" className="mt-8 inline-flex items-center gap-2 bg-[#111113] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#ff3d55]">Open your workspace <ArrowUpRight size={14} /></Link></div>
          <div className="flex items-end justify-end"><div className="w-full max-w-[410px] border border-black/10 bg-[#f4f3ee] p-7"><div className="flex items-center justify-between border-b border-black/10 pb-5"><span className="font-display text-2xl">Your next move</span><Zap size={15} /></div><p className="mt-8 font-display text-4xl leading-none">Test the proof.</p><p className="mt-4 max-w-xs text-xs leading-5 text-black/40">One clear idea. One strong video. One useful lesson.</p><div className="mt-8 border-t border-black/10 pt-5 font-mono text-[8px] uppercase tracking-[.15em] text-black/30">VYRAL workspace</div></div></div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-[#f4f3ee]"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-8 sm:px-8 lg:px-12"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center bg-[#111113] text-white"><Zap size={11} fill="currentColor" /></span><span className="font-display text-lg font-semibold">VYRAL</span></div><span className="text-[9px] font-semibold text-black/30">Make work people notice.</span></div></footer>
    </main>
  )
}
