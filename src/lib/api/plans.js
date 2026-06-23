import { serverFetch } from "../server/action"

export const getPlans = async(plan)=>{
    const res = serverFetch(`/api/plans?plan=${plan}`)
    return res;
}