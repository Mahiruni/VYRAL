import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

function safeNext(value: string | null) {
  const next = value || '/app'
  return next.startsWith('/') && !next.startsWith('//') ? next : '/app'
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = safeNext(url.searchParams.get('next'))

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL(next, url.origin))
  }

  return NextResponse.redirect(new URL('/login?error=Authentication%20could%20not%20be%20completed', url.origin))
}
