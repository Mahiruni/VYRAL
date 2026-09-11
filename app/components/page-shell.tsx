import Link from 'next/link'
import { CalendarDays, Flame, LayoutDashboard, Activity, Users, Sparkles, Settings, Zap, WandSparkles, ArrowUpRight } from 'lucide-react'

const items=[['/','Today',LayoutDashboard],['/trends','Opportunities',Flame],['/studio','Create',Sparkles],['/analytics','Analytics',Activity],['/competitors','Intelligence',Users],['/calendar','Calendar',CalendarDays]] as const

export function PageShell({children,title,description}:{children:React.ReactNode;title:string;description:string}){
  return <main className="min-h-screen bg-[#f6f6f2] text-[#111113]">
    <header className="sticky top-0 z-30 border-b border-black/[.08] bg-[#f6f6f2]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1480px] items-center justify-between px-5 lg:px-9">
        <Link href="/" className="group flex items-center gap-3 press">
          <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#111113] text-white shadow-[0_8px_24px_rgba(17,17,19,.16)] transition-transform duration-300 group-hover:-rotate-3"><Zap size={17} fill="currentColor"/></div>
          <div><div className="font-display text-[27px] font-semibold leading-none tracking-tight">VYRAL</div><div className="mt-1 text-[8px] font-bold uppercase tracking-[.22em] text-black/35">Creator growth platform</div></div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">{items.map(([href,label,Icon])=><Link key={href} href={href} className="group flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold text-black/55 transition hover:bg-black/[.05] hover:text-black"><Icon size={14} className="text-black/35 transition group-hover:text-[#ff3d55]"/>{label}</Link>)}</nav>
        <div className="flex items-center gap-2"><span className="hidden items-center gap-2 rounded-full border border-black/[.08] bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[.14em] text-black/45 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#19a865] pulse-dot"/> Intelligence live</span><Link href="/settings" className="grid h-9 w-9 place-items-center rounded-full border border-black/[.08] bg-white text-black/45 transition hover:bg-black hover:text-white press"><Settings size={15}/></Link></div>
      </div>
      <div className="mx-auto flex max-w-[1480px] items-center gap-1 overflow-x-auto border-t border-black/[.05] px-5 py-2 lg:hidden"><Link href="/" className="rounded-full bg-black px-3 py-1.5 text-[10px] font-bold text-white">Today</Link>{items.slice(1).map(([href,label])=><Link key={href} href={href} className="whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-semibold text-black/50 hover:bg-black/[.05]">{label}</Link>)}</div>
    </header>
    <section>
      <div className="mx-auto max-w-[1480px] px-5 pb-4 pt-9 lg:px-9 lg:pt-14"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-4xl reveal"><p className="mb-3 font-mono text-[9px] font-medium uppercase tracking-[.22em] text-[#ff3d55]">VYRAL / {title.toUpperCase()}</p><h1 className="font-display text-5xl font-semibold leading-[.94] tracking-[-.035em] lg:text-7xl">{title}</h1><p className="mt-4 max-w-2xl text-[14px] leading-7 text-black/50">{description}</p></div><Link href="/studio" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#111113] px-5 py-3 text-[11px] font-bold text-white shadow-[0_12px_30px_rgba(17,17,19,.12)] transition hover:-translate-y-0.5 hover:bg-[#ff3d55] md:self-end">Create with AI <ArrowUpRight size={14}/></Link></div></div>
      <div className="mx-auto max-w-[1480px] px-5 pb-14 lg:px-9"><div className="stagger">{children}</div></div>
    </section>
    <footer className="border-t border-black/[.08] bg-[#111113] text-white"><div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-5 px-5 py-8 text-[10px] text-white/45 lg:flex-row lg:px-9"><span>VYRAL — Your AI growth team for TikTok.</span><span>Demo intelligence active · Built for creators.</span></div></footer>
  </main>
}

export function EmptyState({title,description,href,action}:{title:string;description:string;href?:string;action?:string}){return <div className="border border-black/[.08] bg-white py-14 text-center shadow-[0_12px_35px_rgba(17,17,19,.04)] reveal"><div className="mx-auto mb-4 grid h-10 w-10 place-items-center rounded-full bg-black text-white"><Zap size={16}/></div><h2 className="font-display text-2xl font-semibold">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/45">{description}</p>{href&&<Link href={href} className="mt-6 inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-[#ff3d55] press">{action||'Continue'} →</Link>}</div>}
