import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, KeyRound, Mail, Zap } from 'lucide-react'
import { signIn, signUp, requestPasswordReset } from '@/app/auth/actions'

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; message?: string; next?: string }> }) {
  const params = await searchParams
  const next = params.next?.startsWith('/') && !params.next.startsWith('//') ? params.next : '/app'

  return (
    <main className="min-h-screen bg-[#111113] text-white lg:grid lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden lg:flex lg:min-h-screen lg:flex-col lg:justify-between p-12 xl:p-16">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)', backgroundSize:'48px 48px'}} />
        <div className="relative z-10 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center bg-[#ff3d55]"><Zap size={17} fill="white" /></span><span className="font-display text-2xl font-semibold tracking-[-.05em]">VYRAL</span></div>
        <div className="relative z-10 max-w-2xl"><p className="font-mono text-[9px] uppercase tracking-[.2em] text-white/35">Creator growth, without the noise</p><h1 className="mt-6 font-display text-6xl font-semibold leading-[.84] tracking-[-.06em] xl:text-8xl">Come in.<br /><em className="text-[#ff6b7e]">Make something.</em></h1><p className="mt-7 max-w-lg text-sm leading-6 text-white/45">Your ideas, your work, your results — kept in one private workspace.</p><div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">{['Private workspace','Real performance data','Built for creators'].map((item)=><div key={item} className="border border-white/10 bg-white/[.03] p-4"><Check size={14} className="text-[#ff6b7e]"/><p className="mt-8 text-[10px] font-bold text-white/70">{item}</p></div>)}</div></div>
        <div className="relative z-10 flex justify-between text-[9px] text-white/25"><span>DISCOVER · CREATE · LEARN</span><span>© {new Date().getFullYear()} VYRAL</span></div>
      </section>

      <section className="min-h-screen bg-[#f4f3ee] text-[#111113] px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-xl flex-col justify-center">
          <Link href="/" className="mb-12 inline-flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-black/40 hover:text-black"><ArrowLeft size={13}/> Back to VYRAL</Link>
          <div className="mb-8 lg:hidden"><div className="mb-5 grid h-10 w-10 place-items-center bg-[#111113] text-white"><Zap size={17} fill="currentColor" /></div><p className="font-display text-3xl font-semibold tracking-[-.05em]">VYRAL</p></div>
          {params.error && <div role="alert" className="mb-5 border border-[#ff3d55]/20 bg-[#ff3d55]/[.07] p-4 text-sm text-[#b32139]">{params.error}</div>}
          {params.message && <div role="status" className="mb-5 border border-emerald-600/20 bg-emerald-600/[.06] p-4 text-sm text-emerald-800">{params.message}</div>}

          <div className="border border-black/10 bg-white p-6 shadow-[0_25px_80px_rgba(17,17,19,.08)] sm:p-8">
            <div className="mb-8"><p className="font-mono text-[8px] uppercase tracking-[.2em] text-black/30">VYRAL / ACCESS</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em]">Your workspace is waiting.</h2><p className="mt-3 text-sm leading-6 text-black/45">Sign in to continue, or create your creator workspace in under a minute.</p></div>

            <form action={signIn} className="space-y-4">
              <input type="hidden" name="next" value={next} />
              <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-black/40">Email</span><div className="relative"><Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/25"/><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="field pl-11" /></div></label>
              <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-black/40">Password</span><div className="relative"><KeyRound size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/25"/><input name="password" type="password" autoComplete="current-password" required placeholder="Your password" className="field pl-11" /></div></label>
              <button className="group flex w-full items-center justify-center gap-2 bg-[#111113] py-3.5 text-xs font-bold text-white transition hover:bg-[#ff3d55]">Sign in <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></button>
            </form>

            <div className="my-7 flex items-center gap-4"><span className="h-px flex-1 bg-black/10"/><span className="font-mono text-[8px] uppercase tracking-widest text-black/25">or</span><span className="h-px flex-1 bg-black/10"/></div>

            <form action={signUp} className="space-y-4">
              <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-black/40">Creator name</span><input name="displayName" autoComplete="name" placeholder="How should VYRAL call you?" className="field" /></label>
              <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-black/40">Email</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="field" /></label>
              <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-black/40">Password</span><input name="password" type="password" autoComplete="new-password" minLength={8} required placeholder="At least 8 characters" className="field" /></label>
              <button className="w-full border border-black/15 bg-[#f4f3ee] py-3.5 text-xs font-bold transition hover:border-black hover:bg-black hover:text-white">Create my workspace</button>
            </form>

            <div className="mt-6 border-t border-black/10 pt-5"><form action={requestPasswordReset} className="flex gap-2"><input name="email" type="email" required placeholder="Email for password reset" className="field flex-1"/><button className="shrink-0 border border-black/10 px-4 text-[10px] font-bold hover:border-black">Reset</button></form></div>
          </div>
          <p className="mt-5 text-center text-[10px] leading-5 text-black/30">By continuing, you agree to keep your VYRAL account secure. Never share your password.</p>
        </div>
      </section>
    </main>
  )
}
