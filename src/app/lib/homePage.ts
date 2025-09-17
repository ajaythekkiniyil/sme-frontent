const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchHomePageData() {    
    const res = await fetch(`${STRAPI_URL}/api/home-page`);
    if (!res.ok) throw new Error("Failed to fetch SMEs");
    return res.json();
}