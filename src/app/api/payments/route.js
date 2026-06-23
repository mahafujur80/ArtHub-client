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
    const amount = formData.get('price')
    const artworkName = formData.get('artworkName')
    const artistId = formData.get('artistId')
    const artistName = formData.get('artistName')
    const artworkId = formData.get('artworkId')
    const image = formData.get('image')


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
            unit_amount: Number(amount) * 100,
          },
          quantity: 1,
        },
      ],
      metadata:{
      type: 'payment',
       amount,
       artworkName,
       artistName,
       buyerName: user?.name,
       buyerId: user?.id,
       artistId,
       artworkId,
       image,
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