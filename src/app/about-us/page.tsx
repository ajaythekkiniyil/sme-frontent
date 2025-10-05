"use client";
import Slider from "react-slick";
import Image from "next/image";
import BannerImage from "../../../public/sme-about.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery01 from "../../../public/about-gal-01.jpg";
import Gallery02 from "../../../public/about-gal-02.jpg";
import Gallery03 from "../../../public/about-gal-03.jpg";
import Gallery04 from "../../../public/about-gal-04.jpg";
import Clarity from "../../../public/clarity.svg";
import Customer from "../../../public/customer.svg";
import Trust from "../../../public/trust.svg";
import Better from "../../../public/better.svg";
import Speed from "../../../public/speed.svg";

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
              Who We {" "}
              <span className="text-[#32A2DC]">
                Are
              </span>
            </h1>
            <p className="mb-8 md:mb-12 text-xl text-white font-thin">In a world full of noise, real expertise is rare-and more critical than ever.
              SMEOnCall exists to bridge that gap.</p>
            {/* <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
              Join Our Network
            </button> */}
          </div>
        </div>
      </section>

      {/* Placeholder for next section */}
      <section className="py-30" data-aos="fade-up">
        <div className="container mx-auto px-6">
          {/* <h2 className="text-3xl text-[#273677] mb-10 md:leading-12 leading-10 sm:leading-10">In a world full of noise, real expertise is rare-and more critical than ever.<br/>SMEOnCall exists to bridge that gap. </h2> */}
          <p className="text-xl mb-5 leading-9">We are building the world’s most trusted insight network, connecting decision-makers with the experts who’ve been there, done that, and solved it before. Our carefully vetted Subject Matter Experts (SMEs) bring clarity, experience, and precision to every conversation-so you can act with confidence and get ahead faster.</p>
          <p className="text-xl mb-5 leading-9">Whether you're navigating technical challenges, strategic shifts, or operational uncertainty, SMEOnCall gives you direct access to best-in-class experts across the oil & gas industry and beyond.</p>
          <p className="text-xl mb-5 leading-9">Our network is growing daily to help answer tomorrow’s toughest questions. Every consultation is backed by a commitment to professionalism, discretion, and integrity-because we know that great decisions start with trust.</p>
        </div>
      </section>

      <section className="bg-[#F6FAFF] mx-auto py-16 sm:py-24 md:py-32" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Our <span className='text-[#32a2dc]'>Values</span></h2>
          <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">SMEOnCall connects you with the knowledge you need—when it matters most. </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-15 gap-6">
            <div className="bg-white px-10 py-20" data-aos="fade-up">
              <Image src={Clarity} alt="Value 1" width={100} height={100} className="w-[40px] h-auto object-cover mb-8" />
              <h3 className="text-2xl font-semibold text-[#273677] mb-5">Clarity in Every Step </h3>
              <p className="text-gray-700 text-lg">We believe in simple, honest communication. Whether we’re solving problems or sharing insight, we prioritize clarity—because complexity should never stand in the way of great decisions. </p>
            </div>
            <div className="bg-white px-10 py-20" data-aos="fade-up">
              <Image src={Customer} alt="Value 1" width={100} height={100} className="w-[40px] h-auto object-cover mb-8" />
              <h3 className="text-2xl font-semibold text-[#273677] mb-5">Customer-First Mindset</h3>
              <p className="text-gray-700 text-lg">We exist to serve our clients' needs with precision, speed, and empathy. Every decision we make, every expert we connect, and every insight we deliver is centered around driving real value for our customers.</p>
            </div>
            <div className="bg-white px-10 py-20" data-aos="fade-up">
              <Image src={Trust} alt="Value 1" width={100} height={100} className="w-[40px] h-auto object-cover mb-8" />
              <h3 className="text-2xl font-semibold text-[#273677] mb-5">Transparency Builds Trust</h3>
              <p className="text-gray-700 text-lg">We operate with openness and integrity—internally, with our experts, and with our clients. We communicate honestly, act ethically, and foster trust in every interaction.</p>
            </div>
            <div className="bg-white px-10 py-20" data-aos="fade-up">
              <Image src={Better} alt="Value 1" width={100} height={100} className="w-[40px] h-auto object-cover mb-8" />
              <h3 className="text-2xl font-semibold text-[#273677] mb-5">Diverse Thinking, Better Outcomes</h3>
              <p className="text-gray-700 text-lg">We welcome diverse voices, experiences, and ideas. We know that innovation and better decision-making happen when different perspectives are heard, respected, and combined.</p>
            </div>
            <div className="bg-white px-10 py-20" data-aos="fade-up">
              <Image src={Speed} alt="Value 1" width={100} height={100} className="w-[40px] h-auto object-cover mb-8" />
              <h3 className="text-2xl font-semibold text-[#273677] mb-5">Speed with Purpose</h3>
              <p className="text-gray-700 text-lg">In a fast-moving world, timing matters. We respond quickly, act decisively, and deliver insight when it's needed most—without ever compromising on quality. </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section insert here */}
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
