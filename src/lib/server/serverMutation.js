'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

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


const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const serverMutation = async (api, data, method = "POST") => {
    try {
        const token = await getJwtToken();
        const reqHeaders = {
            "Content-Type": "application/json",
        };
        if (token) {
            reqHeaders.authorization = `Bearer ${token}`;
        }
        const response = await fetch(`${baseUrl}${api}`, {
            method: method,
            headers: reqHeaders,
            body: JSON.stringify(data),
        });
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return { success: response.ok };
    } catch (error) {
        console.error(`Error in serverMutation for ${api}:`, error);
        return { success: false, message: error.message };
    }
}

export const serverDelete = async (api, id) =>{
    try {
        const token = await getJwtToken();
        const reqHeaders = {};
        if (token) {
            reqHeaders.authorization = `Bearer ${token}`;
        }
        const res = await fetch(`${baseUrl}${api}${id}`,{
            method: "DELETE",
            headers: reqHeaders
        });
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await res.json();
        }
        return { success: res.ok };
    } catch (error) {
        console.error(`Error in serverDelete for ${api}${id}:`, error);
        return { success: false, message: error.message };
    }
}
