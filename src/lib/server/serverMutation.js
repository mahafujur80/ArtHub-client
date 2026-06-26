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
    const token = await getJwtToken();
    const response = await fetch(`${baseUrl}${api}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export const serverDelete = async (api, id) =>{
    const token = await getJwtToken();
 const res = await fetch(`${baseUrl}${api}${id}`,{
    method: "DELETE",
    headers: {authorization: `Bearer ${token}`}
 })
 return await res.json();
}
