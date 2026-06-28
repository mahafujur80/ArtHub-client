import { FaPaintBrush, FaEnvelope } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import Image from 'next/image';
import { Separator } from '@heroui/react';
import { getArtistProfileData, getArtistProfileDataById } from '@/lib/api/artist';
import ArtCard from '@/Components/BrowesArts/ArtCard';


export default async function ArtistProfile({ params }) {
    const { artist } = await params;
    const artistProfile = await getArtistProfileData(artist)
    const artworkData = await getArtistProfileDataById(artistProfile?._id)

    return (
        <div className="container mx-auto px-6 min-h-screen border-b border-zinc-200">
            {/* artist profile section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex items-center gap-3 sm:gap-5">

                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full ring-2 ring-violet-100 ring-offset-2 overflow-hidden">
                            <Image
                                src={artistProfile?.image}
                                alt={artistProfile?.name}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                            <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-zinc-900 truncate">
                                {artistProfile?.name}
                            </h1>
                            <MdVerified className="text-blue-500 flex-shrink-0 text-base sm:text-lg" />
                        </div>
                        <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-violet-50 text-violet-700 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium mb-1.5 sm:mb-2">
                            {artistProfile?.role}
                        </span>

                        <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-sm text-zinc-500 mb-2 sm:mb-3">
                            <FaEnvelope className="text-[10px] sm:text-xs text-zinc-400" />
                            <span className="truncate">{artistProfile?.email}</span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium">
                            <FaPaintBrush className="text-[10px] sm:text-sm" />
                            <span>{artworkData?.length} Total Artworks</span>
                        </div>

                    </div>
                </div>

            </div>

            {/* artist artwork section  */}
            <Separator variant="secondary" />
            <div className="py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
                {
                    artworkData.map(art => <ArtCard art={art} key={art._id} />)
                }
            </div>
        </div>
    );
}