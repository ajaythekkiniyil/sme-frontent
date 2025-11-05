"use client";
import React, { JSX } from "react";
import CommonHeader from "../components/commonHeader";
import { useTermsAndConditionSectionContent } from "../lib/terms-and-conditions/useTermsAndConditionsContent";
import { defaultTermsAndConditionHeaderData, defaultTermsAndConditionPageData } from "../lib/terms-and-conditions/defaultTermsandConditionHeaderData";
import RichTextBlock from "../components/RichTextBlock";


export default function SMEs() {
  const { data: termsAndConditionSectionData, isError } = useTermsAndConditionSectionContent();

  // Helper: fallback if backend is down or missing data
  const getSectionData = (key: string, defaultData: any) => {
    const section = termsAndConditionSectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const termsAndConditionHeader = getSectionData("Header", defaultTermsAndConditionHeaderData);
  const mainContent = getSectionData("Main_content", defaultTermsAndConditionPageData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={termsAndConditionHeader} />

      {/* Dynamic Content Section */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-gray-800">            
            {/* Main content */}
            <RichTextBlock mainContent={mainContent} />
          </div>
        </div>
      </section>
    </>
  );
}
