const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchContactUsPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/contact-us-page`);
    if (!res.ok) throw new Error("Failed to fetch contact-us-page");
    return res.json();
}