"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from 'next/link'
import Slider from "react-slick";
import Image from 'next/image'
import SmeBanner from '../../public/sme-banner.jpg'
import SmeBannerTwo from '../../public/sme-banner-02.jpg'
import ServiceGridImage from '../../public/project-one.jpg'
import WhySme from '../../public/why-sme.png'
import { ChevronLeft, ChevronRight, MessageSquare, Users, FileCheck } from "lucide-react";
import BasicEnquiryForm from './components/basicEnquiryForm'
import { ChevronDown } from "lucide-react";
import GeneralManager from '../../public/general-manager-sme.jpg'
import Testimonial from '../../public/item-testimonial.png'


// Custom Arrows
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="cursor-pointer absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 bg-[#32A2DC] text-white p-3 rounded-full hover:bg-[#2684b9] transition"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="cursor-pointer absolute bottom-[-100px] left-1/2 transform -translate-x-[160%] bg-[#32A2DC] text-white p-3 rounded-full hover:bg-[#2684b9] transition"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

export default function ServicesSlider() {
  // ✅ Hero Slider Settings
  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "ease-in-out",
    arrows: true,
  };

  // ✅ Services Slider Settings
  const serviceSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,   // ✅ hide both next/prev arrows
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const testimonialSettings = {
    dots: true,          // show navigation dots
    infinite: true,      // loop infinitely
    speed: 600,          // transition speed
    slidesToShow: 2,     // one testimonial at a time
    slidesToScroll: 1,
    vertical: true,      // ✅ enable vertical mode
    verticalSwiping: true, // ✅ allow swipe up/down
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,       // hide arrows (you can enable if needed)
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
  


  const slides = [
    { id: 1, title: "Testing" },
    { id: 2, title: "Consulting" },
    { id: 3, title: "Analysis" },
    { id: 4, title: "Support" },
    { id: 5, title: "Training" },
    { id: 6, title: "Implementation" },
  ];

    const faqs = [
      {
        q: "How do I become a featured expert?",
        a: "You can apply by signing up as an SME. Once approved, your profile will be featured on our platform.",
      },
      {
        q: "Is there a fee to join as a client or SME?",
        a: "Joining is free, but certain premium services and features may have associated costs.",
      },
      {
        q: "Can I collaborate directly with experts?",
        a: "Yes! Our platform allows you to connect and collaborate directly with featured experts.",
      },
      {
        q: "How is my information kept confidential?",
        a: "We follow strict security protocols and NDAs to ensure your information remains private and protected.",
      },
    ];

  // ✅ Initialize AOS here
  useEffect(() => {
    AOS.init({
      duration: 2000,   // animation duration (ms)
      offset: 100,      // trigger point
      once: true,       // animate only once
      easing: "ease-in-out",
    });
  }, []);


  return (
    <>
      {/* ✅ HERO SLIDER */}
      <Slider {...heroSettings} className='pb-10 overflow-hidden' data-aos="fade-up">
        {/* Slide 1 */}
        <div>
          <section className="relative bg-[#F1F6FF] overflow-hidden">
            <div className="container mx-auto px-6 py-20 lg:py-60 relative z-10">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Text Column */}
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-light mb-6 lg:leading-22 leading-snug"> Quick Reliable and{" "} <span className="text-[#32A2DC]">Confidential</span> </h1>
                  <p className="text-gray-600 mb-8 text-base md:text-lg max-w-xl mx-auto lg:mx-0"> Our Subject Matter Experts provide insights and solutions to your toughest challenges, helping you make informed business decisions quickly. </p>
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base md:text-lg shadow hover:bg-[#2790c7] transition"> Become a Client </button>
                    <button className="cursor-pointer px-6 py-3 border border-[#32A2DC] text-[#32A2DC] rounded-full text-base md:text-lg hover:bg-[#E6F5FC] transition"> Become an SME </button>
                  </div>
                </div> {/* Image (below text on mobile/tablet, right on desktop) */}
                <div className="relative w-full h-64 md:h-96 lg:hidden">
                  <Image src={SmeBanner} alt="SME Banner" fill className="object-cover rounded-2xl" priority />
                </div>
              </div>
            </div> {/* Background Image (Right Side for Desktop) */}
            <div className="absolute top-0 right-0 bottom-0 left-1/2 hidden lg:block">
              <Image src={SmeBanner} alt="SME Banner" fill className="object-cover" priority />
            </div>
          </section>
        </div>

        {/* Slide 2 (Duplicate example) */}
        <div>
          <section className="relative bg-[#F1F6FF] overflow-hidden">
            <div className="container mx-auto px-6 py-20 lg:py-60 relative z-10">
              <div className="grid lg:grid-cols-2 gap-10 items-center"> {/* Text Column */}
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-light mb-6 lg:leading-22 leading-snug"> Quick Reliable and{" "} <span className="text-[#32A2DC]">Confidential</span></h1>
                  <p className="text-gray-600 mb-8 text-base md:text-lg max-w-xl mx-auto lg:mx-0"> Our Subject Matter Experts provide insights and solutions to your toughest challenges, helping you make informed business decisions quickly. </p>
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base md:text-lg shadow hover:bg-[#2790c7] transition"> Become a Client </button>
                    <button className="cursor-pointer px-6 py-3 border border-[#32A2DC] text-[#32A2DC] rounded-full text-base md:text-lg hover:bg-[#E6F5FC] transition"> Become an SME </button>
                  </div> </div> {/* Image (below text on mobile/tablet, right on desktop) */}
                <div className="relative w-full h-64 md:h-96 lg:hidden"> <Image src={SmeBannerTwo} alt="SME Banner" fill className="object-cover rounded-2xl" priority />
                </div>
              </div>
            </div> {/* Background Image (Right Side for Desktop) */}
            <div className="absolute top-0 right-0 bottom-0 left-1/2 hidden lg:block">
              <Image src={SmeBannerTwo} alt="SME Banner" fill className="object-cover" priority />
            </div>
          </section>
        </div>
      </Slider>

      {/* Services Section */}
      <section className="bg-[#fff] py-16 sm:py-20 lg:py-28" data-aos="fade-up">
        <div className="container mx-auto px-6 items-center">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-center mb-15 mx-auto'>
            <div>
              <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-0 sm:mb-0">Ask SMEs<br /> How it <span className='text-[#32a2dc]'>Works</span></h2>
            </div>

            <div>
              <button className="cursor-pointer md:float-right md:text-right sm:float-right sm:text-right px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base sm:text-lg hover:bg-[#1e86bb] transition">
                Contact Now
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {/* Step 01 */}
            <div className="border border-gray-300 p-10" data-aos="fade-up">
              <h2 className="text-9xl text-gray-100">01</h2>
              <MessageSquare className="w-10 h-10 my-8 text-[#32A2DC]" />
              <h3 className="text-2xl text-black mb-3">Submit Your Questions</h3>
              <p className="mb-8 text-gray-500 text-lg font-light">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
              <Link href="#" className="text-[#32A2DC] text-lg border-b border-b-[#32A2DC]">
                Book a call
              </Link>
            </div>

            {/* Step 02 */}
            <div className="border border-gray-300 p-10" data-aos="fade-up">
              <h2 className="text-9xl text-gray-100">02</h2>
              <Users className="w-10 h-10 my-8 text-[#32A2DC]" />
              <h3 className="text-2xl text-black mb-3">We Match You With an SME</h3>
              <p className="mb-8 text-gray-500 text-lg font-light">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
              <Link href="#" className="text-[#32A2DC] text-lg border-b border-b-[#32A2DC]">
                Book a call
              </Link>
            </div>

            {/* Step 03 */}
            <div className="border border-gray-300 p-10" data-aos="fade-up">
              <h2 className="text-9xl text-gray-100">03</h2>
              <FileCheck className="w-10 h-10 my-8 text-[#32A2DC]" />
              <h3 className="text-2xl text-black mb-3">Receive a Tailored Response</h3>
              <p className="mb-8 text-gray-500 text-lg font-light">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
              <Link href="#" className="text-[#32A2DC] text-lg border-b border-b-[#32A2DC]">
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why SME on Call */}
      <section className="py-16 sm:py-20 md:py-24" data-aos="fade-up">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text & Checklist */}
          <div data-aos="fade-up">
          <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Why SME <span className='text-[#32a2dc]'>on Call</span></h2>
            <p className="text-gray-600 max-w-xl mb-8 sm:mb-12 text-sm sm:text-base md:text-lg">
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              {[
                "Customized financial roadmaps",
                "Cash flow forecasting and budgeting",
                "Long-term growth and sustainability strategies",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded bg-green-100 text-green-600 text-sm sm:text-base">
                    ✓
                  </span>
                  <span className="text-gray-800 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <button className="mt-6 sm:mt-8 px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base sm:text-lg hover:bg-[#1e86bb] transition">
              View Details
            </button>
          </div>

          {/* Right: Image */}
          <div data-aos="fade-up">
            <Image
              src={WhySme}
              alt="Team working together"
              width={600}
              height={400}
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F6FAFF] py-16 sm:py-20 lg:pt-25 lg:pb-40" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-left mb-20">
          <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Our <span className='text-[#32a2dc]'>Services</span></h2>
            <p className="text-gray-600 max-w-xl text-sm sm:text-base md:text-lg">
              Lorem ipsum is a dummy or placeholder text commonly used in design.
            </p>
          </div>
        </div>
        <div className="container relative mx-auto">
          <Slider {...serviceSettings}>
            {slides.map((slide) => (
              <div key={slide.id} className="px-3 pb-18" data-aos="fade-up">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image src={ServiceGridImage} alt={slide.title} className="w-full h-80 object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#32A2DC]/100 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-2xl font-thin text-white">{slide.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 md:py-24" id='contact-us' data-aos="fade-up">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Text */}
          <div className="text-left mb-8 md:mb-0" data-aos="fade-up">
          <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Contact <span className='text-[#32a2dc]'>Us</span></h2>
            <p className="text-gray-600 max-w-xl text-sm sm:text-base md:text-lg">
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
            </p>
          </div>
          {/* Right: Form */}
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12" data-aos="fade-up">
            <BasicEnquiryForm />
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
        <div className="text-left mb-8 sm:mb-12">
        <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Frequently Asked <span className='text-[#32a2dc]'>Questions</span></h2>
          <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">
            Find answers to common questions about our experts, services, and community.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6 transition"  data-aos="fade-up"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
                <span className="text-base sm:text-lg">{faq.q}</span>
                {/* Chevron Icon */}
                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>


    <section className="bg-[#F6FAFF] mx-auto py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
      <div className="container mx-auto px-6">
      
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 md:gap-20 sm:gap-10">

          <div>
          <div className="text-left mb-8 sm:mb-12">
        <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] uppercase md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Client Satisfaction <br/><span className='text-[#32a2dc]'>Our Reputation</span></h2>
          <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">
            Our dedicated members actively participate in our community, sharing
            expertise, collaborating on projects, and supporting one another.
          </p>
        </div>
            <Image src={Testimonial} alt="Client Logos" width={600} height={400} className="w-full h-auto rounded-xl object-cover mt-20 mb-16 md:mb-0 sm:mb-0"  data-aos="fade-up"/>
          </div>

          <Slider {...testimonialSettings} data-aos="fade-up">

          <div className="my-2" >     
            <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12">
              <p className="text-gray-600 mb-8 text-base md:text-lg font-light">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                  JD
                </div>
                <div>
                  <p className="text-gray-900 font-medium">John Doe</p>
                  <p className="text-gray-500 text-sm">CEO, Example Corp</p>
                </div>
              </div>
            </div>
          </div>


          <div className="my-2">
            <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12">
              <p className="text-gray-600 mb-8 text-base md:text-lg font-light">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                  JD
                </div>
                <div>
                  <p className="text-gray-900 font-medium">John Doe</p>
                  <p className="text-gray-500 text-sm">CEO, Example Corp</p>
                </div>
              </div>
            </div>

          </div>


          <div className="my-2">
            <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12">
              <p className="text-gray-600 mb-8 text-base md:text-lg font-light">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                  JD
                </div>
                <div>
                  <p className="text-gray-900 font-medium">John Doe</p>
                  <p className="text-gray-500 text-sm">CEO, Example Corp</p>
                </div>
              </div>
            </div>

          </div>



          <div className="my-2">
            <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12">
              <p className="text-gray-600 mb-8 text-base md:text-lg font-light">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                  JD
                </div>
                <div>
                  <p className="text-gray-900 font-medium">John Doe</p>
                  <p className="text-gray-500 text-sm">CEO, Example Corp</p>
                </div>
              </div>
            </div>

          </div>

          </Slider>


          




          </div>

      </div>
    </section>





    </>
  )
}