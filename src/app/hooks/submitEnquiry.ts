import { useState } from "react"
import { uploadFiles } from "../lib/uploadFiles"

export type Enquiry = {
    firstName: string,
    lastName: string,
    company: string,
    businessNumber: string,
    businessEmail: string,
    location: string,
    field: string,
    enquiry: string
}

export const useSubmitEnquiry = () => {
    const [attachments, setAttachments] = useState<(File | Blob)[] | null>(null)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [enquiry, setEnquiry] = useState<Enquiry>({
        firstName: "",
        lastName: "",
        company: "",
        businessNumber: "",
        businessEmail: "",
        location: "",
        field: "",
        enquiry: ""
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments(Array.from(e.target.files))
        }
    }

    const handleSubmitEnquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        try {
            let imageIds: number[] | null = null;

            if (attachments) {
                imageIds = await uploadFiles(attachments)
            }

            const enquiryPayload = {
                data: {
                    ...enquiry,
                    attachments: imageIds, // attachments is the name used in strapi
                }
            };

            // publlic can apply new application, no authentication required
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/basic-enquiries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(enquiryPayload),
            });

            if (!res.ok) {
                setMessage('Something went wrong while submitting your enquiry.')
            }

            setMessage('Enquiry submitted successfully!')
            setLoading(false)
            setEnquiry({
                firstName: "",
                lastName: "",
                company: "",
                businessNumber: "",
                businessEmail: "",
                location: "",
                field: "",
                enquiry: ""
            })
        }
        catch (err) {
            setMessage('Something went wrong while submitting your enquiry.')
        }
    };

    return { enquiry, setEnquiry, message, loading, attachments, handleFileChange, handleSubmitEnquiry }

}