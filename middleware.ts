import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pjjcvehiatrxjvggfmwd.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_VR_hhxmOXfBDUQbzWDSZ5Q_n_jBu1je'

const PUBLIC_PATHS = new Set(['/', '/login', '/auth/callback', '/api/tiktok/callback'])
const PROTECTED_PREFIXES = ['/app', '/trends', '/studio', '/analytics', '/competitors', '/calendar', '/settings', '/billing', '/onboarding']

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/_next/') || pathname.includes('.')) return NextResponse.next()

  const response = NextResponse.next({ request })
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value)
          response.cookies.set(name, value, options)
        })
      },
    },
  })
  const { data: { user } } = await supabase.auth.getUser()

  if (pathname === '/login' && user) return NextResponse.redirect(new URL('/app', request.url))
  if (PUBLIC_PATHS.has(pathname)) return response

  if (isProtected(pathname) && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith('/api/') && !user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
