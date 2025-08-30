import { useQuery } from "@tanstack/react-query";
import { fetchTicketDetails, fetchTickets } from "../lib/tickets";

export function useGetTickets() {
    return useQuery({
        queryKey: ["tickets"],
        queryFn: fetchTickets,
    });
}

export function useTicketDetails(id: number) {
    return useQuery({
        queryKey: ["tickets", id],
        queryFn: () => fetchTicketDetails(id),
        enabled: !!id,
    });
}
