export default function ArtCard({ art }) {
  return (
    <div className="group w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border">

      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={art.image}
          alt={art.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* price badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">
          ${art.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-1">

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
          {art.title}
        </h2>

        {/* Artist */}
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {art.artistName || "Unknown Artist"}
        </p>

      </div>
    </div>
  );
}