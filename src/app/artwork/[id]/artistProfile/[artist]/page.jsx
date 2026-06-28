import React from 'react';

const ArtistAllArtWork = async({params}) => {
    const {artist} = await params;

    console.log(artist, 'check artist id bro')
    return (
        <div className='min-h-screen' >
               hello art buyer how are you MOTHER FUCKER
        </div>
    );
};

export default ArtistAllArtWork;