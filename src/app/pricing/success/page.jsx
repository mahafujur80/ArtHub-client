import { createPayment } from '@/lib/server/payments';
import { stripe } from '@/lib/stripe'
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { FaCheckCircle } from "react-icons/fa";


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const paymentsObj = {
        ...metadata,
        sessionId: session_id,
    }
  await createPayment(paymentsObj)
    
    return (
      <section className="min-h-screen  flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-orange-100 p-8 text-center">

          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
              <FaCheckCircle className="text-orange-500 text-5xl" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            Thank you for your purchase. A confirmation email has been sent to
            <span className="font-semibold text-orange-500">
              {" "}
              {customerEmail}
            </span>
            .
          </p>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600">
              Your order has been successfully processed and will appear in your
              account shortly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard/buyer"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
            >
              View Orders
            </Link>

            <Link
              href="/artwork"
              className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded-xl transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }
}