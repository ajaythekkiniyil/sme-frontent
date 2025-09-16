import Image from "next/image";
import Slider from "react-slick";
import Testimonial from '../../../../public/item-testimonial.png'

const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
};

export default function TestimonialSection({ testimonialSectionData }: any) {
    return (
        <section className="bg-[#F6FAFF] mx-auto py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 md:gap-20 sm:gap-10">
                    <div>
                        <div className="text-left mb-8 sm:mb-12">
                            <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Client Satisfaction <br /><span className='text-[#32a2dc]'>Our Reputation</span></h2>
                            <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">
                                Our dedicated members actively participate in our community, sharing
                                expertise, collaborating on projects, and supporting one another.
                            </p>
                        </div>
                        <Image src={Testimonial} alt="Client Logos" width={600} height={400} className="w-full h-auto rounded-xl object-cover mt-20 mb-16 md:mb-0 sm:mb-0" data-aos="fade-up" />
                    </div>
                    <Slider {...testimonialSettings} data-aos="fade-up">
                        {
                            testimonialSectionData.map((testimonial: any, index: number) => (
                                <div className="my-2" key={index}>
                                    <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12">
                                        <p className="text-gray-600 mb-8 text-base md:text-lg font-light">
                                            {testimonial.testimonial_text[0].children[0].text}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                                                {testimonial.author_name.split('')[0]}
                                            </div>
                                            <div>
                                                <p className="text-gray-900 font-medium">{testimonial.author_name}</p>
                                                <p className="text-gray-500 text-sm">{testimonial.designation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </section>
    )
}