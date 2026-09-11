'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CalendarDays, Flame, LayoutDashboard, Activity, Users, Sparkles, Settings, ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { AccountMenu } from '@/app/components/account-menu'

const items=[['/app','Home',LayoutDashboard],['/trends','Discover',Flame],['/studio','Create',Sparkles],['/analytics','Results',Activity],['/competitors','Intelligence',Users],['/calendar','Plan',CalendarDays],['/settings','Settings',Settings]] as const

export function PageShell({children,title,description}:{children:React.ReactNode;title:string;description:string}){
  const [menuOpen,setMenuOpen]=useState(false)
  useEffect(()=>{document.body.style.overflow=menuOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[menuOpen])
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenuOpen(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[])

  return <main className="min-h-screen bg-[#f4f3ee] text-[#111113]">
    <header className="sticky top-0 z-40 border-b border-black/[.08] bg-[#f4f3ee]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[74px] max-w-[1480px] items-center justify-between px-5 lg:px-9">
        <div className="flex items-center gap-4"><Link href="/app" onClick={()=>setMenuOpen(false)} className="group flex items-center gap-3 press"><div className="grid h-9 w-9 place-items-center bg-[#111113] text-white transition-transform duration-300 group-hover:-rotate-3"><span className="font-display text-lg font-semibold leading-none">V</span></div><div className="font-display text-[26px] font-semibold leading-none tracking-[-.045em]">VYRAL</div></Link><span className="hidden h-4 w-px bg-black/10 sm:block"/><span className="hidden text-[9px] font-bold uppercase tracking-[.16em] text-black/30 sm:block">Creator workspace</span></div>
        <div className="flex items-center gap-3"><AccountMenu/><button aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)} className={`vyral-menu-button ${menuOpen?'is-open':''}`}><span className="vyral-menu-line vyral-menu-line-top"/><span className="vyral-menu-line vyral-menu-line-bottom"/></button></div>
      </div>
    </header>

    <div className={`vyral-menu-overlay ${menuOpen?'is-open':''}`} aria-hidden={!menuOpen}><div className="vyral-menu-glow"/><div className="mx-auto flex min-h-screen max-w-[1480px] flex-col px-6 pb-10 pt-[112px] lg:px-12 lg:pt-[132px]"><div className="mb-10 flex items-end justify-between border-b border-black/[.1] pb-5"><div><p className="font-mono text-[8px] uppercase tracking-[.2em] text-black/30">VYRAL WORKSPACE</p><h2 className="mt-2 font-display text-4xl font-semibold tracking-tight lg:text-6xl">Where do you want to go?</h2></div><span className="hidden font-mono text-[9px] uppercase tracking-[.16em] text-black/35 sm:block">ESC to close</span></div><nav className="grid gap-1 sm:grid-cols-2">{items.map(([href,label,Icon],i)=><Link key={href} href={href} onClick={()=>setMenuOpen(false)} className="vyral-menu-item" style={{'--menu-delay':`${i*55}ms`} as CSSProperties}><span className="vyral-menu-index">0{i+1}</span><span className="vyral-menu-icon"><Icon size={17}/></span><span className="vyral-menu-title">{label}</span><ArrowUpRight className="vyral-menu-arrow" size={22}/></Link>)}</nav><div className="mt-auto flex flex-col gap-5 border-t border-black/[.1] pt-7 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-md text-sm leading-6 text-black/45">Find the idea. Make the move. Learn what matters.</p><div className="flex gap-2"><Link href="/settings" onClick={()=>setMenuOpen(false)} className="inline-flex items-center gap-2 border border-black/10 bg-white px-5 py-3 text-[11px] font-bold transition hover:border-black press">Account <ArrowUpRight size={14}/></Link><Link href="/studio" onClick={()=>setMenuOpen(false)} className="inline-flex items-center gap-2 bg-[#111113] px-5 py-3 text-[11px] font-bold text-white transition hover:bg-[#ff3d55] press">Create a video <ArrowUpRight size={14}/></Link></div></div></div></div>

    <section><div className="mx-auto max-w-[1480px] px-5 pb-4 pt-10 lg:px-9 lg:pt-16"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div className="max-w-4xl reveal"><h1 className="font-display text-5xl font-semibold leading-[.88] tracking-[-.045em] lg:text-7xl">{title}</h1><p className="mt-5 max-w-2xl text-[14px] leading-7 text-black/50">{description}</p></div><Link href="/studio" className="inline-flex shrink-0 items-center gap-2 self-start bg-[#111113] px-5 py-3 text-[11px] font-bold text-white transition hover:bg-[#ff3d55] md:self-end">Create a video <ArrowUpRight size={14}/></Link></div></div><div className="mx-auto max-w-[1480px] px-5 pb-14 lg:px-9"><div className="stagger">{children}</div></div></section>
    <footer className="border-t border-black/[.08] bg-[#111113] text-white"><div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-5 px-5 py-8 text-[10px] text-white/45 lg:flex-row lg:px-9"><span className="font-display text-lg text-white">VYRAL</span><span>Discover · Create · Learn</span></div></footer>
  </main>
}

export function EmptyState({title,description,href,action}:{title:string;description:string;href?:string;action?:string}){return <div className="border border-black/[.08] bg-white py-14 text-center reveal"><div className="mx-auto mb-4 grid h-10 w-10 place-items-center bg-black text-white"><span className="font-display text-lg">V</span></div><h2 className="font-display text-2xl font-semibold">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/45">{description}</p>{href&&<Link href={href} className="mt-6 inline-flex bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-[#ff3d55] press">{action||'Continue'} →</Link>}</div>}
