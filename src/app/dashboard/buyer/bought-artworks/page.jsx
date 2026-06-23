import { getMyPurchases } from '@/lib/api/purchase';
import { getServerSession } from '@/lib/server/getServerSession';
import React from 'react';
import ArtworkCard from './ArtWorkCard';

const BoughtArtworks = async () => {
    const user = await getServerSession()
    const myArtworks = await getMyPurchases(user?.id)
    console.log(myArtworks, user)

    return (
        <div className="p-4">
            
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                {
                    myArtworks.map(artwork => <ArtworkCard artwork={artwork} key={artwork?._id}/>)
                }
            </div>
        </div>
    );
};

export default BoughtArtworks;