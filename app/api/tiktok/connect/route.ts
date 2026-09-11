import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const key = process.env.TIKTOK_CLIENT_KEY
  const redirectUri = process.env.TIKTOK_REDIRECT_URI
  if (!key || !redirectUri) return NextResponse.redirect(new URL('/settings?error=tiktok_config', url.origin))

  const state = crypto.randomBytes(24).toString('base64url')
  const scope = process.env.TIKTOK_SCOPES || 'user.info.basic,video.list'
  const auth = new URL('https://www.tiktok.com/v2/auth/authorize/')
  auth.searchParams.set('client_key', key)
  auth.searchParams.set('response_type', 'code')
  auth.searchParams.set('scope', scope)
  auth.searchParams.set('redirect_uri', redirectUri)
  auth.searchParams.set('state', state)

  const response = NextResponse.redirect(auth)
  response.cookies.set('vyral_tiktok_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  })
  return response
}
