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
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const steps = ['View details', 'Schedule interview', 'Approve/Reject', 'Create SME account'];

export default function SmeDetails({ params }: { params: Promise<{ id: number }> }) {
  const { id } = React.use(params)
  const { data, isLoading, error } = useSmeDetails(id);
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [applicationPending, setApplicationPending] = useState(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    router.push('/admin/dashboard/home');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  if (error) return <div className="p-6 text-red-500">Failed to load SME details</div>;

  return <>
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button className="flex items-center text-slate-500 hover:text-slate-800 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <Link href={'/admin/dashboard/home/sme'}><span className="text-sm font-medium">Back to Dashboard</span></Link>
        </button>
      </div>
    </nav>
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
  </>
}