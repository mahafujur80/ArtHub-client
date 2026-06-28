import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function ArtCard({ art }) {
  return (
    <Link href={`/artwork/${art?._id}`}>
      <div className="cursor-pointer group w-full bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300 h-full flex flex-col">

        {/* Image Section - Responsive height */}
        <div className="relative h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 overflow-hidden flex-shrink-0">
          <Image
            src={art?.image}
            alt={art?.title}
            width={500}
            height={500}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 50vw, 33vw"
          />

          {/* Orange gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent" />

          {/* price badge - orange themed - responsive */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-orange-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] xs:text-xs sm:text-sm font-semibold shadow-lg">
            ${art?.price}
          </div>
        </div>

        {/* Content - Responsive padding */}
        <div className="p-2 xs:p-2.5 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 md:space-y-3 flex-1 flex flex-col">

          {/* Title - Responsive text */}
          <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {art?.title}
          </h2>

          {/* Artist - Responsive text */}
          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 flex items-center gap-1">
            <span className="font-semibold sm:text-[10px]">Artist:</span>
            <span className="truncate">{art?.artist || "Unknown Artist"}</span>
          </p>

          {/* View Details Button - Responsive */}
          <div className="pt-1 sm:pt-1.5 md:pt-2 mt-auto">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 xs:py-2 sm:py-2.5 px-2 xs:px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 transform group-hover:scale-[1.02] shadow-md hover:shadow-orange-200/50 flex items-center justify-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm md:text-base">
              <span>View Details</span>
              <MdOutlineKeyboardArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
}