'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect('/login?error=Sign-in%20failed')
  redirect('/')
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')
  const displayName = String(formData.get('displayName') || '').trim()
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } })
  if (error) redirect('/login?error=Sign-up%20failed')
  if (data.session) redirect('/onboarding')
  redirect('/login?message=Check%20your%20email%20to%20confirm%20your%20account')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
