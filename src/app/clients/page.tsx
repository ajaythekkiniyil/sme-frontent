"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BannerImage from "../../../public/dubai.jpg";
import Gallery01 from "../../../public/about-gal-01.jpg";
import Gallery02 from "../../../public/about-gal-02.jpg";
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-8 md:mb-12 leading-8 md:leading-[4rem]">
            Clie
              <span className="text-[#32A2DC]">
              nts
              </span>
            </h1>
            <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
              Join Our Network
            </button>
          </div>
        </div>
      </section>


      {/* <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#273677] mb-12 text-center">
          Join Our Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold text-[#273677]">{job.title}</h2>
              <p className="text-gray-500">{job.location}</p>
              <p className="text-gray-400 text-sm">{job.type}</p>
              <Link
                href={`/careers/${job.id}`}
                className="mt-4 inline-block px-4 py-2 bg-[#32A2DC] text-white rounded-full text-sm hover:bg-[#2790c7]"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section> */}















   











    </>
  );
}
