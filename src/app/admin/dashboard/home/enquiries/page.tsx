"use client"

import { useGetEnquiries } from "@/app/hooks/getEnquiries"

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
                                <p className="font-semibold">Name: {item.firstName}</p>
                                <p>Email: {item.businessEmail}</p>
                                <p>Enquiry: {item.enquiry}</p>
                                <p className="text-sm text-gray-500">
                                    Submitted on: {new Date(item.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
        </div>
    )
}