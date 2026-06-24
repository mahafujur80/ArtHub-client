import { serverFetch } from "../server/action";

export const getMyPurchases = async(userId, page=1)=>{
    const res = await serverFetch(`/api/purchases?userId=${userId}&page=${page}`);
    return res;
}

//