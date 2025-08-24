import { getStepContentSMEType, smeStatusType } from '@/app/types/sme';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateSmeStatus } from '@/app/lib/sme';
import { Button } from '@mui/material';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export function GetStepContentSME({ stepIndex, data, handleNext }: { stepIndex: number, data: getStepContentSMEType, handleNext: Function }) {
    const queryClient = useQueryClient();

    const mutationSmeStatus = useMutation({
        mutationFn: ({ status, id }: { status: smeStatusType; id: number }) =>
            updateSmeStatus(status, id),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["smeDetails", variables.id] });
            alert('success')
            handleNext()
        },
        onError: () => {
            alert('error')
        }
    });

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
                        onClick={() => mutationSmeStatus.mutate({ status: smeStatusType.rejected, id: data.documentId })}
                    >
                        Reject
                    </Button>
                    <Button
                        onClick={() => mutationSmeStatus.mutate({ status: smeStatusType.active, id: data.documentId })}
                    >
                        Approve
                    </Button>
                </>
            )
        case 3:
            return (
                <>
                    <Button
                        // onClick={createSmeAccount}
                    >
                        Create account
                    </Button>
                </>
            )
        default:
            return 'Unknown step';
    }
}