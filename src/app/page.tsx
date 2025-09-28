"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import Image from 'next/image'
import BasicEnquiryForm from './components/basicEnquiryForm'
import HeroSection from "./components/homePage/heroSection";
import { useHomePageContent } from "./hooks/useHomePageContent";
import { defaultHeroData } from "./lib/homePage/defaultHeroData";
import { defaultHowItWorksData } from "./lib/homePage/defaultHowItWorksData";
import HowItWorksSection from "./components/homePage/howItWorks";
import { defaultWhySmeOnCallData } from "./lib/homePage/defaultWhySmeOnCallData";
import WhySmeOnCallSection from "./components/homePage/whySmeOnCall";
import { defaultServicesData } from "./lib/homePage/defaultServicesData";
import ServiceSection from "./components/homePage/services";
import { defaultExpertsData } from "./lib/homePage/defaultExpertsData";
import ExpertSection from "./components/homePage/expertSection";
import { defaultFaqData } from "./lib/homePage/defaultFaqData";
import TestimonialSection from "./components/homePage/testimonials";
import { defaultTestimonial } from "./lib/homePage/defaultTestimonials";
import CustomLoader from "./components/CustomLoader";
import FaqSection from './components/homePage/faq'

export default function Page() {
  // const { data: homePageData, isLoading, isError } = useHomePageContent();

  {/* If Backend is down or no data fallback to default landing content (landing page content is dynamic) */ }
  {/* take data from strapi or default data */ }
  const HeroSectionData = defaultHeroData
    // (isError || homePageData?.data?.Hero_section.length === 0)
    //   ? defaultHeroData
    //   : homePageData?.data?.Hero_section

  const HowItWorksSectionData = defaultHowItWorksData
    // (isError || homePageData?.data?.How_it_works.length === 0)
    //   ? defaultHowItWorksData
    //   : homePageData?.data?.How_it_works

  const WhySmeOnCallSectionData = defaultWhySmeOnCallData
    // (isError || homePageData?.data?.Why_sme_on_call?.length === 0 || homePageData?.data?.Why_sme_on_call === null)
    //   ? defaultWhySmeOnCallData
    //   : homePageData?.data?.Why_sme_on_call

  const servicesSectionData = defaultServicesData
    // (isError || homePageData?.data?.Services?.length === 0 || homePageData?.data?.Services === null)
    //   ? defaultServicesData
    //   : homePageData?.data?.Services

  const expertSectionData = defaultExpertsData
    // (isError || homePageData?.data?.Experts?.length === 0 || homePageData?.data?.Experts === null)
    //   ? defaultExpertsData
    //   : homePageData?.data?.Experts


  const testimonialSectionData = defaultTestimonial
    // (isError || homePageData?.data?.Testimonials?.length === 0 || homePageData?.data?.Testimonials === null)
    //   ? defaultTestimonial
    //   : homePageData?.data?.Testimonials

  // Initialize AOS here
  useEffect(() => {
    AOS.init({
      duration: 2000,   // animation duration (ms)
      offset: 100,      // trigger point
      once: true,       // animate only once
      easing: "ease-in-out",
    });
  }, []);

  // if (isLoading) {
  //   return (
  //     <CustomLoader />
  //   )
  // }

  return (
    <>
      {/* Hero section */}
      <HeroSection HeroSection={HeroSectionData} />

      {/* How its works */}
      <HowItWorksSection HowItWorksData={HowItWorksSectionData} />

      {/* Why SME on Call */}
      <WhySmeOnCallSection WhySmeOnCallSectionData={WhySmeOnCallSectionData} />

      {/* Services */}
      <ServiceSection servicesSectionData={servicesSectionData} />

      {/* Contact Section */}
      <section className="py-16 sm:py-20 md:py-24" id='contact-us' data-aos="fade-up">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Text */}
          <div className="text-left mb-8 md:mb-0" data-aos="fade-up">
            <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Contact <span className='text-[#32a2dc]'>Us</span></h2>
            <p className="text-gray-600 max-w-xl text-sm sm:text-base md:text-lg">
              {/* {
                homePageData?.data.Contact_us_description[0].children[0].text === "" || !homePageData
                  ? "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
                  : homePageData?.data.Contact_us_description[0].children[0].text
              } */}
              {/* Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. */}
            </p>
          </div>
          {/* Right: Form */}
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12" data-aos="fade-up">
            <BasicEnquiryForm />
          </div>
        </div>
      </section>

      {/* Featured Experts */}
      <ExpertSection expertSectionData={expertSectionData} />

      {/* Faq */}
      {/* <FaqSection faqSectionData={defaultFaqData}/> */}

      {/* Testimonials */}
      <TestimonialSection testimonialSectionData={testimonialSectionData} />
    </>
  )
}