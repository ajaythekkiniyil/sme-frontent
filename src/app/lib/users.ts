export async function fetchUsers() {
    // call api routes GET method with token
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

export async function fetchUserDetails(id: number) {
    // call api routes GET method with token
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch users details");
    return res.json();
}