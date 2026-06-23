 import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getServerSession } from '@/lib/server/getServerSession'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const user = await getServerSession()
    const formData = await request.formData()
    const priceId = formData.get('priceId')
    const amount = formData.get('amount')

    const price= {
        pro: "price_1TlJ9ZPqO8P30Ol4RCLb9Hqm",
        premium: "price_1TlJBsPqO8P30Ol4feplkBq7",
    }
    const activePrice = price[priceId]

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: activePrice,
          quantity: 1,
        },
      ],
      metadata:{
       type: 'subscription',
       priceId,
       buyerName: user?.name,
       buyerId: user?.id,
       amount
      },

      mode: 'subscription',
      success_url: `${origin}/pricing/premium_success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}