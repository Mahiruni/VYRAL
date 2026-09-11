import { signIn, signUp } from '@/app/auth/actions'
import { Zap } from 'lucide-react'

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const params = await searchParams
  return <main className="min-h-screen grid-bg grid place-items-center p-6">
    <div className="w-full max-w-md">
      <div className="mb-8 text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-rose-500 shadow-glow"><Zap size={22} fill="white" /></div><h1 className="font-display text-3xl font-bold">VYRAL</h1><p className="mt-2 text-sm text-zinc-500">Your growth operating system for TikTok.</p></div>
      <div className="glass rounded-2xl p-6">
        {params.error && <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">{params.error}</div>}
        {params.message && <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">{params.message}</div>}
        <form action={signIn} className="space-y-4"><h2 className="font-display text-lg font-bold">Sign in</h2><input name="email" type="email" required placeholder="Email" className="field"/><input name="password" type="password" required placeholder="Password" className="field"/><button className="w-full rounded-xl bg-rose-500 py-3 text-sm font-bold hover:bg-rose-400">Sign in</button></form>
        <div className="my-6 h-px bg-white/5" />
        <form action={signUp} className="space-y-4"><h2 className="font-display text-lg font-bold">Create your workspace</h2><input name="displayName" placeholder="Creator name" className="field"/><input name="email" type="email" required placeholder="Email" className="field"/><input name="password" type="password" minLength={8} required placeholder="Password (8+ characters)" className="field"/><button className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold hover:bg-white/10">Create account</button></form>
      </div>
      <p className="mt-5 text-center text-xs text-zinc-600">Your dashboard uses your connected creator data. No fabricated metrics.</p>
    </div>
  </main>
}
