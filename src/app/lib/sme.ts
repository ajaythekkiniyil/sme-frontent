// import { smeStatusType } from "../hooks/updateSmeStatus";

export async function fetchSme() {
    // call api routes GET method with token
    const res = await fetch('/api/sme-applications');
    if (!res.ok) throw new Error("Failed to fetch SMEs");
    return res.json();
}

export async function fetchSmeDetails(id: number) {
    // call api routes GET method with token
    const res = await fetch(`/api/sme-applications/${id}`);
    if (!res.ok) throw new Error("Failed to fetch SMEs");
    return res.json();
}

// export async function updateSmeStatusFunction(status: smeStatusType, id: number) {
//     console.log("Updating SME:", status, id);

//     const res = await fetch(`/api/sme-applications/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//     });

//     if (!res.ok) throw new Error("Failed to update SME status");

//     return res.json();
// }
