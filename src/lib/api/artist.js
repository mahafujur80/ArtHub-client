import { serverFetch } from "../server/action";

// get artist artworks by artist id
export const getArtistArtworks = async(artistId, page=1)=>{
    const res = await serverFetch(`/api/my/artwork?artistId=${artistId}&page=${page}`);
    return res;
}

// get sales history by artist id
export const getArtistSales = async(artistId, page=1)=>{
    const res = await serverFetch(`/api/artist/sales?artistId=${artistId}&page=${page}`);
    return res;
}