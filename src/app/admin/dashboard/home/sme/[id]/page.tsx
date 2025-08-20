// code refactor required
"use client"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useSmeDetails } from '@/app/hooks/getSme';

type getStepContentSMEType = {
    fullName: string,
    smeStatus: string,
    email: string,
    phone: string,
    linkedinUrl: string,
    experience: string,
    pastCompanies: string,
    expertiseAreas: string,
    languageSpoken: string,
    resume: {
        url: string,
        name: string,
    },
    documentId: number
}

enum smeStatusType {
    rejected = "rejected",
    active = "active",
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const steps = ['View details', 'Schedule interview', 'Approve/Reject'];

export default function SmeDetails({ params }: { params: Promise<{ id: number }> }) {
    const { id } = React.use(params)
    const { data, isLoading, error } = useSmeDetails(id);

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Failed to load SME details</div>;

    return (
        <Box sx={{ width: '100%', padding: '24px' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ marginTop: '32px' }}>
                {
                    activeStep === steps.length
                        ?
                        (
                            // This part shows after the last step is completed
                            <>
                                <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                                    All steps completed - you're finished! 🎉
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </>
                        )
                        :
                        (
                            // This part shows for each active step
                            <>
                                <Box sx={{ minHeight: '120px', padding: '16px', border: '1px dashed grey', borderRadius: '4px' }}>
                                    <div>{getStepContentSME(activeStep, data.data)}</div>
                                </Box>

                                {/* Navigation Buttons */}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>

                                    <Box sx={{ flex: '1 1 auto' }} />

                                    <Button onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
            </Box>
        </Box>
    );
}

function getStepContentSME(stepIndex: number, data: getStepContentSMEType) {
    switch (stepIndex) {
        case 0:
            return <>
                <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 font-sans">
                    <div className="border-b pb-4 mb-4">
                        <h1 className="text-4xl font-bold text-gray-800">{data?.fullName}</h1>
                        <p className="text-md text-gray-500 capitalize">Status: {data?.smeStatus}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Info</h2>
                            <p><strong>Email:</strong> {data?.email}</p>
                            <p><strong>Phone:</strong> {data?.phone}</p>
                            <p>
                                <strong>LinkedIn:</strong>
                                <a href={data?.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                    LinkedIn profile
                                </a>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Professional Details</h2>
                            <p><strong>Experience:</strong> {data?.experience} years</p>
                            <p><strong>Past Companies:</strong> {data?.pastCompanies}</p>
                            <p><strong>Areas of Expertise:</strong> {data?.expertiseAreas}</p>
                            <p><strong>Languages:</strong> {data?.languageSpoken}</p>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Resume</h2>
                        <a
                            href={`${STRAPI_URL}${data?.resume.url}`}
                            target="_blank"
                            download={data?.resume.name}
                            className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Download {data?.resume.name}
                        </a>
                    </div>
                </div>
            </>
        case 1:
            return 'This is where you would place the form to schedule an interview.';
        case 2:
            return (
                <>
                    <Button
                        onClick={() => updateStatus(smeStatusType.rejected, data.documentId)}
                    >
                        Reject
                    </Button>
                    <Button
                        onClick={() => updateStatus(smeStatusType.active, data.documentId)}
                    >
                        Approve
                    </Button>
                </>
            )
        default:
            return 'Unknown step';
    }
}

const updateStatus = async (status: smeStatusType, id: number) => {
    await fetch(`/api/sme-applications/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
    })
    // code refactor
}