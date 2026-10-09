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
};


// server fetch
export const serverFetch = async (api) => {
    try {
        const token = await getJwtToken();
        const reqHeaders = {};
        if (token) {
            reqHeaders.authorization = `Bearer ${token}`;
        }
        
        const response = await fetch(`${baseUrl}${api}`, {
            headers: reqHeaders,
            cache: 'no-store'
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error(`Error fetching ${api}:`, error);
        return null;
    }
};
