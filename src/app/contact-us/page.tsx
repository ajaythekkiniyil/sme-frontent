"use client";
import Slider from "react-slick";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Gallery01 from "../../../public/about-gal-01.jpg";
import Gallery02 from "../../../public/about-gal-02.jpg";
import Gallery03 from "../../../public/about-gal-03.jpg";
import Gallery04 from "../../../public/about-gal-04.jpg";
import Dubai from "../../../public/dubai.jpg";
import CommonHeader from "../components/commonHeader";
import { defaultContactUsHeaderData } from "../lib/contact-us/defaultContactUsHeaderData";
import { useContactUsSectionContent } from "../hooks/useContactUsSectionContent";
import BasicEnquiryForm from "../components/basicEnquiryForm";
import { defaultGetInTouch } from "../lib/contact-us/defaultGetInTouch";
import { STRAPI_URL } from "../components/homePage/heroSection";

const imageSliderSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false, // hide prev/next arrows
  cssEase: "ease-in-out",
};

export default function SMEs() {
  const { data: contactUsSectionData, isError } = useContactUsSectionContent();
  const defaultSliderImages = [Gallery01, Gallery02, Gallery03, Gallery04, Gallery01, Gallery02, Gallery03, Gallery04]

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = contactUsSectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const contactUsHeader = getSectionData("Header", defaultContactUsHeaderData);
  const getInTouch = getSectionData("Get_in_touch", defaultGetInTouch);
  const imageSlider = getSectionData("Image_slider", []);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={contactUsHeader} />

      {/* Enquiry form */}
      <section className="md:py-30 sm:py-16" data-aos="fade-up">
        <div className="mx-auto max-w-6xl bg-white p-8 md:p-12 rounded-2xl shadow-lg space-y-6">
          <BasicEnquiryForm />
        </div>
      </section>

      {/* contact details */}
      <section className="py-16 md:py-24 bg-[#f6faff]" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

            {/* Left: Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#273677]">
                {getInTouch.title}
              </h2>
              <p className="text-gray-600">
                {getInTouch.description}
              </p>

              <div className="space-y-4 text-gray-700">
                <p className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#32A2DC]" />
                  {getInTouch.location}
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#32A2DC]" />
                  <a href={`mailto:${getInTouch.email}`} className="hover:underline">
                    {getInTouch.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#32A2DC]" />
                  <a href={`tel:${getInTouch.phone}`} className="hover:underline">
                    {getInTouch.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden">
              <Image
                src={getInTouch?.image?.url ? `${STRAPI_URL + getInTouch.image.url}` : Dubai}
                alt="Dubai Office"
                width={600}
                height={400}
                className="object-cover w-full h-[300px] md:h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* image slider */}
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
          variableWidth={true}
        >
          {
            (imageSlider?.image_slider?.length ? imageSlider.image_slider : defaultSliderImages).map(
              (item: any, index: number) => (
                <div key={index} className="px-1">
                  <Image
                    src={item.url ? `${STRAPI_URL + item.url}` : item}
                    alt={`Gallery Image ${index + 1}`}
                    width={1200}
                    height={600}
                    className="w-full h-[300px] object-cover"
                  />
                </div>
              )
            )
          }
        </Slider>
      </section>
    </>
  );
}
