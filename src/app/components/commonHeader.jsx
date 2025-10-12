import Link from "next/link";
import BannerImage from "../../../public/inner-smes.jpg";
import Image from "next/image";
import { STRAPI_URL } from "./homePage/heroSection";

export default function CommonHeader({ headerData }) {    
    return (
        <section className="relative w-full h-[500px] sm:h-[700px] md:h-[900px] overflow-hidden">
            {/* Background Image */}
            <Image
                src={(headerData?.background_image?.url === "" || headerData?.background_image === null) ? BannerImage : `${STRAPI_URL + headerData?.background_image?.url}`}
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
                        {headerData?.title?.split(",")[0]}
                        <span className="text-[#32A2DC]">
                            <br />
                            {headerData?.title.split(",")[1]}
                        </span>
                    </h1>
                    
                    <p className="mb-8 md:mb-12 text-xl text-white font-thin">{headerData?.description}</p>
                    
                    {headerData?.primary_button_link && <Link href={headerData?.primary_button_link} className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
                        {headerData?.primary_button_text}
                    </Link>}
                </div>
            </div>
        </section>
    )
}