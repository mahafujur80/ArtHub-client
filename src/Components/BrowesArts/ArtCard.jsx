import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function ArtCard({ art }) {
  return (
    <Link href={`/artwork/${art._id}`}>
      <div className="group w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300">

        {/* Image Section */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={art.image}
            alt={art.title}
            width={500}
            height={500}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Orange gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent" />

          {/* price badge - orange themed */}
          <div className="absolute bottom-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            ${art.price}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {art.title}
          </h2>

          {/* Artist with orange dot */}
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="font-semibold"> Arts By: </span> 
             {art.artist || "Unknown Artist"}
          </p>

          {/* View Details Button */}
          <div className="pt-2">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-[1.02] shadow-md hover:shadow-orange-200/50 flex items-center justify-center gap-2">
              <span>View Details</span>
              <MdOutlineKeyboardArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
}