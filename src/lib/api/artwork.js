import { serverFetch } from "../server/action";

export const getAllArtworks = async () => {
    const res = await serverFetch("/api/artwork");
    return res;
}