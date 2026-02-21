"use client";

import Image from "next/image";
import Slider from "react-slick";
import SmeBanner from "../../../../public/sme-banner.jpeg";
import SmeBannerTwo from "../../../../public/sme-banner-02.jpg";
import Link from "next/link";

// ✅ Custom Next Arrow
function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <div
            className="absolute right-5 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow-md"
            onClick={onClick}
        >
            ➜
        </div>
    );
}

// ✅ Custom Prev Arrow
function PrevArrow(props: any) {
    const { onClick } = props;
    return (
        <div
            className="absolute left-5 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white/80 hover:bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow-md"
            onClick={onClick}
        >
            ←
        </div>
    );
}

// Hero Slider Settings
const heroSettings = {
    dots: false, 
    infinite: false, 
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

export function getStrapiMedia(url: string) {
  if (!url) return "";

  // If already absolute (R2)
  if (url.startsWith("http")) {
    return url;
  }

  // If local, normalize base URL (e.g. avoid ".../api/uploads/...")
  const rawBase = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  const baseWithoutTrailingSlash = rawBase.replace(/\/+$/, "");
  const normalizedBase = baseWithoutTrailingSlash.replace(/\/api$/, "");
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;

  return `${normalizedBase}${normalizedPath}`;
}


export default function HeroSection({ HeroSection }: any) {
    return (
        <Slider {...heroSettings} className="pb-10 overflow-hidden">
            {HeroSection?.map((slide: any, index: number) => (
                <div key={index}>
                    <section className="relative bg-[#F1F6FF] overflow-hidden">
                        <div className="container mx-auto px-6 py-20 lg:py-60 relative z-10">
                            <div className="grid lg:grid-cols-2 gap-10 items-center">
                                <div className="text-center lg:text-left">
                                    <h1 className="text-4xl md:text-4xl lg:text-6xl font-medium mb-6 lg:leading-18 leading-snug">
                                        {slide.title}{" "}
                                        <span className="text-[#32A2DC]">
                                            {slide.highlighted_text}
                                        </span>
                                    </h1>
                                    <p className="text-gray-600 mb-8 text-xl md:text-xl max-w-xl mx-auto lg:mx-0">
                                        {slide.description[0].children[0].text}
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                                        <Link
                                            href={slide.primary_button_link}
                                            className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base md:text-lg shadow hover:bg-[#2790c7] transition"
                                        >
                                            {slide.primary_button_text}
                                        </Link>
                                        <Link
                                            href={slide.secondary_button_link}
                                            className="cursor-pointer px-6 py-3 border border-[#32A2DC] text-[#32A2DC] rounded-full text-base md:text-lg hover:bg-[#E6F5FC] transition"
                                        >
                                            {slide.secondary_button_text}
                                        </Link>
                                    </div>
                                </div>

                                {/* Mobile image */}
                                <div className="relative w-full h-64 md:h-96 lg:hidden">
                                    <Image
                                        src={getStrapiMedia(slide.hero_image.url)}
                                        alt="Hero"
                                        fill
                                        className="object-cover rounded-2xl"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Desktop background image */}
                        <div className="absolute top-0 right-0 bottom-0 left-1/2 hidden lg:block">
                            <Image
                                src={getStrapiMedia(slide.hero_image.url)}
                                alt="Hero"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </section>
                </div>
            ))}
        </Slider>
    );
}
