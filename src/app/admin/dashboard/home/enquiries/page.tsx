"use client"

import { useGetEnquiries } from "@/app/hooks/getEnquiries"

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export default function AdminHomePage() {
    const { enquiries } = useGetEnquiries()

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Enquiries List</h1>
            {
                enquiries.length === 0
                    ?
                    (
                        <p>No enquiries found.</p>
                    )
                    :
                    (
                        enquiries.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow rounded p-4 mb-4 border border-gray-200"
                            >
                                <p className="font-semibold">Name: {item.firstName} {item.lastName}</p>
                                <p>Email: {item.businessEmail}</p>
                                <p>Company: {item.company}</p>
                                <p>Number: {item.businessNumber}</p>
                                <p>Location: {item.location}</p>
                                <p>Field: {item.field}</p>
                                <p>Enquiry: {item.enquiry}</p>
                                <p>Attachment:
                                    <a href={STRAPI_URL + '' + item.attachment?.url} target="_blank">
                                        {item.attachment?.name}
                                    </a>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Submitted on: {new Date(item.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
        </div>
    )
}