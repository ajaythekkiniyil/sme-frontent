"use client"
import { useGetTickets } from "@/app/hooks/getEnquiries"
import { Tickets } from "@/app/types/enquiry"

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export default function AdminHomePage() {
    const { tickets } = useGetTickets()

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Tickets</h1>
            {
                tickets.length === 0
                    ?
                    (
                        <p>No tickets found.</p>
                    )
                    :
                    (
                        tickets.map((item : Tickets) => (
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
                                {
                                    item?.attachments && <div>Attachment:
                                        {
                                            item.attachments.map((image) => {
                                                return (
                                                    <div key={image.documentId}>
                                                        <a href={STRAPI_URL + '' + image.url} target="_blank">
                                                            {image.name}
                                                        </a>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                <p className="text-sm text-gray-500">
                                    Submitted on: {new Date(item.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
        </div>
    )
}