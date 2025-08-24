import { useState } from "react"
import { uploadFiles } from "../lib/uploadFiles"
import { smeApplication } from "../types/enquiry"

export const useSmeApplicationSubmit = () => {
    const [attachments, setAttachments] = useState<(File | Blob)[] | null>(null)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [smeApplication, setSmeApplication] = useState<smeApplication>({
        fullName: "",
        email: "",
        phone: "",
        linkedinUrl: "",
        experience: "10-15",
        pastCompanies: "",
        expertiseAreas: "",
        languageSpoken: ""
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

            const smeApplicationPayload = {
                data: {
                    ...smeApplication,
                    resume: imageIds, // resume is the name used in strapi
                }
            };

            // publlic can apply new application, no authentication required
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/sme-applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(smeApplicationPayload),
            });

            if (!res.ok) {
                setMessage('Something went wrong while submitting your enquiry.')
            }

            setMessage('Application submitted successfully!')
            setLoading(false)
            setSmeApplication({
                fullName: "",
                email: "",
                phone: "",
                linkedinUrl: "",
                experience: "10-15",
                pastCompanies: "",
                expertiseAreas: "",
                languageSpoken: ""
            })
        }
        catch (err) {
            setMessage('Something went wrong while submitting your enquiry.')
        }
    };

    return { smeApplication, setSmeApplication, message, loading, attachments, handleFileChange, handleSubmitEnquiry }

}