const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// server fetch
export const serverFetch = async (api) => {
    const response = await fetch(`${baseUrl}${api}`);
    return await response.json();
}