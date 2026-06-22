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
    const price = formData.get('price')
    const artworkName = formData.get('artworkName')
    const artistId = formData.get('artistId')
    const artistName = formData.get('artistName')


    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data:{
            currency: 'usd',
            product_data: {
              name: 'Artwork',
            },
            unit_amount: Number(price) * 100,
          },
          quantity: 1,
        },
      ],
      metadata:{
       price,
       artworkName,
       artistName,
       buyerName: user?.name,
       buyerId: user?.id,
       artistId,
      },
      mode: 'payment',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}