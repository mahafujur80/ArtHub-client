import ArtCard from '@/Components/BrowesArts/ArtCard';
import { getAllArtworks } from '@/lib/api/artwork';
import React from 'react';

const AllArtPage = async() => {
    const allArts = await getAllArtworks()
    console.log(allArts)
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {
                allArts.map(art => <ArtCard art={art} key={art._id}/>)
            }
        </div>
    );
};

export default AllArtPage;