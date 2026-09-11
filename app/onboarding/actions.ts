'use server'
import { requireUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
export async function saveCreatorProfile(formData: FormData){const {supabase,user}=await requireUser();const display_name=String(formData.get('display_name')||'').trim();const niche=String(formData.get('niche')||'').trim();const follower_count=Math.max(0,Number(formData.get('follower_count')||0));if(!niche) redirect('/onboarding?error=Choose%20your%20primary%20niche');const {error}=await supabase.from('creator_profiles').upsert({user_id:user.id,display_name,niche,follower_count,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error) redirect('/onboarding?error=Could%20not%20save%20your%20profile');redirect('/')} 
