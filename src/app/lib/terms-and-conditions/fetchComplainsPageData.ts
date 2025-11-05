const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchComplainsPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/complains-page`);
    if (!res.ok) throw new Error("Failed to fetch complains-page");
    return res.json();
}