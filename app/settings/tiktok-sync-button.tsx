'use client'

import { useState } from 'react'

export function TikTokSyncButton() {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function sync() {
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/tiktok/sync', { method: 'POST' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Sync failed.')
      setMessage(`${data.synced} video${data.synced === 1 ? '' : 's'} synced. Refreshing…`)
      window.setTimeout(() => window.location.reload(), 700)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sync failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={sync}
        disabled={busy}
        className="inline-flex rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? 'Syncing TikTok…' : 'Sync videos now'}
      </button>
      {message && <p className="max-w-sm text-xs leading-5 text-zinc-500">{message}</p>}
    </div>
  )
}
