import { smeStatusType } from '@/app/types/sme';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createSmeAccount, updateSmeStatus } from '@/app/lib/sme';
import { Button } from '@mui/material';
import { STRAPI_URL } from './homePage/heroSection';

export function GetStepContentSME({ stepIndex, data, handleNext, applicationPending, setApplicationPending } : any) {
    const queryClient = useQueryClient();

    const mutationSmeStatus = useMutation({
        mutationFn: ({ status, id }: { status: smeStatusType; id: number }) =>
            updateSmeStatus(status, id),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["smeDetails", variables.id] });
            if (variables.status === 'rejected') {
                alert('application rejected')
                setApplicationPending(true)
                return
            }
            alert('application approved')
            setApplicationPending(false)
            handleNext()
        },
        onError: () => {
            alert('error')
        }
    });

    const handleCreate = async () => {
        const res = await createSmeAccount({ fullName: data.fullName, email: data.email })
        if (res.status === false) alert('error')
        else {
            alert('success')
            handleNext()
        }
    }

    switch (stepIndex) {
        case 0:
            return <>
                <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 font-sans">
                    <div className="border-b pb-4 mb-4">
                        <h1 className="text-4xl font-bold text-gray-800">{data?.fullName}</h1>
                        <p className="text-md text-gray-500 capitalize">
                            Status:
                            <span
                                className={data?.smeStatus === 'active' ? 'text-green-900' : data?.smeStatus === 'pending' ? 'text-blue-500' : 'text-red-400'}>
                                {data?.smeStatus}
                            </span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Info</h2>
                            <p><strong>Applied Job position:</strong> {data?.jobName}</p>
                            <p><strong>firstName</strong> {data?.firstName}</p>
                            <p><strong>lastName</strong> {data?.lastName}</p>
                            <p><strong>businessEmail</strong> {data?.businessEmail}</p>
                            <p><strong>businessNumber</strong> {data?.businessNumber}</p>
                            <p><strong>location</strong> {data?.location}</p>
                            <p><strong>school</strong> {data?.school}</p>
                            <p><strong>degree</strong> {data?.degree}</p>
                            <p><strong>discipline</strong> {data?.discipline}</p>
                            <p><strong>endDate</strong> {data?.endDate}</p>
                            <p><strong>legalFirstName</strong> {data?.legalFirstName}</p>
                            <p><strong>legalLastName</strong> {data?.legalLastName}</p>
                            <p><strong>preferredFirstName</strong> {data?.preferredFirstName}</p>
                            <p><strong>website</strong> {data?.website}</p>
                            <p><strong>whereDidYouFindOutAboutThisRole</strong> {data?.whereDidYouFindOutAboutThisRole}</p>
                            <p><strong>previousEmployee</strong> {data?.previousEmployee}</p>
                            <p><strong>nonDisclosureAgreement</strong> {data?.nonDisclosureAgreement}</p>
                            <p><strong>relationStatus</strong> {data?.relationStatus}</p>
                            <p><strong>relationName</strong> {data?.relationName}</p>
                            <p>
                                <strong>LinkedIn:</strong>
                                <a href={data?.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                    LinkedIn profile
                                </a>
                            </p>
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
                    <div className="mt-6 pt-4 border-t">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Cover letter</h2>
                        <a
                            href={`${STRAPI_URL}${data?.coverLetter.url}`}
                            target="_blank"
                            download={data?.coverLetter.name}
                            className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Download {data?.coverLetter.name}
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
                    {applicationPending && <div>Please verify application</div>}
                    <Button
                        onClick={handleCreate}
                        disabled={applicationPending}
                    >
                        Create account
                    </Button>
                </>
            )
        default:
            return 'Unknown step';
    }
}