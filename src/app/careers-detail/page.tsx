"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BannerImage from "../../../public/careers.jpg";
import JoinNetwork from "../../../public/join-network.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery01 from "../../../public/about-gal-01.jpg";
import Gallery02 from "../../../public/about-gal-02.jpg";
import CrTeam03 from "../../../public/cr-team-01.jpg";
import CrTeam04 from "../../../public/cr-team-07.jpg";
import CrTeam05 from "../../../public/cr-team-03.jpg";
import CrTeam06 from "../../../public/cr-team-05.jpg";
import CrTeam01 from "../../../public/cr-team-06.jpg";
import CrTeam02 from "../../../public/cr-team-02.jpg";
import CrTeam07 from "../../../public/cr-team-04.jpg";
import Gallery03 from "../../../public/about-gal-03.jpg";
import Gallery04 from "../../../public/about-gal-04.jpg";
import Dubai from "../../../public/dubai.jpg";
import Clarity from "../../../public/clarity.svg";
import Customer from "../../../public/customer.svg";
import Trust from "../../../public/trust.svg";
import Better from "../../../public/better.svg";
import Speed from "../../../public/speed.svg";
import GeneralManager from '../../../public/general-manager-sme.jpg'


const jobs = [
    { id: "1", title: "Frontend Developer", location: "Dubai, UAE", type: "Full-Time" },
    { id: "2", title: "Marketing Specialist", location: "London, UK", type: "Contract" },
    { id: "3", title: "UI/UX Designer", location: "Remote", type: "Full-Time" },
  ];





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
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-8 md:leading-[4rem] mb-6">
            Work {" "}
              <span className="text-[#32A2DC]">
              With Us
              </span>
            </h1>
            <p className="mb-8 md:mb-12 text-xl text-white font-thin">Subject Matter Experts (SMEs) bring curiosity, depth, and clarity to every professional decision that matters.</p>
            <Link href="/careers-detail-inner">
            <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
              View All Jobs
            </button>
            </Link>
          </div>
        </div>
      </section>




      <section className="bg-[#F6FAFF] py-16 sm:py-24 md:py-32" data-aos="fade-up">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-15">

      <div className="bg-white px-10 py-20 rounded-2xl border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Drilling And Well Engineering</h3>
        
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Remote / On Call</span>
        </p>
        
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
          Our SMEs in drilling help clients reduce non-productive time, enhance rig performance, and optimize bit selection. Ideal for experts with field or office-based drilling experience.
        </p>
        
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link>
        
      </div>

      <div className="bg-white px-10 py-20 rounded-2xl border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Well Integrity & Inspection</h3>
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Global</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Support operators with major inspections, risk assessments, and regulatory compliance. Experience in CAT III/IV audits, API RP 90, and integrity management is a plus. 
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link>
      </div>



      <div className="bg-white px-10 py-20 rounded-2xl  border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Production & Artificial Lift</h3>
        <p className="mb-3 text-xl leading-6">Subject Matter Expert, ESP & Artificial Lift Systems</p>
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Remote</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Provide clients with recommendations for optimizing artificial lift strategies and reducing system failures. Must have ESP/rod lift/jet pump design and troubleshooting experience.
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link>
      </div>


      <div className="bg-white px-10 py-20 rounded-2xl  border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Hse & Regulatory Compliance</h3>
        <p className="mb-3 text-xl leading-6">SME, Health, Safety & Environmental (HSE)</p>
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Remote</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Guide companies in building safety management systems, incident response, and training programs. Ideal for those with NEBOSH, OSHA, or ADNOC/Aramco compliance expertise.
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link>
      </div>


      <div className="bg-white px-10 py-20 rounded-2xl  border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Energy Transition & Sustainability</h3>
        <p className="mb-3 text-xl leading-6">Consultant, Carbon Management & Sustainability</p>
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Remote</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Help clients navigate carbon strategy, methane abatement, and flaring reduction plans. Suitable for experts in CCUS, ESG reporting, and oilfield sustainability programs. 
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link> 
      </div>


      <div className="bg-white px-10 py-20 rounded-2xl  border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Digital Transformation & Ai</h3>
        <p className="mb-3 text-xl leading-6">Advisor, Digital Oilfield & AI Applications</p>
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Global / Remote</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Work with clients to digitize operations using AI, digital twins, and real-time monitoring. Seeking SMEs with experience in predictive maintenance, asset optimization, or SCADA.
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link> 
      </div>


      <div className="bg-white px-10 py-20 rounded-2xl  border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Reservoir & Petroleum Engineering</h3>
        <p className="mb-3 text-xl leading-6">Senior Consultant, Reservoir Simulation & Field Development</p>
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Middle East / Remote</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Support with field development planning, material balance, or dynamic reservoir modeling. Proficiency in ECLIPSE, Petrel, or CMG preferred.
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link>
      </div>


      <div className="bg-white px-10 py-20 rounded-2xl  border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Technical Expert, Cementing & Stimulatio</h3>
        <p className="mb-3 text-xl leading-6">Senior Consultant, Reservoir Simulation & Field Development</p>
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: MENATI / APAC</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Assist in treatment design, post-job evaluation, and failure investigation. Experience in frac, acidizing, and zonal isolation strongly valued. 
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link>
      </div>


      <div className="bg-white px-10 py-20 rounded-2xl  border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Coordinator, SME Engagement & Sales Ops </h3>
        {/* <p className="mb-3 text-xl leading-8">Senior Consultant, Reservoir Simulation & Field Development</p> */}
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Dubai (Hybrid)</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Help onboard SMEs, match them to client needs, and support consulting logistics. Great for someone with oilfield operations background and a flair for customer 
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link>
      </div>

      <div className="bg-white px-10 py-20 rounded-2xl  border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
        <h3 className="text-2xl font-semibold text-[#273677] mb-5">Coordinator, SME Engagement & Sales Ops </h3>
        {/* <p className="mb-3 text-xl leading-8">Senior Consultant, Reservoir Simulation & Field Development</p> */}
        <p className="flex items-center text-[#32A2DC] text-lg mb-4">
          <span>Location: Dubai (Hybrid)</span>
        </p>
        <p className="text-gray-700 text-lg mb-6 line-clamp-3">
        Help onboard SMEs, match them to client needs, and support consulting logistics. Great for someone with oilfield operations background and a flair for customer 
        </p>
        <Link href="/careers-detail-inner">
        <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
          View Details
        </button> 
        </Link>
      </div>



    </div>
  </div>
