import { getPlans } from "@/lib/api/plans";
import { getMyPurchases } from "@/lib/api/purchase";
import { getServerSession } from "@/lib/server/getServerSession";
import Link from "next/link";
import { FaShoppingBag, FaCrown, FaMoneyBillWave, FaArrowRight } from "react-icons/fa";

export default async function BuyerOverview() {

     const user = await getServerSession()
      const planLimits = await getPlans(user?.plan)
      const purchases = await getMyPurchases(user?.id)


  const purchaseCount = purchases.length;
  const remainingPurchases = planLimits.maxPurchase === -1 ? "Unlimited" : planLimits.maxPurchase - purchaseCount;

  return (
    <div className="space-y-8 p-4">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Buyer Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here is an overview of your account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Purchases
              </p>

              <h3 className="text-3xl font-bold mt-2 text-orange-500">
                {purchaseCount}
              </h3>
            </div>

            <FaShoppingBag className="text-3xl text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Current Plan
              </p>

              <h3 className="text-3xl font-bold mt-2 capitalize text-orange-500">
                {user.plan}
              </h3>
            </div>

            <FaCrown className="text-3xl text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Remaining Purchases
              </p>

              <h3 className="text-3xl font-bold mt-2 text-orange-500">
                {remainingPurchases}
              </h3>
            </div>

            <FaArrowRight className="text-3xl text-orange-500" />
          </div>
        </div>

       
      </div>

      {/* Subscription Overview */}
     

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <Link
            href="/dashboard/purchase-history"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-6 transition"
          >
            <h3 className="font-semibold text-lg">
              Purchase History
            </h3>

            <p className="text-sm mt-2 opacity-90">
              View all purchased artworks.
            </p>
          </Link>

          <Link
            href="/dashboard/bought-artworks"
            className="bg-white border rounded-2xl p-6 hover:border-orange-500 transition"
          >
            <h3 className="font-semibold text-lg">
              Bought Artworks
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Browse your artwork collection.
            </p>
          </Link>

          <Link
            href="/pricing"
            className="bg-white border rounded-2xl p-6 hover:border-orange-500 transition"
          >
            <h3 className="font-semibold text-lg">
              Upgrade Plan
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Unlock more purchases.
            </p>
          </Link>

        </div>
      </div>

    </div>
  );
}