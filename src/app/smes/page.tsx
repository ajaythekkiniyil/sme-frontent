"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import BannerImage from "../../../public/inner-smes.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery01 from "../../../public/gl-01.jpg";
import Gallery02 from "../../../public/gl-02.jpg";
import Gallery03 from "../../../public/gl-03.jpg";
import Gallery04 from "../../../public/gl-04.jpg";
import GeneralManager from '../../../public/general-manager-sme.jpg'

export default function SMEs() {


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


      const Featuredexperts = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1, // desktop default
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,   // ✅ hide both next/prev arrows
        responsive: [
          { breakpoint: 1280, settings: { slidesToShow: 3 } },
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
      };



      const experts = [
        {
          name: "Noah Oliver",
          role: "General Manager",
          img: GeneralManager,
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
          name: "Samantha Nguyen",
          role: "Compliance Specialist",
          img: "/team-4.jpg",
          desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
          name: "Michelle Garcia",
          role: "SEO Specialist",
          img: "/team-2.jpg",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also ",
        },
        {
          name: "Kobie Mainoo",
          role: "Marketing Manager",
          img: "/team-3.jpg",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
      ];
      


  return (
    <>
      <section className="relative w-full h-[500px] sm:h-[700px] md:h-[900px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={BannerImage}
          alt="SME Banner"
          fill
          priority
          className="object-cover"
        />

        {/* Gradient Overlay (bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#273677]/100 via-[#273677]/90 to-transparent"></div>

        {/* Content inside container */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 md:pb-28 pb-20">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-8 md:mb-12 leading-8 md:leading-[4rem]">
              Change the Way{" "}
              <span className="text-[#32A2DC]">
                Decisions
                <br />
                are Made
              </span>
            </h1>
            <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
              Join Our Network
            </button>
          </div>
        </div>
      </section>

      {/* Placeholder for next section */}
      <section className="py-30">
        <div className="container mx-auto px-6">
          <h2 className="text-9xl text-[#273677] mb-10">TRUST SMEs</h2>
          <p className="text-xl mb-5 leading-9">Organizations encounter challenges throughout the life cycle of the well every single day. So, how can leaders effectively navigate these obstacles, reduce risks, and save costs to improve efficiency? </p>
          <p className="text-xl mb-5 leading-9">That’s where SMEOnCall comes in.  </p>
          <p className="text-xl mb-5 leading-9">We will connect you with the real Subject Matter Experts (SMEs) who will share their knowledge with clients through flexible opportunities such as phone consultations, short or detailed reports—each offered at standarized pricing based on the scope of work.  Our network consists of highly experienced professionals in the Oil & Gas sector.   </p>
          <p className="text-xl mb-5 leading-9">By joining our network , you can share your expertise, earn additional incomce and help solve real-world challenges across the energy industry.  </p>
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
        <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Benefits of Choosing <br/><span className='text-[#32a2dc]'>to 
        Work With us ?</span></h2>
        </div>


        <div className="grid grid-cols-1">
          
    <div className="border-b border-b-[#dadada] pb-10 mb-10">
      <h3 className="text-2xl uppercase text-[#007AB9] mb-5">Get Paid</h3>  
      <p className="text-xl">You will receive direct payment automatically after each completed project </p>
    </div>


    <div className="border-b border-b-[#dadada] pb-10 mb-10">
      <h3 className="text-2xl uppercase text-[#007AB9] mb-5">Make your job Meaningful</h3>  
      <p className="text-xl leading-8">Engage with SMEOnCall clients and fellow experts in your field, leverage your experience, and gain access to exclusive content, webcasts, and transcripts across and beyond your industry. </p>
    </div>

    <div className="border-b border-b-[#dadada] pb-10 mb-10">
      <h3 className="text-2xl uppercase text-[#007AB9] mb-5">Trust & Confidence </h3>  
      <p className="text-xl leading-8">Share your expertise in a secure environment, supported by SMEOnCall’s industry-leading compliance standards that minimize conflicts of interest and ensure confidentiality. </p>
    </div>
          
          
          </div>
      </div>
    </section>











{/* Featured Experts */}
<section className="bg-[#F6FAFF] mx-auto py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
      <div className="container mx-auto px-6">
        <div className="text-left mb-8 sm:mb-12">
        <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Featured <span className='text-[#32a2dc]'>Experts</span></h2>
          <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">
            Our dedicated members actively participate in our community, sharing
            expertise, collaborating on projects, and supporting one another.
          </p>
        </div>

        {/* Slider */}
        <Slider {...Featuredexperts}>
          {experts.map((expert, i) => (
            <div key={i} className="pb-18" data-aos="fade-up">
              


              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-20 items-center"> 
              <div> 
                <Image src={expert.img} alt={expert.name} width={600} height={400} className="w-full h-auto rounded-xl object-cover" /> 
                </div> 
                <div className='md:col-span-2'> 
                <h3 className="text-4xl font-semibold text-gray-900 mb-4">{expert.name}</h3> 
                <p className="text-[#273677] uppercase text-xl mb-8"> {expert.role}</p> 
                <p className='text-xl leading-8'>{expert.desc}</p> 
                </div> 
                </div>

            </div>
          ))}
        </Slider>
      </div>
    </section>





    <section className="bg-white mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
  <div className="container mx-auto px-6">
    <div className="text-left mb-8 sm:mb-12 md:mb-20">
      <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5">
        How We Work <br />
        <span className="text-[#32a2dc]">Together ?</span>
      </h2>
    </div>

    {/* Steps */}
    <div className="space-y-10">
      {/* Step 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 pb-8 border-b border-gray-300">
        {/* Column 1 - Icon */}
        <div className="flex justify-center md:justify-start">
          <div className="w-14 h-14 rounded-full bg-[#273677] flex items-center justify-center">
            <Image src="/icons/profile-icon.svg" alt="Profile" width={28} height={28} />
          </div>
        </div>

        {/* Column 2 - Heading */}
        <div>
          <h3 className="text-xl font-semibold text-[#007AB9]">
            Complete SME On Call Profile
          </h3>
        </div>

        {/* Column 3 - Description */}
        <div>
          <p className="text-gray-700 text-lg">
            Add your experience, and SMEOnCall will find the right projects for you through intelligent matching.
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 pb-8 border-b border-gray-300">
        <div className="flex justify-center md:justify-start">
          <div className="w-14 h-14 rounded-full bg-[#273677] flex items-center justify-center">
            <Image src="/icons/opportunity-icon.svg" alt="Opportunity" width={28} height={28} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#007AB9]">
            Monitor Open Opportunities
          </h3>
        </div>
        <div>
          <p className="text-gray-700 text-lg">
            We email you potential client projects as soon as they become available.
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        <div className="flex justify-center md:justify-start">
          <div className="w-14 h-14 rounded-full bg-[#273677] flex items-center justify-center">
            <Image src="/icons/respond-icon.svg" alt="Respond" width={28} height={28} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#007AB9]">
            Respond In Real Time
          </h3>
        </div>
        <div>
          <p className="text-gray-700 text-lg">
            When you accept a project invitation, our team introduces you—along with other qualified experts—to the client. We will notify you if the client selects you.
          </p>
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        <div className="flex justify-center md:justify-start">
          <div className="w-14 h-14 rounded-full bg-[#273677] flex items-center justify-center">
            <Image src="/icons/respond-icon.svg" alt="Respond" width={28} height={28} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#007AB9]">
            Respond In Real Time
          </h3>
        </div>
        <div>
          <p className="text-gray-700 text-lg">
            When you accept a project invitation, our team introduces you—along with other qualified experts—to the client. We will notify you if the client selects you.
          </p>
        </div>
      </div>





    </div>
  </div>
</section>








    </>
  );
}
