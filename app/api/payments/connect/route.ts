import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth'

function fail(request: Request, message: string) {
  const url = new URL('/billing', request.url)
  url.searchParams.set('error', message)
  return NextResponse.redirect(url)
}

export async function GET(request: Request) {
  const { user } = await requireUser()
  const provider = new URL(request.url).searchParams.get('provider')

  if (provider === 'stripe') {
    const secret = process.env.STRIPE_SECRET_KEY
    const country = process.env.STRIPE_CONNECT_COUNTRY
    if (!secret || !country) return fail(request, 'Stripe Connect is not configured yet. Add STRIPE_SECRET_KEY and STRIPE_CONNECT_COUNTRY in Vercel.')

    const body = new URLSearchParams({ type: 'express', country, 'capabilities[card_payments][requested]': 'true', 'capabilities[transfers][requested]': 'true', 'metadata[vyral_user_id]': user.id })
    const accountResponse = await fetch('https://api.stripe.com/v1/accounts', { method: 'POST', headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body, cache: 'no-store' })
    const account = await accountResponse.json()
    if (!accountResponse.ok || !account.id) return fail(request, account?.error?.message || 'Stripe could not create the connected account.')

    const links = new URLSearchParams({ account: account.id, refresh_url: `${new URL('/billing', request.url).origin}/billing?error=Stripe onboarding expired. Please reconnect.`, return_url: `${new URL('/billing', request.url).origin}/billing?provider=stripe&connected=1`, type: 'account_onboarding' })
    const linkResponse = await fetch('https://api.stripe.com/v1/account_links', { method: 'POST', headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: links, cache: 'no-store' })
    const link = await linkResponse.json()
    if (!linkResponse.ok || !link.url) return fail(request, link?.error?.message || 'Stripe could not start onboarding.')
    return NextResponse.redirect(link.url)
  }

  if (provider === 'paypal') {
    const clientId = process.env.PAYPAL_CLIENT_ID
    const secret = process.env.PAYPAL_CLIENT_SECRET
    const base = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com'
    const returnUrl = process.env.PAYPAL_RETURN_URL || `${new URL('/billing', request.url).origin}/billing?provider=paypal&connected=1`
    if (!clientId || !secret) return fail(request, 'PayPal seller onboarding is not configured yet. Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in Vercel.')

    const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')
    const tokenResponse = await fetch(`${base}/v1/oauth2/token`, { method: 'POST', headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'grant_type=client_credentials', cache: 'no-store' })
    const token = await tokenResponse.json()
    if (!tokenResponse.ok || !token.access_token) return fail(request, 'PayPal authentication failed. Check the platform credentials and approval status.')

    const referralResponse = await fetch(`${base}/v2/customer/partner-referrals`, { method: 'POST', headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ tracking_id: user.id, operations: [{ operation: 'API_INTEGRATION', api_integration_preference: { rest_api_integration: { integration_method: 'PAYPAL', integration_type: 'THIRD_PARTY', third_party_details: { features: ['PAYMENT', 'REFUND', 'PARTNER_FEE'] } } } }], products: ['EXPRESS_CHECKOUT'], legal_consents: [{ type: 'SHARE_DATA_CONSENT', granted: true }], partner_config_override: { return_url: returnUrl } }), cache: 'no-store' })
    const referral = await referralResponse.json()
    const action = referral?.links?.find((link: { rel?: string; href?: string }) => link.rel === 'action_url')?.href
    if (!referralResponse.ok || !action) return fail(request, referral?.name || 'PayPal could not start seller onboarding. Your PayPal platform may require partner approval.')
    return NextResponse.redirect(action)
  }

  return fail(request, 'Unknown payment provider.')
}
