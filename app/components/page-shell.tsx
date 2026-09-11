import Link from 'next/link'
import { CalendarDays, Flame, LayoutDashboard, Activity, Users, Sparkles, Settings, Zap, WandSparkles } from 'lucide-react'

const items=[['/','Today',LayoutDashboard],['/trends','Opportunities',Flame],['/studio','Create',Sparkles],['/analytics','Analytics',Activity],['/competitors','Intelligence',Users],['/calendar','Calendar',CalendarDays]] as const

export function PageShell({children,title,description}:{children:React.ReactNode;title:string;description:string}){
  return <main className="min-h-screen bg-[#070708] text-white">
    <aside className="fixed inset-y-0 left-0 hidden w-[248px] border-r border-white/[.07] bg-[#09090a] px-4 py-5 lg:flex lg:flex-col">
      <Link href="/" className="mb-9 flex items-center gap-3 px-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff3151] shadow-[0_0_30px_rgba(255,49,81,.25)]"><Zap size={17} fill="white"/></div>
        <div><div className="font-display text-[25px] leading-none">VYRAL</div><div className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/35">AI growth team</div></div>
      </Link>
      <p className="px-3 text-[9px] font-semibold uppercase tracking-[.2em] text-white/30">Workspace</p>
      <nav className="mt-2 space-y-1">{items.map(([href,label,Icon])=><Link key={href} href={href} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-white/48 transition hover:bg-white/[.045] hover:text-white`}><Icon size={16} className="text-white/35 group-hover:text-[#ff3151]"/>{label}</Link>)}</nav>
      <div className="mt-8 rounded-2xl border border-white/[.07] bg-gradient-to-br from-white/[.06] to-white/[.015] p-4">
        <div className="flex items-center gap-2 text-xs font-semibold"><WandSparkles size={14} className="text-[#ff3151]"/> Creator DNA</div>
        <p className="mt-2 text-[11px] leading-5 text-white/38">Your growth system learns what makes your audience stop, watch and share.</p>
        <Link href="/analytics" className="mt-3 inline-block text-[10px] font-semibold text-white/65 hover:text-white">View your profile →</Link>
      </div>
      <div className="mt-auto border-t border-white/[.07] pt-4"><Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/40 hover:bg-white/[.04] hover:text-white"><Settings size={16}/>Settings</Link><div className="mt-2 flex items-center gap-2 px-3 text-[10px] text-white/25"><span className="h-1.5 w-1.5 rounded-full bg-[#ff3151]"/>Demo environment</div></div>
    </aside>
    <section className="lg:ml-[248px]">
      <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-white/[.07] bg-[#070708]/85 px-5 backdrop-blur-xl lg:px-9">
        <Link href="/" className="font-display text-xl lg:hidden">VYRAL</Link>
        <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[.18em] text-white/25 lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#ff3151]"/> Live intelligence</div>
        <div className="flex items-center gap-3"><span className="hidden rounded-full border border-white/[.08] px-3 py-1.5 text-[10px] text-white/35 sm:block">Demo mode</span><Link href="/settings" className="rounded-lg p-2 text-white/35 hover:bg-white/[.05] hover:text-white"><Settings size={17}/></Link></div>
      </header>
      <div className="mx-auto max-w-[1480px] p-5 lg:p-10"><div className="mb-10 max-w-4xl"><p className="mb-2 font-mono text-[9px] uppercase tracking-[.22em] text-[#ff3151]">VYRAL / {title.toUpperCase()}</p><h1 className="font-display text-5xl leading-[.98] tracking-[-.02em] lg:text-6xl">{title}</h1><p className="mt-4 max-w-2xl text-[14px] leading-7 text-white/40">{description}</p></div>{children}</div>
    </section>
  </main>
}

export function EmptyState({title,description,href,action}:{title:string;description:string;href?:string;action?:string}){return <div className="border border-white/[.07] bg-white/[.02] py-14 text-center"><div className="mx-auto mb-4 grid h-10 w-10 place-items-center rounded-full border border-white/10"><Zap size={16} className="text-[#ff3151]"/></div><h2 className="font-display text-2xl">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/35">{description}</p>{href&&<Link href={href} className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90">{action||'Continue'} →</Link>}</div>}
