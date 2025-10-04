const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchExpertPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/expert-section`);
    if (!res.ok) throw new Error("Failed to fetch expert-section");
    return res.json();
}