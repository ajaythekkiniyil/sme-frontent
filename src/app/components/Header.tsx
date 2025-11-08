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
      <div className="container flex items-center justify-between mx-auto px-6 py-6">
        <div className="flex items-center space-x-20">
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
          <ul className="above-1400 relative flex space-x-8 font-sans text-gray-600 text-lg uppercase font-bold">
            <li>
              <Link
                href="/"
                className={`cursor-pointer ${
                  urlPath === "/" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"
                }`}
              >
                Home
              </Link>
            </li>

            {/* 🧠 Mega Menu Trigger */}
            <li
              className="relative group"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 cursor-pointer ${
                  urlPath === "/smes"
                    ? "text-[#32A2DC]"
                    : "hover:text-[#32A2DC]"
                }`}
              >
                <span>SMEs</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    megaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* 🧠 Mega Menu Content */}
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
                      <Link
                        href="/smes/banking"
                        className="block px-2 py-1 rounded-md hover:bg-gray-50 hover:text-[#32A2DC] cursor-pointer transition"
                      >
                        SME Banking
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/smes/loans"
                        className="block px-2 py-1 rounded-md hover:bg-gray-50 hover:text-[#32A2DC] cursor-pointer transition"
                      >
                        SME Loans
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/smes/tools"
                        className="block px-2 py-1 rounded-md hover:bg-gray-50 hover:text-[#32A2DC] cursor-pointer transition"
                      >
                        Business Tools
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#32A2DC] font-semibold mb-4">
                    Resources
                  </h4>
                  <ul className="space-y-3 text-gray-600">
                    <li>
                      <Link
                        href="/resources/guides"
                        className="block px-2 py-1 rounded-md hover:bg-gray-50 hover:text-[#32A2DC] cursor-pointer transition"
                      >
                        Guides
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/resources/faqs"
                        className="block px-2 py-1 rounded-md hover:bg-gray-50 hover:text-[#32A2DC] cursor-pointer transition"
                      >
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/resources/support"
                        className="block px-2 py-1 rounded-md hover:bg-gray-50 hover:text-[#32A2DC] cursor-pointer transition"
                      >
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
                      <Link
                        href="/register"
                        className="block px-2 py-1 rounded-md hover:bg-gray-50 hover:text-[#32A2DC] cursor-pointer transition"
                      >
                        Open an Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="block px-2 py-1 rounded-md hover:bg-gray-50 hover:text-[#32A2DC] cursor-pointer transition"
                      >
                        Pricing Plans
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/careers"
                className={`cursor-pointer ${
                  urlPath === "/careers"
                    ? "text-[#32A2DC]"
                    : "hover:text-[#32A2DC]"
                }`}
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={`cursor-pointer ${
                  urlPath === "/about-us"
                    ? "text-[#32A2DC]"
                    : "hover:text-[#32A2DC]"
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={`cursor-pointer ${
                  urlPath === "/contact-us"
                    ? "text-[#32A2DC]"
                    : "hover:text-[#32A2DC]"
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Buttons (≥1400px) */}
        <div className="above-1400 items-center space-x-4">
          <button className="cursor-pointer px-8 py-2 bg-[#32A2DC] text-white rounded-full text-lg hover:bg-[#1e86bb] transition">
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
            <li>
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>

            {/* 🧠 Collapsible Mega Menu on Mobile */}
            <li>
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className="flex items-center justify-between w-full text-left cursor-pointer"
              >
                SMEs
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    megaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {megaOpen && (
                <ul className="pl-4 mt-2 space-y-2 text-gray-600">
                  <li>
                    <Link
                      href="/smes/banking"
                      onClick={() => setIsOpen(false)}
                    >
                      SME Banking
                    </Link>
                  </li>
                  <li>
                    <Link href="/smes/loans" onClick={() => setIsOpen(false)}>
                      SME Loans
                    </Link>
                  </li>
                  <li>
                    <Link href="/smes/tools" onClick={() => setIsOpen(false)}>
                      Business Tools
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources/guides"
                      onClick={() => setIsOpen(false)}
                    >
                      Guides
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link href="/careers" onClick={() => setIsOpen(false)}>
                Careers
              </Link>
            </li>
            <li>
              <Link href="/about-us" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="flex flex-col space-y-3 px-6 pb-6">
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
  );
}
