"use client";
import Slider from "react-slick";
import Image from "next/image";
import BannerImage from "../../../public/sme-about.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery01 from "../../../public/about-gal-01.jpg";
import Gallery02 from "../../../public/about-gal-02.jpg";
import Gallery03 from "../../../public/about-gal-03.jpg";
import Gallery04 from "../../../public/about-gal-04.jpg";
import Clarity from "../../../public/clarity.svg";
import Customer from "../../../public/customer.svg";
import Trust from "../../../public/trust.svg";
import Better from "../../../public/better.svg";
import Speed from "../../../public/speed.svg";
import CommonHeader from "../components/commonHeader";
import { defaultAboutusHeaderData } from "../lib/about-us/defaultAboutusHeaderData";
import { useAboutUsSectionContent } from "../hooks/useAboutUsSectionContent";
import { defaultMainContent } from "../lib/about-us/defaultMainContent";
import { defaultOurValuesData } from "../lib/about-us/defaultOurValuesData";
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
  const { data: aboutUsSectionData, isError } = useAboutUsSectionContent();
  const ourValuesImagesIcons = [Clarity, Customer, Trust, Better, Speed]
  const defaultSliderImages = [Gallery01, Gallery02, Gallery03, Gallery04, Gallery01, Gallery02, Gallery03, Gallery04]

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = aboutUsSectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const aboutUsHeader = getSectionData("Header", defaultAboutusHeaderData);
  const mainContent = getSectionData("Main_content", defaultMainContent);
  const ourValues = getSectionData("Our_values", defaultOurValuesData);
  const imageSlider = getSectionData("Image_slider", defaultOurValuesData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={aboutUsHeader} />

      {/* image text alternative 1 */}
      <section className="py-30" data-aos="fade-up">
        <div className="container mx-auto px-6">
          {/* <h2 className="text-3xl text-[#273677] mb-10 md:leading-12 leading-10 sm:leading-10">In a world full of noise, real expertise is rare-and more critical than ever.<br/>SMEOnCall exists to bridge that gap. </h2> */}
          {
            mainContent?.description?.map((para: any, index: number) => (
              <p key={index} className="text-xl mb-5 leading-9">{para.children[0].text}</p>
            ))
          }
        </div>
      </section>

      <section className="bg-[#F6FAFF] mx-auto py-16 sm:py-24 md:py-32" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">{ourValues.heading.split(" ")[0]} <span className='text-[#32a2dc]'>{ourValues.heading.split(" ")[1]}</span></h2>
          <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">{ourValues.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-15 gap-6">
            {
              ourValues.Values.map((Value: any, index: number) => (
                <div key={index} className="bg-white px-10 py-20" data-aos="fade-up">
                  <Image src={ourValuesImagesIcons[index]} alt="Value 1" width={100} height={100} className="w-[40px] h-auto object-cover mb-8" />

                  <h3 className="text-2xl font-semibold text-[#273677] mb-5">{Value.value_title}</h3>

                  <p className="text-gray-700 text-lg">{Value.description[0].children[0].text}</p>
                </div>
              ))
            }
          </div>

        </div>
      </section>

      {/* Contact section insert here */}
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
                <div key={index} className="px-1"> {/* px-2 = horizontal margin */}
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
