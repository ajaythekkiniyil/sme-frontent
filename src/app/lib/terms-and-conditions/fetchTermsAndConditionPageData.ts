const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchTermsAndConditionPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/terms-and-condition`);
    if (!res.ok) throw new Error("Failed to fetch terms-and-condition");
    return res.json();
}