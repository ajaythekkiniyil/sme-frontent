"use client";
import { JSX } from "react";
import { useComplainsSectionContent } from "../lib/complains-page/useComplainsSectionContent";
import CommonHeader from "../components/commonHeader";
import { defaultComplainsHeaderData } from "../lib/complains-page/defaultComplainsHeaderData";
import { defaultComplainsPageData } from "../lib/complains-page/defaultComplainsPageData";
import RichTextBlock from "../components/RichTextBlock";

export default function SMEs() {
  const { data: complainsSectionData, isError } = useComplainsSectionContent();

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = complainsSectionData?.data?.[key];
    
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const complainsHeader = getSectionData("Header", defaultComplainsHeaderData);
  const mainContent = getSectionData("Main_content", defaultComplainsPageData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={complainsHeader} />

      {/* Compliance Framework */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <RichTextBlock mainContent={mainContent}/>
        </div>
      </section>
    </>
  );
}
