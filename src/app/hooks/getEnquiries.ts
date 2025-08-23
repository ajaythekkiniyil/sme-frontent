import { useEffect, useState } from "react"
import { Enquiry } from "../types/enquiry";

export const useGetEnquiries = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([])

    useEffect(() => {
        const getEnquiry = async () => {
            try {
                const res = await fetch('/api/enquiries', {
                    method: 'GET',
                });

                if (res.ok) {
                    const data = await res.json();
                    setEnquiries(data.data);
                } else {
                    console.error('Failed to fetch enquiries');
                }
            } catch (err) {
                console.error('An unexpected error occurred.', err);
            }
        };

        getEnquiry();
    }, []);

    return { enquiries }
}