import { createBrowserClient } from '@supabase/ssr'

// Public Supabase configuration fallback for deployments where Vercel
// environment variables have not yet been added. Environment variables win.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pjjcvehiatrxjvggfmwd.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_VR_hhxmOXfBDUQbzWDSZ5Q_n_jBu1je'

export function createClient() {
  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
  )
}
