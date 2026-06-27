import ArtWorkComments from "@/Components/Comments/ArtWorkComents";
import NoPurchaseComSec from "@/Components/Comments/NoPurchaseComSec";
import { getArtworkById } from "@/lib/api/artwork";
import { getPlans } from "@/lib/api/plans";
import { getMyPurchases } from "@/lib/api/purchase";
import { getServerSession } from "@/lib/server/getServerSession";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaTag,
  FaDollarSign,
  FaShoppingCart,
  FaClock
} from "react-icons/fa";


const ArtworkDetailPage = async ({ params }) => {
  const { id } = await params;
  const art = await getArtworkById(id)
  const user = await getServerSession()
  const plan = await getPlans(user?.plan)
  const purchases = await getMyPurchases(user?.id)

  // Check if current user is the artist
  const isArtist = user?.id === art?.artistId;


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/artwork" className="hover:text-orange-500 transition-colors">Artworks</Link>
          <span>›</span>
          <span className="text-gray-900 font-medium line-clamp-1">{art?.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="relative group rounded-2xl overflow-hidden bg-white shadow-xl border border-orange-100">
              {/* Main Image */}
              <div className="relative aspect-square w-full">
                <Image
                  src={art?.image}
                  alt={art?.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-orange-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <FaTag className="w-4 h-4" />
                    {art?.category}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-orange-600 px-5 py-2.5 rounded-full text-lg font-bold shadow-lg border-2 border-orange-200">
                    <FaDollarSign className="w-5 h-5" />
                    {art?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {art?.title}
            </h1>

            {/* Artist Info */}
            <Link
              // href={`/artists/${art.artistId}`}
              href='#'
              className="inline-flex items-center gap-3 group"
            >
              <Image
                src={art?.artistImage}
                alt={art?.artist}
                width={50}
                height={50}
                className='rounded-full w-12 h-12 border-2 border-orange-500'
              />
              <div>
                <p className="text-sm text-gray-500">Created by</p>
                <p className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                  {art?.artist || "Unknown Artist"}
                </p>
              </div>
            </Link>

            {/* Meta Info Grid */}
            <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-100 p-1">
                  <FaCalendarAlt className="h-3 w-3 text-orange-500" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Uploaded</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(art?.createAt).toDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-orange-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed h-35 overflow-scroll">
                {art?.description || "No description available for this artwork."}
              </p>
            </div>

            {/* Purchase Section */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 shadow-xl shadow-orange-200/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Total Price</p>
                  <p className="text-white text-3xl font-bold">${art?.price}</p>
                </div>
                <div className="flex items-center gap-1 text-orange-100">
                  <FaClock className="w-4 h-4" />
                  <span className="text-sm">Available</span>
                </div>
              </div>

              {/* Purchase Button */}
              {isArtist ? (
                <div className="relative group">
                  <button
                    disabled
                    className="w-full bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-xl cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 border-2 border-white/30"
                  >
                    <FaShoppingCart className="w-5 h-5" />
                    <span>You can not buy your own art</span>
                  </button>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Artist cannot purchase their own artwork
                  </div>
                </div>
              ) : (
                <form action={!user?.id ? `/login?redirect=/artwork/${art._id}` : "/api/payments"} method="POST">
                  <div className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold  rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group cursor-pointer">

                    <input name="price" type="hidden" value={art?.price} />
                    <input name="artworkName" type="hidden" value={art?.title} />
                    <input name="artistName" type="hidden" value={art?.artist} />
                    <input name="artistId" type="hidden" value={art?.artistId} />
                    <input name="artworkId" type="hidden" value={art?._id} />
                    <input name="image" type="hidden" value={art?.image} />

                    {
                      plan?.maxPurchase !== -1 &&
                        purchases?.length >= plan?.maxPurchase ?
                        <Link href="/pricing">
                          <button className="w-full  p-3">
                            Upgrade Now For More Purchase
                          </button>
                        </Link>

                        :
                        <button type="submit" className="w-full flex items-center justify-center gap-5 p-3">
                          Purchase Now
                          <FaShoppingCart className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </button>
                    }

                  </div>
                </form>
              )}

              {!isArtist && (
                <p className="text-orange-100 text-xs text-center mt-3">
                  Secure transaction • Instant digital delivery
                </p>
              )}
            </div>

          </div>
        </div>
      </div>



      {
        !user?.id? <NoPurchaseComSec /> : <ArtWorkComments art={art} user={user} />
      }
    </div>
)};

export default ArtworkDetailPage;