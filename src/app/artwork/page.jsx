import ArtCard from '@/Components/BrowesArts/ArtCard';
import BrowseArtworkHeader from '@/Components/BrowesArts/BrowesArtWorkHeader';
import { getAllArtworks } from '@/lib/api/artwork';
import React from 'react';

const AllArtPage = async({searchParams}) => {
    const { search, minPrice, maxPrice, category, sort, page } = await searchParams;
    const allArts = await getAllArtworks(search, minPrice, maxPrice, category, sort, page);

    
    return (
        <div className=' min-h-screen  p-4 '>

        <BrowseArtworkHeader/>
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">

            {
                allArts.map(art => <ArtCard art={art} key={art._id}/>)
            }
        </div>
        </div>
    );
};

export default AllArtPage;