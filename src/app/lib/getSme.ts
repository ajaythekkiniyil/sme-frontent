export async function fetchSMEs() {
    // call api routes GET method with token
    const res = await fetch('/api/sme-applications');
    if (!res.ok) throw new Error("Failed to fetch SMEs");
    return res.json();
}