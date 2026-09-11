'use client'

import { useEffect, useState } from 'react'
import { LogOut, Settings, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function AccountMenu() {
  const router = useRouter()
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null)
  const [open, setOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    let active = true
    supabase.auth.getUser().then(({ data }) => {
      if (active && data.user) setUser({ email: data.user.email, name: data.user.user_metadata?.display_name || data.user.email?.split('@')[0] })
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return
      setUser(session?.user ? { email: session.user.email, name: session.user.user_metadata?.display_name || session.user.email?.split('@')[0] } : null)
    })
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [supabase])

  if (!user) return null
  const initials = (user.name || 'C').slice(0, 1).toUpperCase()

  async function logout() {
    await supabase.auth.signOut()
    router.replace('/login')
    router.refresh()
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} aria-label="Open account menu" aria-expanded={open} className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-2 py-1.5 transition hover:border-black/30">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#111113] text-[10px] font-bold text-white">{initials}</span>
        <span className="hidden max-w-[130px] truncate pr-1 text-[10px] font-bold sm:block">{user.name}</span>
      </button>
      {open && <>
        <button aria-label="Close account menu" className="fixed inset-0 z-40 cursor-default" onClick={() => setOpen(false)} />
        <div className="absolute right-0 z-50 mt-2 w-64 border border-black/10 bg-white p-2 shadow-[0_18px_50px_rgba(17,17,19,.14)]">
          <div className="border-b border-black/10 px-3 py-3"><p className="text-xs font-bold">{user.name}</p><p className="mt-1 truncate text-[10px] text-black/40">{user.email}</p></div>
          <button onClick={() => { setOpen(false); router.push('/settings') }} className="mt-1 flex w-full items-center gap-3 px-3 py-3 text-left text-[10px] font-bold hover:bg-[#f4f3ee]"><Settings size={14}/> Account settings</button>
          <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-3 text-left text-[10px] font-bold text-[#d52e45] hover:bg-[#fff2f4]"><LogOut size={14}/> Sign out</button>
        </div>
      </>}
    </div>
  )
}
