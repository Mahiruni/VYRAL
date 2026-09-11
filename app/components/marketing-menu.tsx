'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, BarChart3, LayoutDashboard, Sparkles, Users, X, Zap } from 'lucide-react'

const links = [
  ['#how-it-works', 'How it works', Sparkles],
  ['#intelligence', 'Creator intelligence', BarChart3],
  ['#proof', 'Built for creators', Users],
] as const

export function MarketingMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return <>
    <button
      type="button"
      aria-label={open ? 'Close VYRAL menu' : 'Open VYRAL menu'}
      aria-expanded={open}
      onClick={() => setOpen(value => !value)}
      className={`marketing-menu-trigger ${open ? 'is-open' : ''}`}
    >
      <span className="marketing-menu-line marketing-menu-line-top" />
      <span className="marketing-menu-line marketing-menu-line-bottom" />
    </button>

    <div className={`marketing-menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="marketing-menu-orb" />
      <div className="mx-auto flex min-h-screen max-w-[1240px] flex-col px-5 pb-10 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <div className="flex items-end justify-between border-b border-black/10 pb-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.22em] text-[#ff3d55]">VYRAL / Explore</p>
            <h2 className="mt-2 font-display text-5xl font-semibold tracking-[-.04em] sm:text-7xl">Make your next move.</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[9px] font-bold uppercase tracking-[.16em] sm:flex">
            Close <X size={13} />
          </button>
        </div>

        <nav className="mt-5 grid gap-1 sm:grid-cols-2">
          {links.map(([href, label, Icon], index) => <a key={href} href={href} onClick={() => setOpen(false)} className="marketing-menu-item" style={{ '--menu-delay': `${index * 55}ms` } as React.CSSProperties}>
            <span className="font-mono text-[9px] text-black/25">0{index + 1}</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 text-[#ff3d55]"><Icon size={17} /></span>
            <span className="font-display text-4xl font-semibold tracking-[-.03em] sm:text-5xl">{label}</span>
            <ArrowUpRight className="ml-auto opacity-25" size={20} />
          </a>)}
          <Link href="/app" onClick={() => setOpen(false)} className="marketing-menu-item sm:col-span-2">
            <span className="font-mono text-[9px] text-black/25">04</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#111113] text-white"><LayoutDashboard size={17} /></span>
            <span className="font-display text-4xl font-semibold tracking-[-.03em] sm:text-5xl">Open creator dashboard</span>
            <ArrowUpRight className="ml-auto" size={20} />
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-5 border-t border-black/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-black/35"><Zap size={12} /> Creator growth system</div>
          <Link href="/login" onClick={() => setOpen(false)} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ff3d55] px-5 py-3 text-[11px] font-bold text-white">Sign in <ArrowUpRight size={13} /></Link>
        </div>
      </div>
    </div>
  </>
}
