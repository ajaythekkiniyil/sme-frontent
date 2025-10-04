"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery01 from "../../../public/gl-01.jpg";
import Gallery02 from "../../../public/gl-02.jpg";
import Gallery03 from "../../../public/gl-03.jpg";
import Gallery04 from "../../../public/gl-04.jpg";
import CompleteProfile from "../../../public/complete-profile.svg";
import Monitor from "../../../public/opportunities.svg";
import Respond from '../../../public/respond.svg'
import GetPaid from '../../../public/get-paid.svg'
import KeepinTouch from '../../../public/sme-contact.svg'
import ExpertSection from "../components/homePage/expertSection";
import CommonHeader from '../components/commonHeader'
import { useSMESectionContent } from "../hooks/useSMESectionContent";
import { defaultSMEHeaderData } from "../lib/SMEPage/defaultSMEHeaderData";
import Link from "next/link";
import { defaultSmeMainContentData } from "../lib/SMEPage/defaultSmeMainContentData";
import { defaultBenefitsofChoosingData } from "../lib/SMEPage/defaultBenefitsofChoosingData";
import { defaultHowWeWorkTogetherData } from "../lib/SMEPage/defaultHowWeWorkTogetherData";
import Newsletter from "../components/Newsletter";

const imageSliderSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  cssEase: "ease-in-out",
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export default function SMEs() {

  const { data: smeSectionData, isError } = useSMESectionContent();

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = smeSectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const smeHeader = getSectionData("Header", defaultSMEHeaderData);
  const mainContent = getSectionData("Main_content", defaultSmeMainContentData);
  const imageSlider = getSectionData("Image_slider", []);
  const benefits = getSectionData("Benefits", defaultBenefitsofChoosingData);
  const HowWeWorkTogether = getSectionData("How_we_work_together_section", defaultHowWeWorkTogetherData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={smeHeader} />

      {/* main content */}
      <section className="py-30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-3xl md:text-5xl text-[#273677] mb-10">{mainContent.title}</h2>
          {
            mainContent.description.map((paragraph: any, index: number) => (
              <p key={index} className="text-xl mb-5 leading-9">{paragraph.children[0].text}</p>
            ))
          }
          <p>
            <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg  hover:bg-[#2790c7] transition">
              <Link href={mainContent.primary_button_link}>{mainContent.primary_button_text}</Link>
            </button>
          </p>
        </div>
      </section>

      {/* image sliders */}
      <section>
        <Slider
          {...imageSliderSettings}
          slidesToShow={3}           // number of slides visible
          slidesToScroll={1}
          infinite={true}
          autoplay={true}
          speed={600}
          dots={false}
          arrows={false}
          centerMode={false}         // optional: true if you want partial prev/next slides visible
          variableWidth={true}       // allows each slide to take width + margin
        >
          {
            // take image from strapi or defult array
            (imageSlider?.image_slider?.length ? imageSlider.image_slider : [Gallery01, Gallery02, Gallery03, Gallery04])
              .map(
                (img: any, index: number) => {
                  return (
                    <div key={index} className="px-2">
                      <Image
                        src={imageSlider?.image_slider?.length > 0 ? `${STRAPI_URL + img.url}` : img}
                        alt={`Gallery Image ${index + 1}`}
                        width={1200}
                        height={600}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                  )
                }
              )
          }
        </Slider>
      </section>

      {/* Benefits of choosing */}
      <section className="bg-white mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-left mb-8 sm:mb-12 md:mb-20">
            <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">
              {benefits.benefits_heading.split(",")[0]}
              <br />
              <span className='text-[#32a2dc]'>{benefits.benefits_heading.split(",")[1]}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1">
            {
              benefits.benfits_list.map((benefit: any, index: number) => (
                <div key={index} className="border-b border-b-[#dadada] pb-10 mb-10">
                  <h3 className="text-2xl text-[#007AB9] mb-5">{benefit.benefit}</h3>
                  <p className="text-xl">{benefit.description[0].children[0].text}</p>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-[#F6FAFF] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-left mb-8 sm:mb-12 md:mb-20">
            <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5">
              {HowWeWorkTogether.heading.split(",")[0]} <br />
              <span className="text-[#32a2dc]">{HowWeWorkTogether.heading.split(",")[1]}</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="space-y-10">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 pb-8 border-b border-gray-300">
              {/* Column 1 - Icon */}
              <div className="flex justify-center md:justify-start">
                <div className="w-25 h-25 rounded-full bg-[#273677] flex items-center justify-center">
                  <Image src={CompleteProfile} alt="Profile" width={32} height={32} />
                </div>
              </div>

              {/* Column 2 - Heading */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-medium text-[#007AB9]">
                  {HowWeWorkTogether.steps[0].step}
                </h3>
              </div>

              {/* Column 3 - Description */}
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  {HowWeWorkTogether.steps[0].description[0].children[0].text}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 pb-8 border-b border-gray-300">
              <div className="flex justify-center md:justify-start">
                <div className="w-25 h-25 rounded-full bg-[#273677] flex items-center justify-center">
                  <Image src={Monitor} alt="Opportunity" width={32} height={32} />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-medium text-[#007AB9]">
                  {HowWeWorkTogether.steps[1].step}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  {HowWeWorkTogether.steps[1].description[0].children[0].text}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 pb-8 border-b border-gray-300">
              <div className="flex justify-center md:justify-start">
                <div className="w-25 h-25 rounded-full bg-[#273677] flex items-center justify-center">
                  <Image src={Respond} alt="Opportunity" width={32} height={32} />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-medium text-[#007AB9]">
                  {HowWeWorkTogether.steps[2].step}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  {HowWeWorkTogether.steps[2].description[0].children[0].text}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 pb-8 border-b border-gray-300">
              <div className="flex justify-center md:justify-start">
                <div className="w-25 h-25 rounded-full bg-[#273677] flex items-center justify-center">
                  <Image src={GetPaid} alt="Opportunity" width={32} height={32} />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-medium text-[#007AB9]">
                  {HowWeWorkTogether.steps[3].step}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  {HowWeWorkTogether.steps[3].description[0].children[0].text}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 pb-8 border-b border-gray-300">
              <div className="flex justify-center md:justify-start">
                <div className="w-25 h-25 rounded-full bg-[#273677] flex items-center justify-center">
                  <Image src={KeepinTouch} alt="Opportunity" width={32} height={32} />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-medium text-[#007AB9]">
                  {HowWeWorkTogether.steps[4].step}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  {HowWeWorkTogether.steps[4].description[0].children[0].text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experts */}
      <ExpertSection bgColor="white" />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
