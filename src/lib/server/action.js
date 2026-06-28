'use server';

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getJwtToken = async()=>{
    try{
        const jwtData = await auth.api.getToken({
            headers: await headers()
        })
        return jwtData?.token || null;
    }catch(error){
        console.log('no jwt token data found my boy ', error);
        return null;
    }
}


// server fetch
export const serverFetch = async (api) => {
    const token = await getJwtToken();
    
    const response = await fetch(`${baseUrl}${api}`,{
        headers: {authorization: `Bearer ${token}`}
    });
    return await response.json();
}
