"use client"
import JobApplyNowForm from "../components/jobs/jobApplyNowForm";
import CommonHeader from "../components/commonHeader";
import { defaultEnrolmentForumHeaderData } from "../lib/enrolment-forum/defaultEnrolmentForumHeaderData";
import { useEnrolmentForumSectionContent } from "../hooks/useEnrolmentForumSectionContent";

export default function EnrollmentForum() {
  const { data: enrolmentForumSectionData, isError } = useEnrolmentForumSectionContent();

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = enrolmentForumSectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const enrolmentHeader = getSectionData("Header", defaultEnrolmentForumHeaderData);  

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={enrolmentHeader} />

      <section className="bg-[#F6FAFF] py-16">
        <div className="container mx-auto px-6">
          <JobApplyNowForm />
        </div>
      </section>
    </>
  );
}
