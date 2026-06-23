import { serverFetch } from "../server/action";

export const getPurchaseHistory = async(userId, page=1)=>{
    const res = await serverFetch(`/api/payments?userId=${userId}&page=${page}`)
    return res;
}