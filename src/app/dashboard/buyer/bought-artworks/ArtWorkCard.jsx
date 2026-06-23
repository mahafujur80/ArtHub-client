import Image from "next/image";
import Link from "next/link";
import { FaEye, FaArrowRight } from "react-icons/fa";

const ArtworkCard = ({ artwork }) => {

  return (
    <Link href={`/artwork/${artwork?.artworkId}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-300 w-full">

        {/* Image Section - Smaller on mobile */}
        <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={artwork?.image}
            alt={artwork?.artworkName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>

        {/* Content Section - Smaller padding on mobile */}
        <div className="p-2.5 sm:p-3 md:p-4 lg:p-5">
          {/* Title - Smaller text on mobile */}
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-500 transition-colors">
            {artwork?.artworkName}
          </h3>

          {/* View Details Button - Smaller on mobile */}
          <button className="w-full mt-2 sm:mt-3 flex items-center justify-center gap-1.5 sm:gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 group/btn hover:shadow-lg hover:shadow-orange-200/50 text-[10px] sm:text-sm md:text-base">
            <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span >View Details</span>
            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;