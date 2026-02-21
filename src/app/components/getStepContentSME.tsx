"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { smeStatusType } from '@/app/types/sme';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createSmeAccount, updateSmeStatus, sendInterviewInvite, sendWelcomeEmail } from '@/app/lib/sme';
import { CheckCircle, XCircle, FileText, Download, Plus, Link as LinkIcon, Clock, Calendar } from 'lucide-react';
import { useToast } from './ui/toast';
import { getStrapiMedia } from "./homePage/heroSection";

// --- Reusable Button Component, InfoBlock, getStatusStyle (UNMODIFIED) ---
const StyledButton = ({ onClick, children, className, color, disabled, startIcon }: any) => {
    const baseStyle = "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed";

    let colorStyle = "";
    if (color === 'primary') {
        colorStyle = "bg-blue-600 text-white hover:bg-blue-700";
    } else if (color === 'danger') {
        colorStyle = "bg-red-600 text-white hover:bg-red-700";
    } else {
        colorStyle = "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
    }

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${colorStyle} ${className}`}
            disabled={disabled}
        >
            {startIcon}
            <span>{children}</span>
        </button>
    );
};

const InfoBlock = ({ title, value }: { title: string, value: string | undefined | null }) => (
    <div className="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-sm font-medium text-gray-800 break-words mt-1">{value || 'N/A'}</p>
    </div>
);

const getStatusStyle = (status: smeStatusType) => {
    switch (status) {
        case 'active':
            return 'text-green-700 bg-green-100 border border-green-200';
        case 'pending':
            return 'text-blue-700 bg-blue-100 border border-blue-200';
        case 'rejected':
            return 'text-red-700 bg-red-100 border border-red-200';
        case 'inactive':
            return 'text-gray-700 bg-gray-100 border border-gray-200';
        default:
            return 'text-gray-600 bg-gray-50';
    }
};


// --- Main Step Content Component ---

export function GetStepContentSME({ stepIndex, data, handleNext, applicationPending, setApplicationPending }: any) {    
    const queryClient = useQueryClient();
    const router = useRouter();
    const { showToast } = useToast();

    // NEW STATE for Interview Scheduling
    const [interviewDetails, setInterviewDetails] = useState({
        date: '',
        time: '',
        duration: '60 minutes',
        meetingLink: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInterviewDetails({
            ...interviewDetails,
            [e.target.name]: e.target.value,
        });
    };
    
    // NEW MUTATION for Scheduling
    const mutationSendInvite = useMutation({
        mutationFn: (details: typeof interviewDetails) =>
            sendInterviewInvite({
                smeId: data.documentId,
                smeName: data.firstName,
                smeEmail: data.businessEmail,
                ...details
            }),
        onSuccess: () => {
            showToast("Interview invitation successfully sent! Moving to the next step.", "success")
            // Auto-advance to the next step (Approve/Reject)
            handleNext();
        },
        onError: () => {
            showToast("An error occurred while sending the interview invite. Please try again later", "error")
        }
    });

    const handleSchedule = () => {
        if (!interviewDetails.date || !interviewDetails.time || !interviewDetails.meetingLink) {
            showToast("Please fill out the Date, Time, and Meeting Link fields.", "info")
            return;
        }
        mutationSendInvite.mutate(interviewDetails);
    };


    const mutationSmeStatus = useMutation({
        mutationFn: ({ status, id }: { status: smeStatusType; id: number }) =>
            updateSmeStatus(status, id),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["smeDetails", variables.id] });

            if (variables.status === smeStatusType.rejected) {
                showToast("Application rejected", "error")
                setApplicationPending(true);

                // Navigate to the SME dashboard after rejection
                router.push('/admin/dashboard/home/sme');

            } else if (variables.status === smeStatusType.active) {
                showToast("Application approved", "success")
                setApplicationPending(false);
                // Note: handleNext is called here for auto-advance upon approval
                handleNext();
            }
        },
        onError: () => {
            showToast("An error occurred while updating the status. Please try again later.", "error")
        }
    });

    const mutationCreateAccount = useMutation({
        mutationFn: ({ firstName, email, id }: { firstName: string; email: string, id: string }) =>
            createSmeAccount({ firstName, email, id }),

        onSuccess: (res) => {
            if (res.status === false) {
                showToast("An error occurred while creating account. Please try again later.", "error")
            } else {
                showToast("Account created successfully.", "success")
                sendWelcomeEmail({ firstName: data.firstName, email: data.businessEmail, id: data.documentId }).then((data) => {
                    handleNext();
                });
            }
        },
        onError: (error) => {
            showToast(error.message, "error")
        }
    });

    const handleCreate = () => {
        if (data?.firstName && data?.businessEmail) {
            mutationCreateAccount.mutate({ firstName: data.firstName, email: data.businessEmail, id: data.documentId });
        } else {
            showToast("Missing required data (Full Name or Email) to create the account.", "info")
        }
    };

    const contentContainerStyle = "max-w-4xl mx-auto p-6 lg:p-10 bg-white shadow-xl rounded-xl font-sans border border-gray-200";

    switch (stepIndex) {
        case 0:
            return (
                <div className={contentContainerStyle}>
                    <div className="flex justify-between items-start border-b pb-4 mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">{data?.fullName || "Applicant Details"}</h1>
                        <span className={`px-4 py-1 rounded-full text-sm font-bold capitalize ${getStatusStyle(data?.smeStatus)}`}>
                            {data?.smeStatus || 'Unknown Status'}
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold text-blue-700 mb-4 border-b pb-2">Application Overview</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <InfoBlock title="Applied Position" value={data?.jobName} />
                        <InfoBlock title="Business Email" value={data?.businessEmail} />
                        <InfoBlock title="Business Number" value={data?.businessNumber} />
                        <InfoBlock title="Location" value={data?.location} />
                        <InfoBlock title="School" value={data?.school} />
                        <InfoBlock title="Degree" value={data?.degree} />
                    </div>

                    <h2 className="text-2xl font-semibold text-blue-700 mb-4 border-b pb-2">Personal & Legal Info</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InfoBlock title="Legal First Name" value={data?.legalFirstName} />
                        <InfoBlock title="Legal Last Name" value={data?.legalLastName} />
                        <InfoBlock title="Preferred Name" value={data?.preferredFirstName} />
                        <InfoBlock title="Relation Status" value={data?.relationStatus} />
                        <InfoBlock title="Previous Employee" value={data?.previousEmployee ? 'Yes' : 'No'} />
                        <InfoBlock title="NDA Signed" value={data?.nonDisclosureAgreement ? 'Yes' : 'No'} />
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">External Links & Documents</h2>
                        <div className="flex flex-wrap gap-4 items-center">
                            {data?.linkedinProfile && (
                                <a
                                    href={data?.linkedinProfile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.574-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    LinkedIn Profile
                                </a>
                            )}
                            {data?.website && <a href={data?.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">Website</a>}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">
                            {data?.resume?.url && (
                                <a
                                    href={getStrapiMedia(data?.resume?.url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={data?.resume.name || 'resume.pdf'}
                                    className="flex items-center gap-2 bg-slate-800 text-white font-bold py-2 px-4 rounded hover:bg-slate-700 transition-colors text-sm"
                                >
                                    <Download size={16} />
                                    Download Resume
                                </a>
                            )}
                            {data?.coverLetter?.url && (
                                <a
                                    href={getStrapiMedia(data?.coverLetter?.url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={data?.coverLetter?.name || 'cover_letter.pdf'}
                                    className="flex items-center gap-2 bg-slate-800 text-white font-bold py-2 px-4 rounded hover:bg-slate-700 transition-colors text-sm"
                                >
                                    <Download size={16} />
                                    Download Cover Letter
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className={contentContainerStyle}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
                        Schedule Interview with <span className="text-blue-700">{data?.fullName}</span>
                    </h2>
                    
                    <p className="text-gray-600 mb-6">Select a date, time, and provide a meeting link to send the official interview invitation to the applicant.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Date Input */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar size={16} className="text-blue-600"/> Interview Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={interviewDetails.date}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Time Input */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Clock size={16} className="text-blue-600"/> Interview Time (Local) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={interviewDetails.time}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                         {/* Duration Select */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="duration" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                Duration
                            </label>
                             <select
                                id="duration"
                                name="duration"
                                value={interviewDetails.duration}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="30 minutes">30 minutes</option>
                                <option value="45 minutes">45 minutes</option>
                                <option value="60 minutes">60 minutes</option>
                                <option value="90 minutes">90 minutes</option>
                            </select>
                        </div>

                        {/* Meeting Link Input */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="meetingLink" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <LinkIcon size={16} className="text-blue-600"/> Meeting Link (URL) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                id="meetingLink"
                                name="meetingLink"
                                value={interviewDetails.meetingLink}
                                onChange={handleInputChange}
                                placeholder="e.g., https://zoom.us/j/12345"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600">
                             Invitation will be sent to: <span className="font-semibold text-gray-800">{data?.businessEmail}</span>
                        </div>
                        <StyledButton
                            onClick={handleSchedule}
                            color='primary'
                            disabled={mutationSendInvite.isPending}
                            startIcon={<CheckCircle size={20} />}
                        >
                            {mutationSendInvite.isPending ? 'Sending Invite...' : 'Send Interview Invitation'}
                        </StyledButton>
                    </div>

                    {mutationSendInvite.isPending && (
                        <p className="mt-4 text-center text-blue-600">Generating and dispatching email invitation...</p>
                    )}

                </div>
            );
        case 2:
            return (
                <div className={`${contentContainerStyle} flex flex-col items-center justify-center p-10`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Review and Status Update</h2>
                    <p className="text-gray-600 mb-8 text-center">Confirm all details before changing the application status to Active or Rejected.</p>

                    <div className="flex gap-6">
                        <StyledButton
                            onClick={() => mutationSmeStatus.mutate({ status: smeStatusType.rejected, id: data.documentId })}
                            color='danger'
                            disabled={mutationSmeStatus.isPending}
                            startIcon={<XCircle size={20} />}
                        >
                            Reject Application
                        </StyledButton>
                        <StyledButton
                            onClick={() => mutationSmeStatus.mutate({ status: smeStatusType.active, id: data.documentId })}
                            color='primary'
                            disabled={mutationSmeStatus.isPending}
                            startIcon={<CheckCircle size={20} />}
                        >
                            Approve Application
                        </StyledButton>
                    </div>
                    {mutationSmeStatus.isPending && <p className="mt-4 text-blue-600">Updating status...</p>}
                </div>
            );
        case 3:
            return (
                <div className={`${contentContainerStyle} flex flex-col items-center justify-center p-10`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Creation</h2>

                    {applicationPending ? (
                        <div className="text-center text-red-600 mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <XCircle size={20} />
                            Please ensure the application is **approved** before creating the account.
                        </div>
                    ) : (
                        <div className="text-center text-green-600 mb-6 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle size={20} />
                            Application Approved. Proceed to account creation.
                        </div>
                    )}

                    <StyledButton
                        onClick={handleCreate}
                        color='primary'
                        disabled={applicationPending || mutationCreateAccount.isPending}
                        startIcon={<Plus size={20} />}
                    >
                        {mutationCreateAccount.isPending ? 'Creating Account...' : 'Create Account Now'}
                    </StyledButton>
                    {mutationCreateAccount.isPending && <p className="mt-4 text-blue-600">This may take a moment...</p>}
                </div>
            );
        default:
            return <div className="p-4 text-center text-gray-500">Unknown step</div>;
    }
}