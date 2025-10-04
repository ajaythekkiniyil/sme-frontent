const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchCareerPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/careers-page`);
    if (!res.ok) throw new Error("Failed to fetch careers-page");
    return res.json();
}