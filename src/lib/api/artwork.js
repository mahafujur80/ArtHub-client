import { serverFetch } from "../server/action";

export const getAllArtworks = async (search="", minPrice="", maxPrice="", category="", sort="", page=1) => {
    const res = await serverFetch(`/api/artwork?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&sort=${sort}&page=${page}`);
    return res;
}
// search, minPrice, maxPrice, category, sort
export const getArtworkById = async(id)=>{
    const res = await serverFetch(`/api/artwork/${id}`);
    return res;
}
