"use client";
import Image from "next/image";
import BannerImage from "../../../public/sme-about.jpg";
import { defaultFaqData } from "../lib/homePage/defaultFaqData";
import FaqSection from '../components/homePage/faq'

export default function faq() {




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
            FAQ {" "}
              <span className="text-[#32A2DC]">
              
              </span>
            </h1>
            {/* <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
              Join Our Network
            </button> */}
          </div>
        </div>
      </section>

       {/* Faq */}
      <FaqSection faqSectionData={defaultFaqData}/>








   











    </>
  );
}
