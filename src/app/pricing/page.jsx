'use client'
import { FaStar, FaCrown, FaCheck, FaShoppingBag, FaRocket, FaInfinity } from "react-icons/fa";

const PricingCards = () => {
    const pricingData = [
        {
            id: "free",
            name: "Free",
            icon: <FaStar className="w-8 h-8" />,
            price: "$0",
            description: "Perfect for art enthusiasts",
            maxPurchases: "3",
            features: [
                "Browse and discover artworks",
                "Purchase up to 3 paintings",
                "Basic search & filters",
                "Comment on purchased artworks",
                "Standard support"
            ],
            isPopular: false,
            buttonText: "Get Started"
        },
        {
            id: "pro",
            name: "Pro",
            icon: <FaRocket className="w-8 h-8" />,
            price: "$9.99",
            description: "For serious art collectors",
            maxPurchases: "9",
            features: [
                "Everything in Free tier",
                "Purchase up to 9 paintings",
                "Advanced search & filters",
                "Priority support",
                "Early access to new artworks",
                "Exclusive artist content"
            ],
            isPopular: true,
            buttonText: "Subscribe Now"
        },
        {
            id: "premium",
            name: "Premium",
            icon: <FaCrown className="w-8 h-8" />,
            price: "$19.99",
            description: "For collectors and investors",
            maxPurchases: "Unlimited",
            features: [
                "Everything in Pro tier",
                "Unlimited purchases",
                "Priority support 24/7",
                "Private art previews",
                "Investment insights",
                "Dedicated art advisor",
                "Premium events access"
            ],
            isPopular: false,
            buttonText: "Subscribe Now"
        }
    ];

    return (
        <div className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Select the perfect subscription tier for your art collecting journey
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingData.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${tier.isPopular ? "border-orange-500 shadow-orange-100" : "border-gray-200"
                                }`}
                        >
                            {/* Popular Badge */}
                            {tier.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="p-8">
                                {/* Icon & Tier Name */}
                                <div className="text-center mb-6">
                                    <div className={`inline-flex p-4 rounded-2xl bg-orange-500 text-white mb-4 shadow-lg shadow-orange-200`}>
                                        {tier.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-5xl font-bold text-gray-900">
                                            {tier.price}
                                        </span>
                                        <span className="text-gray-500 text-sm">/month</span>
                                    </div>

                                    {/* Max Purchases Badge */}
                                    <div className="mt-3 inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
                                        {tier.maxPurchases === "Unlimited" ? (
                                            <FaInfinity className="w-4 h-4 text-orange-500" />
                                        ) : (
                                            <FaShoppingBag className="w-4 h-4 text-orange-500" />
                                        )}
                                        <span className="text-sm font-medium text-orange-600">
                                            {tier.maxPurchases === "Unlimited"
                                                ? "Unlimited purchases"
                                                : `Up to ${tier.maxPurchases} purchases`}
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    {tier.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                                                <FaCheck className="w-3 h-3 text-orange-500" />
                                            </div>
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Subscribe Button */}
                                <form action="/api/subscription" method="POST">
                                 <input type="hidden" name="priceId" value={tier.id} />
                                 <input type="hidden" name="amount" value={tier.price} />
                                    <button
                                       type="submit"
                                        className={`w-full py-3.5 px-6 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${tier.isPopular
                                                ? "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 hover:shadow-xl"
                                                : "bg-gray-700 hover:bg-gray-800"
                                            } hover:scale-[1.02]`}
                                    >
                                        {tier.buttonText}
                                    </button>
                                </form>

                                {/* Note */}
                                <p className="text-xs text-gray-400 text-center mt-4">
                                    {tier.id === "free"
                                        ? "No credit card required"
                                        : "Cancel anytime • Secure payment"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default PricingCards;