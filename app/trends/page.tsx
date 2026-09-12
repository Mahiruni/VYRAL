import Link from 'next/link'
import { ArrowUpRight, Flame, Radar, Sparkles } from 'lucide-react'
import { PageShell, EmptyState } from '@/app/components/page-shell'
import { requireUser } from '@/lib/auth'

type Trend = { id:string; title:string; category:string|null; score:number|null; velocity:number|null; acceleration:number|null; niche_fit:number|null; competition:string|null; status:string|null; source:string|null; detected_at:string|null }

export default async function Trends(){
  const {supabase,user}=await requireUser()
  const [{data:trends},{data:profile},{data:videos}]=await Promise.all([
    supabase.from('trends').select('*').order('score',{ascending:false,nullsFirst:false}).limit(30),
    supabase.from('creator_profiles').select('*').eq('user_id',user.id).maybeSingle(),
    supabase.from('videos').select('views,likes,comments,shares').eq('user_id',user.id).limit(100),
  ])
  const rows=(trends||[]) as Trend[]
  const measured=videos||[]
  const engagement=measured.reduce((n,v)=>n+(v.likes||0)+(v.comments||0)+(v.shares||0),0)
  const views=measured.reduce((n,v)=>n+(v.views||0),0)
  const baseline=views>0?Math.round(engagement/Math.max(views,1)*1000)/10:null
  const personalized=rows.map(t=>({
    ...t,
    opportunity:Math.round(((t.score||0)*.45+(t.niche_fit||0)*.35+(t.velocity||0)*.2)),
  })).sort((a,b)=>b.opportunity-a.opportunity)
  const top=personalized[0]
  const rising=personalized.filter(t=>(t.velocity||0)>=70).length

  return <PageShell title="Opportunities" description="A working radar built from signals VYRAL actually has. When there is no source data, VYRAL says so instead of inventing a trend.">
    {rows.length===0 ? <EmptyState title="The radar is quiet" description="There are no verified trend signals in your workspace yet. Connect TikTok and run a sync, then VYRAL can rank opportunities against your Creator DNA. No sample scores are shown here." href="/settings" action="Connect TikTok"/> : <>
      <div className="grid gap-4 md:grid-cols-3">
        <Stat icon={Radar} label="Signals available" value={String(rows.length)}/>
        <Stat icon={Flame} label="Rising signals" value={String(rising)}/>
        <Stat icon={Sparkles} label="Best fit" value={top?`${top.opportunity}/100`:'—'}/>
      </div>
      <div className="mt-10 border-t border-black/10 pt-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow text-[#ff3d55]">PERSONALIZED RADAR</p><h2 className="mt-2 font-display text-4xl font-semibold">What deserves your attention</h2><p className="mt-2 max-w-xl text-sm text-black/45">Ranked using the available signal, niche fit and momentum. It is an opportunity score—not a promise of views.</p></div>
          {profile&&<span className="font-mono text-[9px] uppercase tracking-[.16em] text-black/35">DNA {profile.creator_score??'not scored'} · {profile.niche||'niche not set'}</span>}
        </div>
        <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
          {personalized.map((t,i)=><article key={t.id} className="grid gap-5 py-7 md:grid-cols-[60px_1fr_180px_150px] md:items-center">
            <span className="font-mono text-[10px] text-black/25">0{Math.min(i+1,99)}</span>
            <div><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-[8px] uppercase tracking-[.15em] text-[#ff3d55]">{t.status||'Signal'}</span>{t.source&&<span className="font-mono text-[8px] uppercase tracking-[.12em] text-black/25">{t.source}</span>}</div><h3 className="mt-2 font-display text-3xl font-semibold leading-none">{t.title}</h3><p className="mt-2 text-xs text-black/40">{t.category||'Uncategorised'} · detected {t.detected_at?new Date(t.detected_at).toLocaleDateString():'recently'}</p></div>
            <div><p className="font-mono text-[8px] uppercase tracking-[.14em] text-black/30">Opportunity</p><p className="mt-1 font-display text-4xl font-semibold">{t.opportunity}<span className="ml-1 text-sm text-black/25">/100</span></p><p className="mt-1 text-[10px] text-black/35">{t.niche_fit??'—'}% niche fit</p></div>
            <div className="flex items-center justify-between gap-3 md:justify-end"><span className="text-[10px] text-black/40">Velocity {t.velocity??'—'}</span><Link href={`/studio?trend=${encodeURIComponent(t.id)}`} aria-label={`Create from ${t.title}`} className="grid h-10 w-10 shrink-0 place-items-center bg-black text-white transition hover:bg-[#ff3d55]"><ArrowUpRight size={15}/></Link></div>
          </article>)}
        </div>
      </div>
      <div className="mt-8 border-t border-black/10 pt-6 text-[10px] text-black/35">{baseline!==null?`Your imported videos currently average ${baseline}% visible engagement per view.`:'Import videos to give VYRAL a creator baseline.'} VYRAL will use this evidence as more data arrives.</div>
    </>}
  </PageShell>
}

function Stat({icon:Icon,label,value}:{icon:any;label:string;value:string}){return <div className="border-y border-black/10 bg-white/40 p-5"><Icon size={17} className="text-[#ff3d55]"/><p className="mt-5 text-[9px] font-bold uppercase tracking-[.16em] text-black/30">{label}</p><p className="mt-1 font-display text-3xl font-semibold">{value}</p></div>}
