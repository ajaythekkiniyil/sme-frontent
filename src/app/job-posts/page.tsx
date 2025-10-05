"use client"
import Image from "next/image";
import Link from "next/link";
import CrTeam03 from "../../../public/cr-team-01.jpg";
import CrTeam04 from "../../../public/cr-team-07.jpg";
import CrTeam05 from "../../../public/cr-team-03.jpg";
import CrTeam06 from "../../../public/cr-team-05.jpg";
import CrTeam01 from "../../../public/cr-team-06.jpg";
import CrTeam02 from "../../../public/cr-team-02.jpg";
import { jobData } from "../lib/tempJobData";
import JobCard from "../components/jobCard";
import CommonHeader from "../components/commonHeader";
import { defaultJobPostHeaderData } from "../lib/jobPosts/defaultJobPostHeaderData";
import { useJobPostsPageContent } from "../hooks/useJobPostsSectionContent";
import JoinNowSection from "../components/JoinNowSection";

export default function SMEs() {
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
  // setting jobs to tanstack query for later usage
  

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={jobPostHeader} />

      {/* Jobs */}
      <section className="bg-[#F6FAFF] py-16 sm:py-24 md:py-32" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-15">
            {
              jobsData?.map((job: any, index: number) => (
                <JobCard key={index} job={job} />
              ))
            }
          </div>
        </div>
      </section>

      {/* Join now */}
      <JoinNowSection />
    </>
  );
}
