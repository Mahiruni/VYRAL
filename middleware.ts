import { NextResponse, type NextRequest } from 'next/server'

/**
 * Demo mode middleware.
 *
 * Keep middleware dependency-free while the app is running with mock data/auth.
 * Supabase authentication can be restored here when production credentials and
 * protected routes are enabled.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
