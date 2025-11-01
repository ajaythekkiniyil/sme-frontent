const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchPrivacyPolicyPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/privacy-policy`);
    if (!res.ok) throw new Error("Failed to fetch privacy-policy");
    return res.json();
}