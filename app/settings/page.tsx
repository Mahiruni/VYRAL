import Link from 'next/link'
import { requireUser } from '@/lib/auth'
import { PageShell } from '@/app/components/page-shell'
import { signOut } from '@/app/auth/actions'
import { TikTokSyncButton } from './tiktok-sync-button'

const errors: Record<string, string> = {
  tiktok_config: 'TikTok is not configured on the server yet. Add the TikTok client credentials and production callback URL.',
  tiktok_state: 'The TikTok sign-in state did not match. Start the connection again.',
  tiktok_denied: 'TikTok connection was cancelled.',
  tiktok_token: 'TikTok did not issue an access token. Check the app configuration and approved scopes.',
  tiktok_profile: 'TikTok connected, but the profile could not be read.',
  tiktok_save: 'TikTok connected, but VYRAL could not save the account.',
}

export default async function Settings({ searchParams }: { searchParams: Promise<{ error?: string; connected?: string }> }) {
  const { supabase, user } = await requireUser()
  const p = await searchParams
  const { data: account } = await supabase.from('tiktok_accounts').select('username,display_name,scopes,created_at,last_synced_at').eq('user_id', user.id).maybeSingle()

  return <PageShell title="Settings" description="The account, connections and data VYRAL is actually allowed to use.">
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="border-y border-white/10 py-6">
        <p className="eyebrow">ACCOUNT</p>
        <h2 className="mt-2 font-display text-xl font-bold">{user.email}</h2>
        <p className="mt-2 text-sm text-zinc-500">Your VYRAL account is authenticated with Supabase.</p>
        <Link href="/onboarding" className="mt-5 inline-flex rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/5">Edit Creator DNA</Link>
        <form action={signOut} className="mt-4"><button className="text-sm text-rose-300 hover:text-rose-200">Sign out</button></form>
      </section>

      <section className="border-y border-white/10 py-6">
        <p className="eyebrow">TIKTOK / DATA CONNECTION</p>
        {p.connected && <div className="mt-4 border-l border-emerald-400/60 pl-3 text-xs text-emerald-300">TikTok is connected. You can now pull your real creator data.</div>}
        {p.error && <div className="mt-4 border-l border-rose-400/60 pl-3 text-xs leading-5 text-rose-300">{errors[p.error] || 'The TikTok connection could not be completed.'}</div>}

        {account ? <>
          <h2 className="mt-5 font-display text-2xl font-bold">@{account.username || account.display_name || 'Connected creator'}</h2>
          <p className="mt-2 text-sm text-zinc-500">VYRAL has permission to use: {(account.scopes || []).join(', ') || 'no scopes recorded'}.</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-600">Last sync: {account.last_synced_at ? new Date(account.last_synced_at).toLocaleString() : 'Never'}</p>
          <TikTokSyncButton />
          <Link href="/api/tiktok/connect" className="mt-3 inline-flex rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/5">Reconnect TikTok</Link>
        </> : <>
          <h2 className="mt-5 font-display text-2xl font-bold">Not connected</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">Connect the real account first. Until then, VYRAL will not invent creator metrics, trends or performance history.</p>
          <Link href="/api/tiktok/connect" className="mt-5 inline-flex rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-bold text-black hover:bg-rose-400">Connect TikTok</Link>
        </>}
      </section>
    </div>
  </PageShell>
}
