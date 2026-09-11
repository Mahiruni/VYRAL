import Link from 'next/link'
import { ArrowLeft, KeyRound, Zap } from 'lucide-react'
import { updatePassword } from '@/app/auth/actions'
import { requireUser } from '@/lib/auth'

export default async function ResetPassword({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireUser()
  const params = await searchParams
  return (
    <main className="min-h-screen bg-[#111113] text-white lg:grid lg:grid-cols-2">
      <section className="hidden lg:flex min-h-screen flex-col justify-between p-12 xl:p-16">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center bg-[#ff3d55]"><Zap size={17} fill="white"/></span><span className="font-display text-2xl font-semibold tracking-[-.05em]">VYRAL</span></div>
        <div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-white/30">Account security</p><h1 className="mt-5 font-display text-7xl font-semibold leading-[.84] tracking-[-.06em]">A new key.<br/><em className="text-[#ff6b7e]">A clean start.</em></h1><p className="mt-6 max-w-md text-sm leading-6 text-white/40">Choose a password you do not reuse elsewhere.</p></div>
        <span className="text-[9px] text-white/20">VYRAL · PRIVATE CREATOR WORKSPACE</span>
      </section>
      <section className="min-h-screen bg-[#f4f3ee] px-5 py-7 text-[#111113] sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-lg flex-col justify-center">
          <Link href="/login" className="mb-12 inline-flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-black/40 hover:text-black"><ArrowLeft size={13}/> Back to sign in</Link>
          {params.error && <div role="alert" className="mb-5 border border-[#ff3d55]/20 bg-[#ff3d55]/[.07] p-4 text-sm text-[#b32139]">{params.error}</div>}
          <div className="border border-black/10 bg-white p-7 shadow-[0_25px_80px_rgba(17,17,19,.08)] sm:p-9">
            <div className="mb-8"><div className="grid h-10 w-10 place-items-center bg-[#111113] text-white"><KeyRound size={16}/></div><p className="mt-6 font-mono text-[8px] uppercase tracking-[.2em] text-black/30">VYRAL / SECURITY</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em]">Set a new password.</h2><p className="mt-3 text-sm leading-6 text-black/45">Use at least 8 characters. You will be signed into your workspace after the update.</p></div>
            <form action={updatePassword} className="space-y-4"><label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-black/40">New password</span><input name="password" type="password" minLength={8} autoComplete="new-password" required className="field" placeholder="At least 8 characters"/></label><label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-black/40">Confirm password</span><input name="confirmation" type="password" minLength={8} autoComplete="new-password" required className="field" placeholder="Repeat your password"/></label><button className="w-full bg-[#111113] py-3.5 text-xs font-bold text-white transition hover:bg-[#ff3d55]">Update password</button></form>
          </div>
        </div>
      </section>
    </main>
  )
}
