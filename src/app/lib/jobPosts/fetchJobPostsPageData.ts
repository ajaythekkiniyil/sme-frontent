const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchJobPostsPageData() {
    const res = await fetch(`${STRAPI_URL}/api/job-post`);
    if (!res.ok) throw new Error("Failed to fetch job-post");
    return res.json();
}