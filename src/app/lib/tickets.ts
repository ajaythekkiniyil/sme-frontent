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