import { serverFetch } from "../server/action";
import { serverMutation } from "../server/serverMutation";

export const getPurchaseHistory = async(userId, page=1)=>{
    const res = await serverFetch(`/api/payments?userId=${userId}&page=${page}`)
    return res;
}

// get my getMyTotalPurchase
export const getMyTotalPurchase = async(userId)=>{
    const res = await serverFetch(`/api/purchases/total?userId=${userId}`)
    return res;
}
