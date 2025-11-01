
"use client"
import { usePathname } from 'next/navigation'
import CommonHeader from "@/app/components/commonHeader";
import { useJobPostsPageContent } from "@/app/hooks/useJobPostsSectionContent";
import { defaultJobPostHeaderData } from '@/app/lib/jobPosts/defaultJobPostHeaderData';
import { jobData } from '@/app/lib/tempJobData';
import JobApplyNowForm from '@/app/components/jobs/jobApplyNowForm';

export default function JobDetails() {
  // take index from url and get perticular job details
  const pathname = usePathname()
  const index: any = pathname?.split('/')?.pop()

  const { data: jobPostsPage, isError } = useJobPostsPageContent();

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = jobPostsPage?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const jobPostHeader = getSectionData("Header", defaultJobPostHeaderData);
  const jobsData = getSectionData("Job_post", jobData);
  const seletedJob = jobsData?.find((item: any) => (item.id).toString() === index);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={jobPostHeader} />

      <section className="bg-[#F6FAFF] py-16">
        <div className="container mx-auto px-6">
          {/* Job Detail */}
          <div className="border border-[#dedede] rounded-2xl p-15 mb-12">
            <h1 className="text-3xl font-semibold text-[#273677] mb-8">{seletedJob?.job_title}</h1>
            <h2 className="text-xl font-regular text-[#273677] mb-5">{seletedJob?.sub_title}</h2>
            <div className="mb-6">
              <p className="text-[#32A2DC] text-xl mb-2">Description:</p>
              <p className="text-lg text-black">{seletedJob?.description[0].children[0].text}</p>
            </div>

            <div className="mb-6">
              <p className="text-[#32A2DC] text-xl mb-2">Location:</p>
              <p className="text-lg text-black">{seletedJob?.location}</p>
            </div>
          </div>

          {/* Job Apply Now form */}
          <JobApplyNowForm />
        </div>
      </section>
    </>
  );
}







































