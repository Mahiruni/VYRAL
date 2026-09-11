'use server'
import { requireUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
export async function addCompetitor(formData:FormData){const {supabase,user}=await requireUser();const username=String(formData.get('username')||'').trim().replace(/^@/,'');if(!username)redirect('/competitors?error=Enter%20a%20TikTok%20username');const {error}=await supabase.from('competitors').insert({user_id:user.id,tiktok_username:username});if(error)redirect('/competitors?error=Could%20not%20add%20competitor');redirect('/competitors')}
