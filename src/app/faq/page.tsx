"use client";
import { defaultFaqData } from "../lib/faq/defaultFaqData";
import FaqSection from '../components/homePage/faq'
import CommonHeader from "../components/commonHeader";
import { useFaqSectionContent } from "../hooks/useFaqSectionContent";
import { defaultfaqHeaderData } from "../lib/faq/defaultfaqHeaderData";
import { defaultFaqMainContent } from "../lib/faq/defaultFaqMainContent";

export default function faq() {
  const { data: faqSectionData, isError } = useFaqSectionContent();

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = faqSectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const faqHeader = getSectionData("Header", defaultfaqHeaderData);
  const mainContent = getSectionData("Main_content", defaultFaqMainContent);
  const faq = getSectionData("Faq", defaultFaqData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={faqHeader} />

      {/* Faq */}
      <FaqSection mainContent={mainContent} faq={faq} />
    </>
  );
}
