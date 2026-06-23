import { serverFetch } from "../server/action";

export const getMyPurchases = async(userId)=>{
    const res = await serverFetch(`/api/purchases?userId=${userId}`)
    return res;
}