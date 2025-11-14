"use client";
import Image from "next/image";
import Link from "next/link";
import SmeLogo from "../../../public/sme-logo.svg";
import { useState } from "react";
import { Headphones, Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const urlPath = usePathname();

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
  <div className="flex items-center justify-between container mx-auto px-6 py-6">

    {/* LOGO */}
    <Link href="/" className="flex items-center">
      <Image src={SmeLogo} alt="SME Logo" width={160} height={40} priority />
    </Link>

    {/* DESKTOP MENU */}
    <ul className="hidden xl:flex space-x-10 font-sans text-gray-600 text-lg uppercase font-semibold">

      {/* ================= HOME + MEGA MENU ================= */}
      <li
        className="relative group"
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <button
          className={`flex items-center space-x-1 cursor-pointer ${
            urlPath === "/" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"
          }`}
        >
          <span>Home</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              megaOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* ---------- MEGA MENU CONTENT ---------- */}
        <div
          className={`absolute left-0 top-full mt-4 bg-white shadow-xl border border-gray-200 rounded-lg p-10 grid grid-cols-3 gap-10 z-50 transition-all duration-300 transform ${
            megaOpen
              ? "opacity-100 translate-y-0 visible w-[1000px]"
              : "opacity-0 -translate-y-3 invisible w-[1000px]"
          }`}
        >

          {/* COLUMN 1 : SOLUTIONS */}
          <div>
            <h4 className="text-[#32A2DC] font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/" className="hover:text-[#32A2DC]">Overview</Link></li>
              <li><Link href="/compliance" className="hover:text-[#32A2DC]">Compliance</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#32A2DC]">Contact us</Link></li>
            </ul>
          </div>

          {/* COLUMN 2 : RESOURCES */}
          <div>
            <h4 className="text-[#32A2DC] font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/smes" className="hover:text-[#32A2DC]">SMEs</Link></li>
              <li><Link href="/careers" className="hover:text-[#32A2DC]">Careers</Link></li>
              <li><Link href="/about-us" className="hover:text-[#32A2DC]">About us</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 : HOW WE HELP */}
          <div>
            <h4 className="text-[#32A2DC] font-semibold mb-4">How We Help</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/privacy-policy" className="hover:text-[#32A2DC]">Privacy Policy</Link></li>
              <li><Link href="/terms-and-condition" className="hover:text-[#32A2DC]">Term & Condition</Link></li>
              <li><Link href="/faq" className="hover:text-[#32A2DC]">FAQs</Link></li>
            </ul>
          </div>

        </div>
      </li>

      {/* OTHER TOP-LEVEL LINKS */}
      <li>
        <Link
          href="/smes"
          className={`cursor-pointer ${urlPath === "/smes" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"}`}
        >
          SMEs
        </Link>
      </li>

      <li>
        <Link
          href="/careers"
          className={`cursor-pointer ${urlPath === "/careers" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"}`}
        >
          Careers
        </Link>
      </li>

      <li>
        <Link
          href="/about-us"
          className={`cursor-pointer ${urlPath === "/about-us" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"}`}
        >
          About Us
        </Link>
      </li>

      <li>
        <Link
          href="/contact-us"
          className={`cursor-pointer ${urlPath === "/contact-us" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"}`}
        >
          Contact Us
        </Link>
      </li>
    </ul>

    {/* DESKTOP LOGIN */}
    <div className="hidden xl:flex items-center space-x-4">
      <button className="cursor-pointer px-8 py-2 bg-[#32A2DC] text-white rounded-full text-lg hover:bg-[#1e86bb] transition">
        Login
      </button>
    </div>

    {/* MOBILE MENU BUTTON */}
    <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-gray-700">
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  </div>

  {/* ================= MOBILE MENU ================= */}
  {isOpen && (
    <div className="xl:hidden bg-white border-t border-gray-200 shadow-md">
      <ul className="flex flex-col space-y-6 px-6 py-6 text-gray-700 font-medium">

        {/* ======= HOME COLLAPSIBLE ======= */}
        <li>
          <button
            onClick={() => setMegaOpen(!megaOpen)}
            className="flex items-center justify-between w-full cursor-pointer"
          >
            Home
            <ChevronDown
              size={18}
              className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
            />
          </button>

          {megaOpen && (
            <ul className="pl-4 mt-3 space-y-4">

              {/* Solutions */}
              <li className="font-semibold text-gray-800">Solutions</li>
              <ul className="pl-4 space-y-2">
                <li><Link href="/">Overview</Link></li>
                <li><Link href="/compliance">Compliance</Link></li>
                <li><Link href="/contact-us">Contact us</Link></li>
              </ul>

              {/* Resources */}
              <li className="font-semibold text-gray-800 pt-3">Resources</li>
              <ul className="pl-4 space-y-2">
                <li><Link href="/smes">SMEs</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/about-us">About us</Link></li>
              </ul>

              {/* How We Help */}
              <li className="font-semibold text-gray-800 pt-3">How We Help</li>
              <ul className="pl-4 space-y-2">
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-and-condition">Term & Condition</Link></li>
                <li><Link href="/faq">FAQs</Link></li>
              </ul>

            </ul>
          )}
        </li>

        {/* OTHER MOBILE LINKS */}
        <li><Link href="/smes">SMEs</Link></li>
        <li><Link href="/careers">Careers</Link></li>
        <li><Link href="/about-us">About Us</Link></li>
        <li><Link href="/contact-us">Contact Us</Link></li>
      </ul>

      {/* MOBILE LOGIN BUTTON */}
      <div className="px-6 pb-6">
        <button className="w-full px-5 py-2 bg-[#32A2DC] text-white rounded-full">
          Login
        </button>
      </div>
    </div>
  )}
</nav>



  );
}
