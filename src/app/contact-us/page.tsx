"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import BannerImage from "../../../public/contact-sme.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
            Contact {" "}
              <span className="text-[#32A2DC]">
              Us
              </span>
            </h1>
            {/* <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
              Join Our Network
            </button> */}
          </div>
        </div>
      </section>

      <section className="md:py-30 sm:py-16"  data-aos="fade-up">
  <div className="container mx-auto px-6">

    <form className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none"
          />
        </div>
      </div>

      {/* Company & Business Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            placeholder="Your company name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Business Number
          </label>
          <input
            type="text"
            placeholder="e.g. 123456789"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none"
          />
        </div>
      </div>

      {/* Email & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="City, Country"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none"
          />
        </div>
      </div>

      {/* Field & Inquiry Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Field
          </label>
          <input
            type="text"
            placeholder="Industry / Field"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Inquiry Type
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none">
            <option value="">Select an option</option>
            <option value="partnership">Partnership</option>
            <option value="support">Support</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          How can our team help you?
        </label>
        <textarea
          rows="5"
          placeholder="Write your message here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32A2DC] focus:outline-none"
        />
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="px-8 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition cursor-pointer"
        >
          Submit Request
        </button>
      </div>
    </form>
  </div>
</section>



<section className="py-16 md:py-24 bg-[#f6faff]" data-aos="fade-up">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
      
      {/* Left: Contact Info */}
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#273677]">
          Get in Touch
        </h2>
        <p className="text-gray-600">
          Get in touch with our Dubai team for inquiries and support.
        </p>

        <div className="space-y-4 text-gray-700">
          <p className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-[#32A2DC]" />
            Downtown Business Tower, Dubai
          </p>
          <p className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#32A2DC]" />
            <a href="mailto:dubai@company.com" className="hover:underline">
              dubai@company.com
            </a>
          </p>
          <p className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-[#32A2DC]" />
            <a href="tel:+97145550123" className="hover:underline">
              +971 4 555 0123
            </a>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="lg:col-span-2 rounded-2xl overflow-hidden">
        <Image
          src={Dubai} // replace with your image
          alt="Dubai Office"
          width={600}
          height={400}
          className="object-cover w-full h-[300px] md:h-[400px]"
        />
      </div>
    </div>
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
    variableWidth={true}

  >
    {[Gallery01, Gallery02, Gallery03, Gallery04, Gallery01, Gallery02, Gallery03, Gallery04].map(
      (img, index) => (
        <div key={index} className="px-1"> {/* px-2 = horizontal margin */}
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





   











    </>
  );
}
