"use client"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useSmeDetails } from '@/app/hooks/getSme';
import { GetStepContentSME } from '@/app/components/getStepContentSME';

const steps = ['View details', 'Schedule interview', 'Approve/Reject', 'Create SME account'];

export default function SmeDetails({ params }: { params: Promise<{ id: number }> }) {
    const { id } = React.use(params)
    const { data, isLoading, error } = useSmeDetails(id);

    const [activeStep, setActiveStep] = useState(0);
    const [applicationPending, setApplicationPending] = useState(true);

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
                                    <GetStepContentSME
                                        stepIndex={activeStep}
                                        data={data.data}
                                        handleNext={handleNext}
                                        applicationPending={applicationPending}
                                        setApplicationPending={setApplicationPending}
                                    />
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