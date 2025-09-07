"use client"
import Link from 'next/link'
import Slider from "react-slick";
import Image from 'next/image'
import SmeLogo from '../../public/sme-logo.svg'
import SmeBanner from '../../public/sme-banner.jpg'
import SmeBannerTwo from '../../public/sme-banner-02.jpg'
import ServiceGridImage from '../../public/project-one.jpg'
import WhySme from '../../public/why-sme.png'
import {
  Facebook, Github,
  Instagram, Youtube,
  Menu, X,
  Headphones, ChevronLeft,
  ChevronRight, MessageSquare,
  Users, FileCheck
} from "lucide-react";
import BasicEnquiryForm from './components/basicEnquiryForm'
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

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
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const slides = [
    { id: 1, title: "Testing" },
    { id: 2, title: "Consulting" },
    { id: 3, title: "Analysis" },
    { id: 4, title: "Support" },
    { id: 5, title: "Training" },
    { id: 6, title: "Implementation" },
  ];

  return (
    <>
      <nav className="bg-white sticky top-0 z-50">
        <div className="container flex items-center justify-between mx-auto px-6 py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={SmeLogo}
              alt="SME Logo"
              width={180}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation (≥1400px) */}
          <ul className="above-1400 space-x-8 font-sans text-gray-600 text-base">
            <li><Link href="/" className="text-[#32A2DC] font-normal">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#32A2DC]">About Us</Link></li>
            <li><Link href="/services" className="hover:text-[#32A2DC]">How We Help</Link></li>
            <li><Link href="/clients" className="hover:text-[#32A2DC]">Client</Link></li>
            <li><Link href="/smes" className="hover:text-[#32A2DC]">SMEs</Link></li>
            <li><Link href="/careers" className="hover:text-[#32A2DC]">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-[#32A2DC]">Contact Us</Link></li>
          </ul>

          {/* Desktop Buttons (≥1400px) */}
          <div className="above-1400 items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-2">
                <span className="w-4 h-4 text-[#32A2DC]">☎</span>
              </div>
              <span>24/7 Support: (234) 109-666</span>
            </div>

            <button className="cursor-pointer px-5 py-2 border border-[#32A2DC] text-[#32A2DC] rounded-full text-sm hover:bg-[#32A2DC] hover:text-white transition">
              Contact Us
            </button>
            <button className="cursor-pointer px-5 py-2 bg-[#32A2DC] text-white rounded-full text-sm hover:bg-[#1e86bb] transition">
              Login
            </button>
          </div>

          {/* Hamburger Toggle (<1400px) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="below-1400 text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile/Tablet Menu (<1400px) */}
        {isOpen && (
          <div className="below-1400 bg-white border-t border-gray-200 shadow-md">
            <ul className="flex flex-col space-y-4 px-6 py-6 text-gray-700 font-medium">
              <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
              <li><Link href="/services" onClick={() => setIsOpen(false)}>How We Help</Link></li>
              <li><Link href="/clients" onClick={() => setIsOpen(false)}>Client</Link></li>
              <li><Link href="/smes" onClick={() => setIsOpen(false)}>SMEs</Link></li>
              <li><Link href="/careers" onClick={() => setIsOpen(false)}>Careers</Link></li>
              <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
            </ul>

            <div className="flex flex-col space-y-3 px-6 pb-6">
              <button className="cursor-pointer px-5 py-2 border border-[#32A2DC] text-[#32A2DC] rounded-full text-sm hover:bg-[#32A2DC] hover:text-white transition">
                Contact Us
              </button>
              <button className="cursor-pointer px-5 py-2 bg-[#32A2DC] text-white rounded-full text-sm hover:bg-[#1e86bb] transition">
                Login
              </button>
              <div className="flex items-center text-gray-600 text-sm pt-3">
                <Headphones size={16} className="text-black mr-2" />
                <span>24/7 Support: (234) 109-666</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ✅ HERO SLIDER */}
      <Slider {...heroSettings} className='overflow-hidden'>
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
      <section className="bg-[#fff] py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-6 items-center">
          <div className='grid grid-cols-2 items-center mb-15'>
            <div>
              <h2 className="text-left text-2xl sm:text-3xl md:text-4xl font-thin text-gray-900">Ask SMEs<br /> How it Works</h2>
            </div>

            <div>
              <button className="cursor-pointer float-right text-right px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base sm:text-lg hover:bg-[#1e86bb] transition">
                Contact Now
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {/* Step 01 */}
            <div className="border border-gray-300 p-10">
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
            <div className="border border-gray-300 p-10">
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
            <div className="border border-gray-300 p-10">
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
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text & Checklist */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin text-gray-900 mb-4">Why SME on Call</h2>
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
          <div>
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

      <section className="bg-[#F6FAFF] py-16 sm:py-20 lg:pt-25 lg:pb-40">
        <div className="container mx-auto px-6">
          <div className="text-left mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-xl text-sm sm:text-base md:text-lg">
              Lorem ipsum is a dummy or placeholder text commonly used in design.
            </p>
          </div>
        </div>
        <div className="relative">
          <Slider {...serviceSettings}>
            {slides.map((slide) => (
              <div key={slide.id} className="px-3">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image src={ServiceGridImage} alt={slide.title} className="w-full h-full object-cover rounded-2xl" />
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
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Text */}
          <div className="text-left mb-8 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-xl text-sm sm:text-base md:text-lg">
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
            </p>
          </div>
          {/* Right: Form */}
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12">
            <BasicEnquiryForm />
          </div>
        </div>
      </section>

      {/* Featured Experts */}
      <section className="max-w-[1800px] bg-[#F6FAFF] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]">
        <div className="container mx-auto">
          <div className="text-left mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin text-gray-900 mb-2 sm:mb-4">Featured Experts</h2>
            <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">
              Our dedicated members actively participate in our community, sharing expertise, collaborating on projects, and supporting one another.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: "Armor Dao", role: "Co - Founder", img: "/team-1.jpg" },
              { name: "Michelle Garcia", role: "SEO", img: "/team-2.jpg" },
              { name: "Kobie Mainoo", role: "Marketing Manager", img: "/team-3.jpg" },
              { name: "Samantha Nguyen", role: "Compliance Specialist", img: "/team-4.jpg" },
            ].map((expert, i) => (
              <div key={i} className="rounded-2xl p-3 sm:p-4 text-center">
                <div className="w-full h-60 sm:h-64 md:h-72 overflow-hidden rounded-xl mb-4 sm:mb-6 hover:border-2 hover:border-[#32a2dc]">
                  <img src={expert.img} alt={expert.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-xl font-thin text-gray-900 mb-1">{expert.name}</h3>
                <p className="text-sm sm:text-md md:text-md text-gray-500">{expert.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="container mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Contact */}
          <div>
            <Link href="/" className="">
              <Image
                src={SmeLogo}
                alt="SME Logo"
                width={200}
                height={40}
                className="w-70 mb-8"
              />
            </Link>
            <ul className="mt-4 space-y-2 text-md text-gray-600">
              <li>ipsum@gmail.com</li>
              <li>152 Thatcher Road St, Mahattan, NY 10463, United States</li>
              <li>(+068) 568 9696</li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
              >
                X
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-thin text-lg text-gray-900 mb-4">Useful Links</h3>
            <ul className="space-y-3 text-md text-gray-500">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Client</a></li>
              <li><a href="#">SME</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>

          {/* How We Help */}
          <div>
            <h3 className="font-thin text-lg text-gray-900 mb-4">How We Help</h3>
            <ul className="space-y-3 text-md text-gray-500">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Term & Condition</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          {/* Who We Are */}
          <div>
            <h3 className="font-thin text-lg text-gray-900 mb-4">Who We Are</h3>
            <ul className="space-y-3 text-md text-gray-500">
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>© 2025 SMEOnCall All rights reserved.</p>
            <ul className="flex items-center gap-6 mt-4 md:mt-0">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">How We Help</a></li>
              <li><a href="#">Client</a></li>
              <li><a href="#">SME</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}