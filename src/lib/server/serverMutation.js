'use server'

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const serverMutation = async (api, data, method = "POST") => {
    const response = await fetch(`${baseUrl}${api}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export const serverDelete = async (api, id) =>{
 const res = await fetch(`${baseUrl}${api}${id}`,{
    method: "DELETE",
 })
 return await res.json();
}