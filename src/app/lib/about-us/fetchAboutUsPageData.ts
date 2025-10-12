const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchAboutUsPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/about-us-page`);
    if (!res.ok) throw new Error("Failed to fetch about-us-page");
    return res.json();
}