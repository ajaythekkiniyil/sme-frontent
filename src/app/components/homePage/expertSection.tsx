import Image from "next/image";
import Slider from "react-slick";
import GeneralManager from '../../../../public/general-manager-sme.jpg'

const Featuredexperts = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 3 } },
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
};

export default function ExpertSection({ expertSectionData }: any) {    
    return (
        <section className="bg-[#F6FAFF] mx-auto py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
            <div className="container mx-auto px-6">
                <div className="text-left mb-8 sm:mb-12">
                    <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">
                        {expertSectionData?.title?.split(" ")[0]}<span className='text-[#32a2dc]'> {expertSectionData?.title.split(" ")[1]}</span>
                    </h2>
                    <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">
                        {expertSectionData.description}
                    </p>
                </div>
                <Slider {...Featuredexperts}>
                    {expertSectionData.profile?.map((item: any, i: number) => (
                        <div key={i} className="pb-18" data-aos="fade-up">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-20 items-center">
                                <div>
                                    <Image
                                        src={item.profile_image.url === "" ? GeneralManager : `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.profile_image.url}`}
                                        width={600} height={400} className="w-full h-auto rounded-xl object-cover" alt={item.name} />
                                </div>
                                <div className='md:col-span-2'>
                                    <h3 className="text-4xl font-semibold text-gray-900 mb-4">{item.name}</h3>
                                    <p className="text-[#273677] uppercase text-xl mb-8"> {item.designation}</p>
                                    <p className='text-xl leading-8'>{item.profile_summary[0].children[0].text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}