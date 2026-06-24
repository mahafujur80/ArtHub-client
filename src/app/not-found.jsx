import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">

        {/* 404 */}
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-orange-500 leading-none">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
          Explore our collection of unique artworks and discover something inspiring.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            Back to Home
          </Link>

          <Link
            href="/arts"
            className="px-6 py-3 rounded-xl border border-orange-500 text-orange-500 font-semibold hover:bg-orange-50 transition"
          >
            Browse Artworks
          </Link>
        </div>

        {/* Decorative Circle */}
        <div className="relative mt-12 flex justify-center">
          <div className="absolute h-32 w-32 rounded-full bg-orange-200 blur-3xl opacity-60"></div>
        </div>

      </div>
    </div>
  );
}