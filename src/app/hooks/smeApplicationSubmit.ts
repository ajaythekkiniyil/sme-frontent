import { useState } from "react"
import { uploadFiles } from "../lib/uploadFiles"

export const useSmeApplicationSubmit = () => {
    const [resume, setResume] = useState<(File | Blob)[] | null>(null)
    const [coverLetter, setCoverLetter] = useState<(File | Blob)[] | null>(null)
    const [message, setMessage] = useState({ message: '', status: '' })
    const [loading, setLoading] = useState(false)
    const [smeApplication, setSmeApplication] = useState({
        jobName: "",
        firstName: "",
        lastName: "",
        businessEmail: "",
        businessNumber: "",
        location: "",
        school: "",
        degree: "",
        discipline: "",
        endDate: "",
        legalFirstName: "",
        legalLastName: "",
        preferredFirstName: "",
        linkedinProfile: "",
        website: "",
        whereDidYouFindOutAboutThisRole: "",
        previousEmployee: "",
        nonDisclosureAgreement: "",
        relationStatus: "",
        relationName: "",
    })

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setResume(Array.from(e.target.files))
        }
    }

    const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCoverLetter(Array.from(e.target.files))
        }
    }

    const handleSubmitEnquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        try {
            let resumeId: number[] | null = null;
            let coverLetterId: number[] | null = null;

            if (resume) {
                resumeId = await uploadFiles(resume)
            }

            if (coverLetter) {
                coverLetterId = await uploadFiles(coverLetter)
            }

            const smeApplicationPayload = {
                data: {
                    ...smeApplication,
                    resume: resumeId, // resume is the name used in strapi
                    coverLetter: coverLetterId, // coverLetter is the name used in strapi
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
                const { error } = await res.json()
                if (error.details.errors[0].message === "This attribute must be unique") {
                    setMessage({
                        message:
                            "It looks like an application has already been submitted with these contact details. If you need help, please contact the administrator.",
                        status: "error",
                    });

                }
                else {
                    setMessage({ message: 'Something went wrong while submitting your Application.', status: "error" })
                }
                return setLoading(false)
            }

            setMessage({ message: 'Application submitted successfully!', status: "success" })
            setLoading(false)
            setSmeApplication({
                jobName: "",
                firstName: "",
                lastName: "",
                businessEmail: "",
                businessNumber: "",
                location: "",
                school: "",
                degree: "",
                discipline: "",
                endDate: "",
                legalFirstName: "",
                legalLastName: "",
                preferredFirstName: "",
                linkedinProfile: "",
                website: "",
                whereDidYouFindOutAboutThisRole: "",
                previousEmployee: "",
                nonDisclosureAgreement: "",
                relationStatus: "",
                relationName: "",
            })
            setResume(null)
            setCoverLetter(null)
        }
        catch (err) {
            setMessage({ message: 'Something went wrong while submitting your Application. Please try again later', status: "error" })
            setLoading(false)
        }
    };
    return { smeApplication, setSmeApplication, message, loading, resume, handleResumeChange, handleCoverLetterChange, handleSubmitEnquiry }
}