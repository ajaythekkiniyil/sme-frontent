import { useQuery } from "@tanstack/react-query";
import { fetchTicketDetails, fetchTickets } from "../lib/tickets";
import { uploadFiles } from "../lib/uploadFiles"
import { useEffect, useState } from "react";

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

export const useTicketCreation = () => {
    const [status, setStatus] = useState(false)
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleTicketCreation = async (details: any) => {
        setLoading(true)
        try {
            let attachmentsId: number[] | null = null;

            if (details.attachments.length > 0) {
                attachmentsId = await uploadFiles(details.attachments)
            }

            const ticketCreationPayload = {
                data: {
                    ...details,
                    email,
                    attachments: attachmentsId, // attachments is the name used in strapi
                }
            };

            const res = await fetch(`/api/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketCreationPayload),
            });

            if (!res.ok) {
                setStatus(false)
            }
            setStatus(true)
            setLoading(false)
        }
        catch (err) {
            setStatus(false)
            setLoading(false)
        }
    };

    return { status, handleTicketCreation, loading }
}
