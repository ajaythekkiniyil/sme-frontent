const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchFaqPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/faq`);
    if (!res.ok) throw new Error("Failed to fetch faq");
    return res.json();
}