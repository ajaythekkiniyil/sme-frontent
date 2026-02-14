"use client";
import Image from "next/image";
import JoinNetwork from "../../../public/join-network.jpg";
import CrTeam07 from "../../../public/cr-team-04.jpg";
import CommonHeader from "../components/commonHeader";
import { defaultCareersHeaderData } from "../lib/careers/defaultCareersHeaderData";
import { useCareerSectionContent } from "../hooks/useCareerSectionContent";
import { defaultMainContent } from "../lib/careers/defaultMainContent";
import JoinNowSection from "../components/JoinNowSection";
import { getStrapiMedia } from "../components/homePage/heroSection";

export default function SMEs() {
  const { data: careerSectionData, isError } = useCareerSectionContent();

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = careerSectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const careersHeader = getSectionData("Header", defaultCareersHeaderData);
  const mainContent = getSectionData("Main_content", defaultMainContent);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={careersHeader} />

      {/* image text alternative 1 */}
      <section className="py-30 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-10 items-center">
            <div>
              <Image
                src={getStrapiMedia(mainContent[0]?.image?.url) || JoinNetwork}
                alt=""
                width={800}
                height={400}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div>
              <h3 className="text-3xl text-[#273677] mb-6 md:leading-12 leading-10 sm:leading-10 font-regular">{mainContent[0].title}</h3>
              {
                mainContent[0]?.description?.map((para: any, index: number) => (
                  <p key={index} className="text-xl mb-5 leading-9">{para.children[0].text}</p>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Join now */}
      <JoinNowSection />

      {/* image text alternative 2 */}
      <section className="py-30 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-10 items-center">
            <div>
              <Image
                src={getStrapiMedia(mainContent[1]?.image?.url) || CrTeam07}
                alt=""
                width={800}
                height={400}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div>
              <h3 className="text-3xl text-[#273677] mb-6 md:leading-12 leading-10 sm:leading-10 font-regular">{mainContent[1].title}</h3>
              {
                mainContent[1]?.description?.map((para: any, index: number) => (
                  <p key={index} className="text-xl mb-5 leading-9">{para.children[0].text}</p>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
