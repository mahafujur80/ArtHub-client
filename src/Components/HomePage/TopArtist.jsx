import Image from "next/image";

export default function TopArtists() {
    const artists = [
        {
            id: 1,
            name: "Sophia Carter",
            avatar:"https://i.ibb.co.com/5xhVPwhg/man2.jpg",
            sales: 120,
        },
        {
            id: 2,
            name: "James Wilson",
            avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
            sales: 98,
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            avatar:"https://i.ibb.co.com/yBZNVVBb/man5.jpg",
            sales: 85,
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Top Artists
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Meet our best-selling artists loved by collectors worldwide.
                    </p>
                </div>

                {/* Artists */}
                <div className="grid gap-8 md:grid-cols-3">
                    {artists.map((artist, index) => (
                        <div
                            key={artist.id}
                            className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition"
                        >
                            <div className="relative w-24 h-24 mx-auto">
                                <Image
                                    src={artist.avatar}
                                    alt={artist.name}
                                    fill
                                    className="rounded-full object-cover border-4 border-orange-500"
                                />

                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                                    #{index + 1}
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-gray-900">
                                {artist.name}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                                {artist.sales}+ Sales
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}