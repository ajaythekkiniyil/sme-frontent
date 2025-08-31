"use client"
import React, { useState } from 'react';
import { useTicketDetails } from '@/app/hooks/tickets';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export default function TicketDetails({ params }: { params: Promise<{ id: number }> }) {
    const { id } = React.use(params)
    const { data: ticket, isLoading } = useTicketDetails(id);

    // State management for verification, payment, and account creation status
    const [isVerified, setIsVerified] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);

    // Event handlers to update state
    const handleVerify = () => setIsVerified(true);
    const handlePayment = () => setIsPaid(true);
    const handleCreateUser = () => setIsAccountCreated(true);

    // Helper component for SVG Icons to keep the main component clean
    const Icon = ({ type }: any) => {
        if (type.includes('image')) {
            return (
                <svg className="w-6 h-6 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            );
        }
        if (type.includes('application/pdf')) {
            return (
                <svg className="w-6 h-6 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            );
        }
        return null;
    };

    const componentStyles = `
    .status-badge {
        display: inline-flex;
        align-items: center;
        padding: 0.25em 0.75em;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 9999px;
    }
    .status-pending {
        background-color: #FEF3C7; /* yellow-100 */
        color: #92400E; /* yellow-800 */
    }
    .status-verified {
        background-color: #D1FAE5; /* green-100 */
        color: #065F46; /* green-800 */
    }
    .status-not-verified {
        background-color: #FEE2E2; /* red-100 */
        color: #991B1B; /* red-800 */
    }
    .fade-in {
        animation: fadeIn 0.5s ease-in-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <>
            <style>{componentStyles}</style>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 fade-in">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{ticket.data.firstName} {ticket.data.lastName}</h1>
                            <p className="text-gray-500 text-sm mt-1">Submitted on: {new Date(ticket.data.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 space-y-2">
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-600">Ticket Status:</span>
                                <span className={`status-badge ${ticket.data.adminVerified ? 'status-verified' : 'status-not-verified'}`}>
                                    {ticket.data.adminVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-600">Paymet Status:</span>
                                <span className={`status-badge ${ticket.data.paymentStatus ? 'status-verified' : 'status-not-verified'}`}>
                                    {ticket.data.paymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* User Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                            <p className="text-gray-800 font-semibold">{ticket.data.businessEmail}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                            <p className="text-gray-800 font-semibold">{ticket.data.businessNumber}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Company</h3>
                            <p className="text-gray-800 font-semibold">{ticket.data.company}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Location</h3>
                            <p className="text-gray-800 font-semibold">{ticket.data.location}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Field</h3>
                            <p className="text-gray-800 font-semibold">{ticket.data.field}</p>
                        </div>
                    </div>

                    {/* Enquiry Section */}
                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-gray-500">Enquiry</h3>
                        <p className="text-gray-800 bg-gray-50 p-4 rounded-lg mt-2">{ticket.data.enquiry}</p>
                    </div>

                    {/* Attachments Section */}
                    {
                        ticket.data?.attachments &&
                        <div className="mt-8">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments</h3>
                            <div className="space-y-3">
                                {
                                    ticket.data.attachments.map((image: any) => {
                                        return (
                                            <div key={image.documentId}>
                                                <a href={STRAPI_URL + '' + image.url} target="_blank" className="flex items-center p-3 bg-white border rounded-lg hover:bg-gray-50 transition duration-150">
                                                    <Icon type={image.mime} />
                                                    <span className="text-blue-600 font-medium">{image.name}</span>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* Action Buttons */}
                    <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row-reverse gap-3">
                        <button
                            onClick={handleVerify}
                            disabled={isVerified}
                            className="px-2 py-1 bg-green-600 text-white text-sm rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-150 disabled:bg-green-300 disabled:cursor-not-allowed"
                        >
                            {isVerified ? 'Verified' : 'Mark as Verified'}
                        </button>
                        <button
                            onClick={handleVerify}
                            disabled={isVerified}
                            className="px-2 py-1 bg-orange-300 text-white text-sm rounded-lg shadow-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-150 disabled:bg-green-300 disabled:cursor-not-allowed"
                        >
                            Assign to sme
                        </button>
                        <button
                            onClick={handlePayment}
                            disabled={!isVerified || isPaid}
                            className="px-2 py-1 bg-indigo-600 text-white text-sm rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-150 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                        >
                            {isPaid ? 'Paid' : 'Mark as Paid'}
                        </button>
                        <button
                            onClick={handleCreateUser}
                            disabled={!isVerified || !isPaid || isAccountCreated}
                            className="px-2 py-1 bg-gray-600 text-white text-sm rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isAccountCreated ? 'Account Created' : 'Create User Account'}
                        </button>
                    </div>

                    {/* Success Message: Conditionally rendered */}
                    {isAccountCreated && (
                        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-medium fade-in">
                            User account created successfully!
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}