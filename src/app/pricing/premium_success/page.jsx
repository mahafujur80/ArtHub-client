import { createPayment } from '@/lib/server/payments'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { FaCrown, FaCheckCircle, FaRocket } from "react-icons/fa";


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
        await createPayment({ ...metadata, sessionId: session_id })

        return (
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-orange-100 p-8 text-center">

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                                <FaCrown className="text-5xl text-orange-500" />
                            </div>

                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                                <FaCheckCircle />
                            </div>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 font-semibold px-4 py-2 rounded-full mb-4">
                        <FaCrown />
                        PREMIUM ACTIVATED
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Welcome to Premium! 🎉
                    </h1>

                    <p className="text-gray-600 text-lg mb-8">
                        Your premium membership has been activated successfully.
                    </p>

                    {/* Email Box */}
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-left mb-6">
                        <p className="text-gray-700">
                            A confirmation email has been sent to
                        </p>

                        <p className="font-bold text-orange-500 mt-1 break-all">
                            {customerEmail}
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-50 rounded-2xl p-4">
                            <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-2" />
                            <h3 className="font-semibold">Premium Access</h3>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4">
                            <FaRocket className="text-orange-500 text-2xl mx-auto mb-2" />
                            <h3 className="font-semibold">Instant Activation</h3>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4">
                            <FaCrown className="text-yellow-500 text-2xl mx-auto mb-2" />
                            <h3 className="font-semibold">Exclusive Features</h3>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="/dashboard"
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
                        >
                            Go To Dashboard
                        </a>

                        <a
                            href="/arts"
                            className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded-xl transition"
                        >
                            Explore Artworks
                        </a>
                    </div>

                </div>
            </section>
        )
    }
}