"use client";
import React, { JSX } from "react";
import CommonHeader from "../components/commonHeader";
import { defaultPrivacyHeaderData, defaultPrivacyPolicyPageData } from "../lib/privacy-policy/defaultPrivacyHeaderData";
import { usePrivacyPolicySectionContent } from "../lib/privacy-policy/usePrivacyPolicySectionContent";
import RichTextBlock from "../components/RichTextBlock";


export default function SMEs() {
  const { data: privacyPolicySectionData, isError } = usePrivacyPolicySectionContent();

  // Helper: fallback if backend is down or missing data
  const getSectionData = (key: string, defaultData: any) => {
    const section = privacyPolicySectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const privacyPolicyHeader = getSectionData("Header", defaultPrivacyHeaderData);
  const mainContent = getSectionData("Main_content", defaultPrivacyPolicyPageData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={privacyPolicyHeader} />

      {/* Dynamic privacy policy Section */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-gray-800">
            <RichTextBlock mainContent={mainContent}/>
          </div>
        </div>
      </section>
    </>
  );
}
