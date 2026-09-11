'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

function safeNext(value: FormDataEntryValue | null) {
  const next = String(value || '/app')
  return next.startsWith('/') && !next.startsWith('//') ? next : '/app'
}

function errorRedirect(message: string, next = '/app') {
  const params = new URLSearchParams({ error: message, next })
  redirect(`/login?${params.toString()}`)
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  const next = safeNext(formData.get('next'))

  if (!email || !password) errorRedirect('Enter your email and password.', next)
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) errorRedirect('That email or password is not correct.', next)
  redirect(next)
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  const displayName = String(formData.get('displayName') || '').trim()

  if (!email || password.length < 8) errorRedirect('Use a valid email and a password with at least 8 characters.')
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vyral-swart.vercel.app'}/auth/callback?next=/onboarding`,
    },
  })
  if (error) errorRedirect(error.message.toLowerCase().includes('already') ? 'An account with that email already exists. Sign in instead.' : 'We could not create your account. Please try again.')
  if (data.session) redirect('/onboarding')
  redirect('/login?message=Check%20your%20email%20to%20confirm%20your%20account')
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  if (!email) redirect('/login?error=Enter%20your%20email%20address%20first')
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vyral-swart.vercel.app'}/auth/callback?next=/reset-password`,
  })
  if (error) redirect('/login?error=We%20could%20not%20send%20the%20reset%20email')
  redirect('/login?message=If%20that%20email%20has%20a%20VYRAL%20account%2C%20a%20reset%20link%20is%20on%20its%20way')
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = String(formData.get('password') || '')
  const confirmation = String(formData.get('confirmation') || '')
  if (password.length < 8) redirect('/reset-password?error=Password%20must%20be%20at%20least%208%20characters')
  if (password !== confirmation) redirect('/reset-password?error=Passwords%20do%20not%20match')
  const { error } = await supabase.auth.updateUser({ password })
  if (error) redirect('/reset-password?error=We%20could%20not%20update%20your%20password')
  redirect('/app')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
