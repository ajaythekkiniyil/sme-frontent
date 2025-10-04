const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchSmePageData() {    
    const res = await fetch(`${STRAPI_URL}/api/sme-page`);
    if (!res.ok) throw new Error("Failed to fetch sme-page");
    return res.json();
}