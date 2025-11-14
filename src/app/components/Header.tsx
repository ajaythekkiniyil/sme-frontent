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
  <div className="flex items-center justify-between max-w-[1400px] mx-auto px-6 py-6">
    {/* --- LOGO --- */}
    <Link href="/" className="flex items-center">
      <Image
        src={SmeLogo}
        alt="SME Logo"
        width={160}
        height={40}
        priority
      />
    </Link>

    {/* --- DESKTOP NAVIGATION --- */}
    <ul className="hidden xl:flex space-x-10 font-sans text-gray-600 text-lg uppercase font-semibold">

      {/* --- HOME WITH MEGA MENU --- */}
      <li
        className="relative group"
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <button
          className={`flex items-center space-x-1 cursor-pointer ${
            urlPath === "/"
              ? "text-[#32A2DC]"
              : "hover:text-[#32A2DC]"
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

        {/* Mega Menu Content UNDER HOME */}
        <div
          className={`absolute left-0 top-full mt-4 bg-white shadow-xl border border-gray-200 rounded-lg p-10 grid grid-cols-3 gap-10 z-50 transition-all duration-300 ease-out transform ${
            megaOpen
              ? "opacity-100 translate-y-0 visible w-[1000px]"
              : "opacity-0 -translate-y-3 invisible w-[1000px]"
          }`}
        >
          <div>
            <h4 className="text-[#32A2DC] font-semibold mb-4">
              Solutions
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="/" className="block hover:text-[#32A2DC]">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="block hover:text-[#32A2DC]">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/smes/tools" className="block hover:text-[#32A2DC]">
                  Business Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#32A2DC] font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="/resources/guides" className="block hover:text-[#32A2DC]">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/faqs" className="block hover:text-[#32A2DC]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/resources/support" className="block hover:text-[#32A2DC]">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#32A2DC] font-semibold mb-4">
              Get Started
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="/register" className="block hover:text-[#32A2DC]">
                  Open an Account
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="block hover:text-[#32A2DC]">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </li>

      {/* --- SMEs AS A SIMPLE LINK (no submenu now) --- */}
      <li>
        <Link
          href="/smes"
          className={`cursor-pointer ${
            urlPath === "/smes" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"
          }`}
        >
          SMEs
        </Link>
      </li>

      <li>
        <Link
          href="/careers"
          className={`cursor-pointer ${
            urlPath === "/careers" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"
          }`}
        >
          Careers
        </Link>
      </li>

      <li>
        <Link
          href="/about-us"
          className={`cursor-pointer ${
            urlPath === "/about-us" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"
          }`}
        >
          About Us
        </Link>
      </li>

      <li>
        <Link
          href="/contact-us"
          className={`cursor-pointer ${
            urlPath === "/contact-us" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"
          }`}
        >
          Contact Us
        </Link>
      </li>
    </ul>

    {/* --- LOGIN BUTTON (Desktop) --- */}
    <div className="hidden xl:flex items-center space-x-4">
      <button className="cursor-pointer px-8 py-2 bg-[#32A2DC] text-white rounded-full text-lg hover:bg-[#1e86bb] transition">
        Login
      </button>
    </div>

    {/* --- MOBILE HAMBURGER --- */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="xl:hidden text-gray-700"
    >
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  </div>

  {/* --- MOBILE MENU --- */}
  {isOpen && (
    <div className="xl:hidden bg-white border-t border-gray-200 shadow-md">
      <ul className="flex flex-col space-y-4 px-6 py-6 text-gray-700 font-medium">

        {/* --- HOME with collapsible submenu --- */}
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
            <ul className="pl-4 mt-3 space-y-2">
              <li><Link href="/smes/banking">SME Banking</Link></li>
              <li><Link href="/smes/loans">SME Loans</Link></li>
              <li><Link href="/smes/tools">Business Tools</Link></li>
              <li><Link href="/resources/guides">Guides</Link></li>
            </ul>
          )}
        </li>

        {/* SMEs now simple link */}
        <li>
          <Link href="/smes">SMEs</Link>
        </li>

        <li><Link href="/careers">Careers</Link></li>
        <li><Link href="/about-us">About Us</Link></li>
        <li><Link href="/contact-us">Contact Us</Link></li>
      </ul>

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
