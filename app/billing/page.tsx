import Link from 'next/link'
import { ArrowUpRight, Check, CreditCard, Globe2, Landmark, ShieldCheck, Wallet, Zap } from 'lucide-react'
import { PageShell } from '@/app/components/page-shell'
import { requireUser } from '@/lib/auth'

const plans = [
  { name: 'Free', price: '$0', detail: 'Explore VYRAL and save ideas', features: ['Discover opportunities', 'Save ideas', 'Basic performance insights'] },
  { name: 'Creator', price: '$19', detail: 'For creators publishing every week', features: ['Unlimited idea discovery', 'Advanced results', 'Creator workflows', 'Priority insights'], featured: true },
  { name: 'Studio', price: '$49', detail: 'For serious creators and small teams', features: ['Everything in Creator', 'Multiple creator accounts', 'Team workspace', 'Advanced intelligence'] },
]

const providers = [
  { name: 'Stripe', kind: 'Checkout + payouts', description: 'Cards, wallets and local payment methods where supported. Connect lets creators onboard their own payout account.', icon: CreditCard, href: '/api/payments/connect?provider=stripe' },
  { name: 'PayPal', kind: 'Checkout + seller payouts', description: 'PayPal checkout and seller onboarding for eligible marketplace/platform integrations.', icon: Wallet, href: '/api/payments/connect?provider=paypal' },
  { name: 'Bank transfer', kind: 'Payout destination', description: 'Connect a supported bank account through the payment provider rather than storing banking credentials in VYRAL.', icon: Landmark, href: '#providers' },
  { name: 'TikTok', kind: 'Creator connection', description: 'Connect TikTok for creator data and monetization context. TikTok Coins themselves cannot be accepted, transferred or exchanged as VYRAL currency.', icon: Zap, href: '/api/tiktok/connect' },
]

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ error?: string; provider?: string }> }) {
  await requireUser()
  const p = await searchParams

  return <PageShell title="Payments" description="A single place to manage subscriptions, connected payout accounts and the payment methods your region supports.">
    {p.error && <div className="mb-8 border-l-2 border-[#ff3d55] bg-white px-5 py-4 text-sm leading-6 text-black/55"><strong className="text-black">Connection needs setup.</strong> {decodeURIComponent(p.error)}</div>}

    <section className="border-y border-black/10 bg-[#111113] px-6 py-8 text-white sm:px-8 sm:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl"><span className="font-mono text-[8px] uppercase tracking-[.2em] text-white/35">VYRAL PAYMENTS</span><h2 className="mt-4 font-display text-4xl font-semibold leading-[.9] tracking-[-.04em] sm:text-6xl">Money should move as simply as the work.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/45">Choose how you pay for VYRAL. Creators can also connect eligible payout accounts so earnings can move to the provider they control.</p></div>
        <div className="flex items-center gap-3 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><ShieldCheck size={18} className="text-[#ff6b7e]"/><span className="text-xs text-white/55">Provider-hosted verification<br/>No card details stored by VYRAL</span></div>
      </div>
    </section>

    <section className="mt-12"><div className="flex items-end justify-between border-b border-black/10 pb-5"><div><p className="font-mono text-[8px] uppercase tracking-[.18em] text-black/30">PLANS</p><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.03em]">Choose your workspace.</h2></div><span className="hidden text-xs text-black/35 sm:block">Cancel anytime</span></div><div className="grid gap-px border-x border-b border-black/10 bg-black/10 md:grid-cols-3">{plans.map(plan => <article key={plan.name} className={`bg-[#f4f3ee] p-6 sm:p-7 ${plan.featured ? 'relative' : ''}`}>{plan.featured && <div className="absolute right-5 top-5 bg-[#ff3d55] px-2 py-1 font-mono text-[7px] font-bold uppercase tracking-[.15em] text-white">Most useful</div>}<h3 className="font-display text-2xl font-semibold">{plan.name}</h3><div className="mt-6 flex items-end gap-1"><span className="font-display text-5xl font-semibold tracking-[-.05em]">{plan.price}</span>{plan.name !== 'Free' && <span className="pb-1 text-xs text-black/35">/ month</span>}</div><p className="mt-3 min-h-10 text-xs leading-5 text-black/45">{plan.detail}</p><button className={`mt-7 w-full px-4 py-3 text-xs font-bold transition ${plan.featured ? 'bg-[#111113] text-white hover:bg-[#ff3d55]' : 'border border-black/10 bg-white hover:bg-black hover:text-white'}`}>{plan.name === 'Free' ? 'Current plan' : `Choose ${plan.name}`} <ArrowUpRight size={13} className="ml-1 inline"/></button><ul className="mt-7 space-y-3 border-t border-black/10 pt-6">{plan.features.map(feature => <li key={feature} className="flex gap-2 text-xs text-black/55"><Check size={13} className="mt-0.5 shrink-0 text-[#ff3d55]"/>{feature}</li>)}</ul></article>)}</div></section>

    <section id="providers" className="mt-14"><div className="border-b border-black/10 pb-5"><p className="font-mono text-[8px] uppercase tracking-[.18em] text-black/30">CONNECTED ACCOUNTS</p><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.03em]">Payment & payout connections.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-black/45">VYRAL should never ask creators to paste banking credentials into a form. Connect through the provider, complete its verification, and VYRAL receives only the account reference and permissions required for the workflow.</p></div><div className="divide-y divide-black/10 border-x border-b border-black/10">{providers.map(({name,kind,description,icon:Icon,href}) => <div key={name} className="flex flex-col gap-5 bg-[#f4f3ee] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"><div className="flex gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center border border-black/10 bg-white"><Icon size={17}/></div><div><div className="flex items-center gap-3"><h3 className="font-display text-xl font-semibold">{name}</h3><span className="font-mono text-[7px] uppercase tracking-[.14em] text-black/30">{kind}</span></div><p className="mt-2 max-w-2xl text-xs leading-5 text-black/45">{description}</p></div></div>{name === 'Bank transfer' ? <span className="text-[9px] font-bold uppercase tracking-[.12em] text-black/30">Available through provider</span> : <Link href={href} className="inline-flex shrink-0 items-center justify-center gap-2 border border-black/10 bg-white px-4 py-3 text-[10px] font-bold transition hover:bg-black hover:text-white">Connect {name} <ArrowUpRight size={13}/></Link>}</div>)}</div></section>

    <section className="mt-14 border-t border-black/10 pt-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-mono text-[8px] uppercase tracking-[.18em] text-black/30">BUILT FOR SCALE</p><h2 className="mt-2 font-display text-2xl font-semibold">One identity. Multiple rails.</h2><p className="mt-2 max-w-xl text-xs leading-5 text-black/45">Stripe Connect and PayPal marketplace onboarding are designed for connected accounts and payouts; provider availability varies by country, account type and approval.</p></div><div className="flex items-center gap-3 text-black/30"><Globe2 size={18}/><span className="font-mono text-[8px] uppercase tracking-[.14em]">Global-ready</span></div></div></section>
  </PageShell>
}
