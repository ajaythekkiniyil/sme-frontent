"use client"
import React from 'react';
import { useTicketDetails } from '@/app/hooks/tickets';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export default function TicketDetails({ params }: { params: Promise<{ id: number }> }) {
    const { id } = React.use(params)
    const { data: ticket, isLoading, error } = useTicketDetails(id);

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Failed to load Tickets details</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Ticket details</h1>
            <div
                key={ticket.data.id}
                className="bg-white shadow rounded p-4 mb-4 border border-gray-200"
            >
                <p className="font-semibold">Name: {ticket.data.firstName} {ticket.data.lastName}</p>
                <p>Admin Verified: {ticket.data.adminVerified ? 'Verified' : 'Not Verified'}</p>
                <p>Email: {ticket.data.businessEmail}</p>
                <p>Company: {ticket.data.company}</p>
                <p>Number: {ticket.data.businessNumber}</p>
                <p>Location: {ticket.data.location}</p>
                <p>Field: {ticket.data.field}</p>
                <p>Enquiry: {ticket.data.enquiry}</p>
                {
                    ticket.data?.attachments && <div>Attachment:
                        {
                            ticket.data.attachments.map((image: any) => {
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
                    Submitted on: {new Date(ticket.data.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    )
}