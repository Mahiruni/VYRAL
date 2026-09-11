'use client'

import Link from 'next/link'
import { useEffect, useState, type CSSProperties } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, X } from 'lucide-react'

const links = [
  ['#approach', 'Approach'],
  ['#how', 'How it works'],
  ['#creators', 'Creators'],
] as const

export function MarketingMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname !== '/') return null

  const compact = scrolled

  return <>
    <button
      type="button"
      aria-label={open ? 'Close VYRAL menu' : 'Open VYRAL menu'}
      aria-expanded={open}
      onClick={() => setOpen(value => !value)}
      className={`marketing-menu-trigger ${open ? 'is-open' : ''} ${compact ? 'is-compact' : ''}`}
      data-scrolled={compact}
      style={{
        right: compact ? 14 : 20,
        top: compact ? 10 : 18,
        width: compact ? 42 : 52,
        height: compact ? 38 : 48,
        borderRadius: compact ? 999 : 14,
        background: compact ? 'rgba(255,255,255,.84)' : 'transparent',
        border: compact ? '1px solid rgba(0,0,0,.08)' : '1px solid transparent',
        boxShadow: compact ? '0 8px 30px rgba(0,0,0,.08)' : 'none',
        backdropFilter: compact ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: compact ? 'blur(14px)' : 'none',
        transition: 'width 320ms cubic-bezier(.22,1,.36,1), height 320ms cubic-bezier(.22,1,.36,1), top 320ms cubic-bezier(.22,1,.36,1), right 320ms cubic-bezier(.22,1,.36,1), border-radius 320ms cubic-bezier(.22,1,.36,1), background 320ms ease, box-shadow 320ms ease',
      }}
    >
      <span className="marketing-menu-line marketing-menu-line-top" style={{ width: compact ? 15 : 20 }} />
      <span className="marketing-menu-line marketing-menu-line-bottom" style={{ width: compact ? 15 : 20 }} />
    </button>

    <div className={`marketing-menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="mx-auto flex min-h-screen max-w-[1240px] flex-col px-5 pb-10 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <div><p className="font-mono text-[8px] uppercase tracking-[.2em] text-black/30">VYRAL</p><h2 className="mt-2 font-display text-4xl font-semibold tracking-[-.04em] sm:text-6xl">Where do you want to go?</h2></div>
          <button type="button" onClick={() => setOpen(false)} className="flex items-center gap-2 border border-black/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[.14em]">Close <X size={12} /></button>
        </div>

        <nav className="mt-8 grid max-w-3xl border-t border-black/10">
          {links.map(([href, label], index) => <a key={href} href={href} onClick={() => setOpen(false)} className="marketing-menu-item" style={{ '--menu-delay': `${index * 55}ms` } as CSSProperties}>
            <span className="font-mono text-[8px] text-black/25">0{index + 1}</span>
            <span className="text-[13px] font-semibold tracking-[-.01em] sm:text-sm">{label}</span>
            <ArrowUpRight className="ml-auto text-black/25" size={15} />
          </a>)}
          <Link href="/login" onClick={() => setOpen(false)} className="marketing-menu-item" style={{ '--menu-delay': '165ms' } as CSSProperties}>
            <span className="font-mono text-[8px] text-[#ff3d55]">04</span>
            <span className="text-[13px] font-bold sm:text-sm">Start creating</span>
            <ArrowUpRight className="ml-auto text-[#ff3d55]" size={15} />
          </Link>
        </nav>

        <div className="mt-auto flex items-end justify-between border-t border-black/10 pt-6"><p className="max-w-xs text-[10px] leading-5 text-black/35">Find the idea. Make the move. Learn what matters.</p><Link href="/app" onClick={() => setOpen(false)} className="text-[10px] font-bold text-black/50 transition hover:text-black">Open VYRAL <ArrowUpRight size={12} className="ml-1 inline" /></Link></div>
      </div>
    </div>
  </>
}
