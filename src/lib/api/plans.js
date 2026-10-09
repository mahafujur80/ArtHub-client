'use server';

import { serverFetch } from "../server/action";

export const getPlans = async(plan)=>{
    if (!plan) return null;
    const res = await serverFetch(`/api/plans?plan=${plan}`);
    return res;
};