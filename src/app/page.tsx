"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./components/homePage/heroSection";
import { useHomePageContent } from "./hooks/useHomePageContent";
import { defaultHeroData } from "./lib/homePage/defaultHeroData";
import { defaultHowItWorksData } from "./lib/homePage/defaultHowItWorksData";
import HowItWorksSection from "./components/homePage/howItWorks";
import { defaultWhySmeOnCallData } from "./lib/homePage/defaultWhySmeOnCallData";
import WhySmeOnCallSection from "./components/homePage/whySmeOnCall";
import { defaultUsecasesData } from "./lib/homePage/defaultUsecasesData";
import UsecasesSection from "./components/homePage/UsecasesSection";
import ExpertSection from "./components/homePage/expertSection";
import CustomLoader from "./components/CustomLoader";
import ContactSection from "./components/homePage/ContactSection";

export default function Page() {
  const { data: homePageData, isLoading, isError } = useHomePageContent();

  {/* If Backend is down or no data fallback to default landing content (landing page content is dynamic) */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = homePageData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const HeroSectionData = getSectionData("Hero_section", defaultHeroData);
  const HowItWorksSectionData = getSectionData("How_it_works", defaultHowItWorksData);
  const WhySmeOnCallSectionData = getSectionData("Why_sme_on_call", defaultWhySmeOnCallData);
  const servicesSectionData = getSectionData("Use_cases", defaultUsecasesData);
  
  // Initialize AOS here
  useEffect(() => {
    AOS.init({
      duration: 2000,   // animation duration (ms)
      offset: 100,      // trigger point
      once: true,       // animate only once
      easing: "ease-in-out",
    });
  }, []);

  if (isLoading) {
    return (
      <CustomLoader />
    )
  }

  return (
    <>
      {/* Hero section */}
      <HeroSection HeroSection={HeroSectionData} />

      {/* How its works */}
      <HowItWorksSection HowItWorksData={HowItWorksSectionData} />

      {/* Why SME on Call */}
      <WhySmeOnCallSection WhySmeOnCallSectionData={WhySmeOnCallSectionData} />

      {/* Use cases */}
      <UsecasesSection servicesSectionData={servicesSectionData} />

      {/* Contact Section */}
      <ContactSection />

      {/* Featured Experts */}
      <ExpertSection />

      {/* Faq */}
      {/* <FaqSection faqSectionData={defaultFaqData}/> */}

      {/* Testimonials */}
      {/* <TestimonialSection testimonialSectionData={testimonialSectionData} /> */}
    </>
  )
}