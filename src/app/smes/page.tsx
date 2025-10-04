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

export default function SMEs() {
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

  return (
    <>
      {/* Common Header */}
      <CommonHeader />

      {/* Placeholder for next section */}
      <section className="py-30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-3xl md:text-5xl text-[#273677] mb-10">Trust SMEs</h2>
          <p className="text-xl mb-5 leading-9">Organizations encounter challenges throughout the life cycle of the well every single day. So, how can leaders effectively navigate these obstacles, reduce risks, and save costs to improve efficiency? </p>
          <p className="text-xl mb-5 leading-9">That’s where SMEOnCall comes in.  </p>
          <p className="text-xl mb-5 leading-9">We will connect you with the real Subject Matter Experts (SMEs) who will share their knowledge with clients through flexible opportunities such as phone consultations, short or detailed reports—each offered at standarized pricing based on the scope of work.  Our network consists of highly experienced professionals in the Oil & Gas sector.   </p>
          <p className="text-xl mb-5 leading-9">By joining our network , you can share your expertise, earn additional incomce and help solve real-world challenges across the energy industry.  </p>
          <p><button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg  hover:bg-[#2790c7] transition">
            Join Our Network
          </button></p>
        </div>
      </section>

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
          {[Gallery01, Gallery02, Gallery03, Gallery04, Gallery01, Gallery02, Gallery03, Gallery04].map(
            (img, index) => (
              <div key={index} className="px-2"> {/* px-2 = horizontal margin */}
                <Image
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  width={1200}
                  height={600}
                  className="w-full h-[300px] object-cover"
                />
              </div>
            )
          )}
        </Slider>
      </section>

      <section className="bg-white mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-left mb-8 sm:mb-12 md:mb-20">
            <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Benefits of Choosing <br /><span className='text-[#32a2dc]'>to
              Work With us ?</span></h2>
          </div>
          <div className="grid grid-cols-1">
            <div className="border-b border-b-[#dadada] pb-10 mb-10">
              <h3 className="text-2xl text-[#007AB9] mb-5">Get Paid</h3>
              <p className="text-xl">You will receive direct payment automatically after each completed project </p>
            </div>
            <div className="border-b border-b-[#dadada] pb-10 mb-10">
              <h3 className="text-2xl text-[#007AB9] mb-5">Make your job Meaningful</h3>
              <p className="text-xl leading-8">Engage with SMEOnCall clients and fellow experts in your field, leverage your experience, and gain access to exclusive content, webcasts, and transcripts across and beyond your industry. </p>
            </div>
            <div className="border-b border-b-[#dadada] pb-10 mb-10">
              <h3 className="text-2xl text-[#007AB9] mb-5">Trust & Confidence </h3>
              <p className="text-xl leading-8">Share your expertise in a secure environment, supported by SMEOnCall’s industry-leading compliance standards that minimize conflicts of interest and ensure confidentiality. </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6FAFF] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-left mb-8 sm:mb-12 md:mb-20">
            <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5">
              How We Work <br />
              <span className="text-[#32a2dc]">Together ?</span>
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
                  Complete SME On Call Profile
                </h3>
              </div>

              {/* Column 3 - Description */}
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  Add your experience, and SMEOnCall will find the right projects for you through intelligent matching.
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
                  Monitor Open Opportunities
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  We email you potential client projects as soon as they become available.
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
                  Respond In Real Time
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  When you accept a project invitation, our team introduces you—along with other qualified experts—to the client. We will notify you if the client selects you.
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
                  Get Paid
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  After project completion, your payment is deposited directly into your bank account.
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
                  Keep In Touch
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-gray-700 text-lg">
                  Stay connected with SMEOnCall to discover your next opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experts */}
      <ExpertSection bgColor="white" />

      <section className="bg-[#f8fafc] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px] mt-16" data-aos="fade-up">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#273677] mb-6">
            Subscribe to Our <span className="text-[#32a2dc]">Newsletter</span>
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Stay up-to-date with the latest opportunities, insights, and updates from SMEOnCall.
            Join our community of experts today!
          </p>

          {/* Form */}
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32a2dc] text-gray-700"
              required
            />
            <button
              type="submit"
              className="cursor-pointer bg-[#32a2dc] text-white font-medium px-8 py-3 rounded-full hover:bg-[#273677] transition"
            >
              Subscribe
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
