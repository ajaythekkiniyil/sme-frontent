const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchEnrolmentForumPageData() {    
    const res = await fetch(`${STRAPI_URL}/api/enrollment-forum`);
    if (!res.ok) throw new Error("Failed to fetch enrollment-forum");
    return res.json();
}