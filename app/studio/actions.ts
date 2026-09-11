'use server'
import { requireUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
export async function createIdea(formData:FormData){const {supabase,user}=await requireUser();const title=String(formData.get('title')||'').trim();const hook=String(formData.get('hook')||'').trim();const script=String(formData.get('script')||'').trim();const caption=String(formData.get('caption')||'').trim();const hashtags=String(formData.get('hashtags')||'').split(/[ ,]+/).map(x=>x.replace(/^#/,'')).filter(Boolean);if(!title||!hook)redirect('/studio?error=Title%20and%20hook%20are%20required');const {error}=await supabase.from('content_ideas').insert({user_id:user.id,title,hook,script,caption,hashtags});if(error)redirect('/studio?error=Could%20not%20save%20idea');redirect('/studio?saved=1')}
