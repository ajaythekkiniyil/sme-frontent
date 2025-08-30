import { useEffect, useState } from "react"
import { Tickets } from "../types/enquiry";

export const useGetTickets = () => {
    const [tickets, setTickets] = useState<Tickets[]>([])

    useEffect(() => {
        const getTickets = async () => {
            try {
                const res = await fetch('/api/tickets', {
                    method: 'GET',
                });

                if (res.ok) {
                    const data = await res.json();
                    setTickets(data.data);
                } else {
                    console.error('Failed to fetch tickets');
                }
            } catch (err) {
                console.error('An unexpected error occurred.', err);
            }
        };

        getTickets();
    }, []);

    return { tickets }
}