</section>






















   








      <section className="pt-30 bg-[#F6FAFF]" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1">
              <div>
              <h3 className="text-center text-3xl text-[#273677] mb-6 md:leading-12 leading-10 sm:leading-10 font-regular">At SMEOnCall, we welcome talent at every stage. If you're smart, curious, and passionate about making an impact, we’d love to hear from you. Check out our current openings and apply today. </h3>
              </div>
              <Link href="/careers-detail" className="mx-auto">
              <button className="cursor-pointer px-10 py-3 bg-[#32A2DC] text-white rounded-full text-lg hover:bg-[#2790c7] transition max-w-xl mx-auto">
              Join Now
            </button>   
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 mt-20">
              <div>
                <Image src={CrTeam01} alt="Clarity" className="w-full h-[450px] object-cover"/>
              </div>
              <div>

                <Image src={CrTeam02} alt="Clarity" className="w-full h-[450px] object-cover"/>
              </div>

              <div>
                <Image src={CrTeam03} alt="Clarity"  className="w-full h-[450px] object-cover"/>
              </div>

              <div>
                <Image src={CrTeam04} alt="Clarity"  className="w-full h-[450px] object-cover"/>
              </div>

              <div>
                <Image src={CrTeam05} alt="Clarity"  className="w-full h-[450px] object-cover"/>
              </div>

              <div>
                <Image src={CrTeam06} alt="Clarity"  className="w-full h-[450px] object-cover"/>
              </div>
          </div>
    </section>


    </>
  );
}
