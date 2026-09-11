import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Vercel currently has no Supabase runtime variables configured for this project.
// Keep the public Supabase configuration as a safe fallback so authenticated
// routes do not crash server-side. Vercel environment variables still take
// precedence when configured.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pjjcvehiatrxjvggfmwd.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_VR_hhxmOXfBDUQbzWDSZ5Q_n_jBu1je'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    },
  )
}
