export async function fetchTickets() {
    // call api routes GET method with token
    const res = await fetch('/api/tickets');
    if (!res.ok) throw new Error("Failed to fetch tickets");
    return res.json();
}

export async function fetchTicketDetails(id: number) {
    // call api routes GET method with token
    const res = await fetch(`/api/tickets/${id}`);
    if (!res.ok) throw new Error("Failed to fetch SMEs details");
    return res.json();
}

export const updateTicketStatus = async (id: number, status: boolean, assignedSmeName: string | null, paymentStatus: string | null) => {
    let payload;

    if (assignedSmeName !== null) {
        payload = JSON.stringify({
            "data": {
                "assignedSME": assignedSmeName
            }
        })
    }
    else if (paymentStatus === 'paid') {
        payload = JSON.stringify({
            "data": {
                "paymentStatus": paymentStatus
            }
        })
    }
    else {
        payload = JSON.stringify({
            "data": {
                "verifiedStatus": status
            }
        })
    }

    const res = await fetch(`/api/tickets/${id}`, {
        method: "PUT",
        body: payload,
    });

    if (!res.ok) {
        throw new Error("Failed to update ticket status");
    }

    return res.json();
};