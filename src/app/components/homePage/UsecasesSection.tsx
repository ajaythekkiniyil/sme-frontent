"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import ServiceGridImage from '../../../../public/project-one.jpg';

// CRITICAL: CSS MUST BE HERE
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getStrapiMedia } from "./heroSection";

export default function UsecasesSection({ servicesSectionData }: any) {
  // 1. We manually track how many slides to show
  const [slidesToShow, setSlidesToShow] = useState(4); // Default to 4
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 2. Function to calculate slides based on EXACT screen width
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1); // Force 1 slide on Mobile
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2); // Force 2 slides on Tablet
      } else {
        setSlidesToShow(4); // Force 4 slides on Desktop
      }
    };

    // Run immediately on load
    handleResize();
    setMounted(true);

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const serviceSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    // 3. We use our STATE value, not the responsive array
    slidesToShow: mounted ? slidesToShow : 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    // Note: We removed the 'responsive' array entirely to prevent conflicts
  };

  // Prevent flash of unstyled content
  if (!mounted) return null;

  return (
    <section className="bg-[#F6FAFF] py-16 sm:py-20 lg:pt-25 lg:pb-40" data-aos="fade-up">
      <div className="container mx-auto px-6">
        <div className="text-left mb-8">
          <h2 className="text-3xl md:text-5xl font-medium text-[#273677] mb-5">
            Use <span className="text-[#32a2dc]">Cases</span>
          </h2>
          <p className="text-gray-600 max-w-xl text-sm md:text-lg">
            {servicesSectionData?.description}
          </p>
        </div>
      </div>

      <div className="container relative mx-auto px-6">
        {/* 4. KEY PROP IS THE SECRET SAUCE 
           Changing the 'key' forces React to destroy and re-create the slider 
           whenever the slide count changes. This guarantees it fixes itself.
        */}
        <Slider {...serviceSettings} key={slidesToShow}>
          {servicesSectionData?.services_card?.map((slide: any, index: number) => (
            <div key={index} className="px-2 pb-12">
              <div className="relative rounded-2xl overflow-hidden group h-80 w-full">
                <Image
                  src={
                    !slide.background_image?.url
                      ? ServiceGridImage
                      : getStrapiMedia(slide.background_image.url)
                  }
                  alt={slide.service_title || "Service"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#32A2DC]/100 via-[#32A2DC]/90 to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 z-10">
                  <p className="text-2xl font-regular text-white leading-7">
                    {slide.service_title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}