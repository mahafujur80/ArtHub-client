import ArtCard from '@/Components/BrowesArts/ArtCard';
import { getAllArtworks } from '@/lib/api/artwork';
import React from 'react';

const AllArtPage = async() => {
    const allArts = await getAllArtworks()

    
    return (
        <div className=' min-h-screen bg-[#f8f4ef] py-20'>
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {
                allArts.map(art => <ArtCard art={art} key={art._id}/>)
            }
        </div>
        </div>
    );
};

export default AllArtPage;