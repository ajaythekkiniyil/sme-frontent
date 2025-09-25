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
            <Link href="/job-posts">
            <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
              View All Jobs
            </button>
            </Link>
          </div>
        </div>
      </section>


      <section className="py-30 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-10 items-center">
              <div>
                <Image src={JoinNetwork} alt="General Manager"/>
              </div>

              <div>
                <h3 className="text-3xl text-[#273677] mb-6 md:leading-12 leading-10 sm:leading-10 font-regular">SMEONCALL – Join Our Network</h3>
                <p className="text-xl mb-5 leading-9">We connect decision-makers with verified subject matter experts, empowering them to make faster, smarter, and more confident choices.</p>
                <p className="text-xl mb-5 leading-9">Our diverse global network is one of the largest and most dynamic sources of real-world expertise—growing daily with new professionals from across the energy industry.  </p>
              </div>
          </div>
        </div>
    </section>



    <section className="py-30 bg-[#F6FAFF]" data-aos="fade-up">
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



    <section className="py-30 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-10 items-center">

              <div>
                <h3 className="text-3xl text-[#273677] mb-6 md:leading-12 leading-10 sm:leading-10 font-regular">We believe in the power of knowledge.</h3>
                <p className="text-xl mb-5 leading-9">We work together, win together, and grow together
“At SMEOnCall, we value diversity, inclusion, and the power of shared expertise. We believe in working as a team—leveraging collective knowledge to help organizations make better, faster, and more informed decisions.” </p>
              </div>


              <div>
                <Image src={CrTeam07} alt="General Manager"/>
              </div>

          </div>
        </div>
    </section>














   











    </>
  );
}
