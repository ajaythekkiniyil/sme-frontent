import Image from "next/image";
import Slider from "react-slick";
import ServiceGridImage from '../../../../public/project-one.jpg'
import { STRAPI_URL } from "./heroSection";

const serviceSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1280, // ≤1280px
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024, // ≤1024px
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // ≤768px
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640, // ≤640px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
      },
    },
  ],
};

export default function UsecasesSection({ servicesSectionData }: any) {    
    return (
        <section className="bg-[#F6FAFF] py-16 sm:py-20 lg:pt-25 lg:pb-40" data-aos="fade-up">
            <div className="container mx-auto px-6">
                <div className="text-left mb-20">
                    <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Use <span className='text-[#32a2dc]'>Cases</span></h2>
                    <p className="text-gray-600 max-w-xl text-sm sm:text-base md:text-lg">
                        {servicesSectionData.description}
                    </p>
                </div>
            </div>
            <div className="container relative mx-auto">
                <Slider {...serviceSettings}>
                    {servicesSectionData.services_card.map((slide: any, index: number) => (
                        <div key={index} className="px-3 pb-18" data-aos="fade-up">
                            <div className="relative rounded-2xl overflow-hidden">
                                <Image
                                    src={slide.background_image.url === "" ? ServiceGridImage : `${STRAPI_URL + slide.background_image.url}`}
                                    alt={slide.service_title}
                                    className="w-full h-80 object-cover rounded-2xl"
                                    width={900}
                                    height={900}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#32A2DC]/100 to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-2xl font-thin text-white">{slide.service_title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}