import { serverFetch } from "../server/action";

export const getPurchaseHistory = async(userId)=>{
    const res = await serverFetch(`/api/payments?userId=${userId}`)
    return res;
}