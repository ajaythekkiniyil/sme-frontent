import { useEffect, useState } from "react"

type Enquiry = {
    id: number;
    documentId: string;
    firstName: string;
    lastName: string | null;
    company: string | null;
    businessNumber: string | null;
    businessEmail: string | null;
    location: string | null;
    field: string | null;
    enquiry: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    attachment: {
        url: string;
        name: string;
        mime: string;
    } | null;
};

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