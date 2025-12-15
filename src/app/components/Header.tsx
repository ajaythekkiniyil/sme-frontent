"use client";
import Image from "next/image";
import Link from "next/link";
// Ensure this path is correct
import SmeLogo from "../../../public/sme-logo.svg";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  // --- STATE MANAGEMENT ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  
  // 1. SEPARATE STATES (Fixes the bug)
  const [isDesktopLoginOpen, setIsDesktopLoginOpen] = useState(false);
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false);
  
  const urlPath = usePathname();
  const desktopLoginRef = useRef(null);

  // --- CLICK OUTSIDE LOGIC (Desktop Only) ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (desktopLoginRef.current && !desktopLoginRef.current.contains(event.target)) {
        // Only close the DESKTOP menu
        setIsDesktopLoginOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between container mx-auto px-6 py-6">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image src={SmeLogo} alt="SME Logo" width={160} height={40} priority />
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <ul className="hidden xl:flex space-x-10 font-sans text-gray-600 text-lg uppercase font-semibold">
          
          {/* Home + Mega Menu */}
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
                className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Desktop Mega Menu Content */}
            <div
              className={`absolute left-0 top-full mt-4 bg-white shadow-xl border border-gray-200 rounded-lg p-10 grid grid-cols-3 gap-10 z-50 transition-all duration-300 transform ${
                megaOpen
                  ? "opacity-100 translate-y-0 visible w-[1000px]"
                  : "opacity-0 -translate-y-3 invisible w-[1000px]"
              }`}
            >
              <div>
                <h4 className="text-[#32A2DC] font-semibold mb-4">Solutions</h4>
                <ul className="space-y-3 text-gray-600">
                  <li><Link href="/" className="hover:text-[#32A2DC]">Overview</Link></li>
                  <li><Link href="/compliance" className="hover:text-[#32A2DC]">Compliance</Link></li>
                  <li><Link href="/contact-us" className="hover:text-[#32A2DC]">Contact us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#32A2DC] font-semibold mb-4">Resources</h4>
                <ul className="space-y-3 text-gray-600">
                  <li><Link href="/smes" className="hover:text-[#32A2DC]">SMEs</Link></li>
                  <li><Link href="/careers" className="hover:text-[#32A2DC]">Careers</Link></li>
                  <li><Link href="/about-us" className="hover:text-[#32A2DC]">About us</Link></li>
                </ul>
              </div>
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

          <li><Link href="/smes" className={`cursor-pointer ${urlPath === "/smes" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"}`}>SMEs</Link></li>
          <li><Link href="/careers" className={`cursor-pointer ${urlPath === "/careers" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"}`}>Careers</Link></li>
          <li><Link href="/about-us" className={`cursor-pointer ${urlPath === "/about-us" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"}`}>About Us</Link></li>
          <li><Link href="/contact-us" className={`cursor-pointer ${urlPath === "/contact-us" ? "text-[#32A2DC]" : "hover:text-[#32A2DC]"}`}>Contact Us</Link></li>
        </ul>

        {/* ================= DESKTOP LOGIN ================= */}
        {/* We use 'isDesktopLoginOpen' here */}
        {/* ================= DESKTOP LOGIN (HOVER VERSION) ================= */}
        <div className="hidden xl:flex items-center space-x-4">
          {/* 1. We put onMouseEnter/Leave on the PARENT div. 
             This ensures the menu stays open when you move your mouse from the button to the links.
          */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsDesktopLoginOpen(true)}
            onMouseLeave={() => setIsDesktopLoginOpen(false)}
          >
            <button 
              className={`cursor-pointer px-8 py-2 text-white rounded-full text-lg hover:bg-[#1e86bb] transition flex items-center gap-2 ${isDesktopLoginOpen ? 'bg-[#1e86bb]' : 'bg-[#32A2DC]'}`}
            >
              Login
              <ChevronDown size={16} className={`transition-transform duration-300 ${isDesktopLoginOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {/* 'pt-4' adds a safe "invisible bridge" so the mouse doesn't lose focus */}
            <div className={`absolute right-0 top-full pt-2 w-48 transition-all duration-200 ease-out z-50 ${isDesktopLoginOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-2'}`}>
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-left">
                <Link href="/sme/login" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#32A2DC] transition-colors border-b border-gray-100">SMEs</Link>
                <Link href="/user/login" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#32A2DC] transition-colors border-b border-gray-100">Clients</Link>
                <Link href="/admin/login" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#32A2DC] transition-colors">Admin</Link>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden text-gray-700">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 shadow-md h-[calc(100vh-80px)] overflow-y-auto">
          <ul className="flex flex-col space-y-6 px-6 py-6 text-gray-700 font-medium">

            {/* Mobile Home Mega Menu */}
            <li>
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className="flex items-center justify-between w-full cursor-pointer hover:text-[#32A2DC]"
              >
                Home
                <ChevronDown size={18} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>
              {megaOpen && (
                <div className="pl-4 mt-3 space-y-6 border-l-2 border-gray-100 ml-1">
                  <div>
                    <h5 className="text-[#32A2DC] font-semibold text-sm mb-2 uppercase tracking-wide">Solutions</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                       <li><Link href="/" className="block py-1">Overview</Link></li>
                       <li><Link href="/compliance" className="block py-1">Compliance</Link></li>
                       <li><Link href="/contact-us" className="block py-1">Contact us</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[#32A2DC] font-semibold text-sm mb-2 uppercase tracking-wide">Resources</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                       <li><Link href="/smes" className="block py-1">SMEs</Link></li>
                       <li><Link href="/careers" className="block py-1">Careers</Link></li>
                       <li><Link href="/about-us" className="block py-1">About us</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[#32A2DC] font-semibold text-sm mb-2 uppercase tracking-wide">How We Help</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                       <li><Link href="/privacy-policy" className="block py-1">Privacy Policy</Link></li>
                       <li><Link href="/terms-and-condition" className="block py-1">Term & Condition</Link></li>
                       <li><Link href="/faq" className="block py-1">FAQs</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            <li><Link href="/smes" className="block hover:text-[#32A2DC]">SMEs</Link></li>
            <li><Link href="/careers" className="block hover:text-[#32A2DC]">Careers</Link></li>
            <li><Link href="/about-us" className="block hover:text-[#32A2DC]">About Us</Link></li>
            <li><Link href="/contact-us" className="block hover:text-[#32A2DC]">Contact Us</Link></li>
          </ul>

          {/* ================= MOBILE LOGIN ================= */}
          {/* We use 'isMobileLoginOpen' here so it doesn't conflict with Desktop */}
          <div className="px-6 pb-10">
            <div className="relative">
              <button 
                onClick={() => setIsMobileLoginOpen(!isMobileLoginOpen)}
                className={`w-full px-5 py-2 text-white rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${isMobileLoginOpen ? 'bg-[#1e86bb]' : 'bg-[#32A2DC]'}`}
              >
                Login
                <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileLoginOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileLoginOpen ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="bg-gray-50 rounded-xl border border-gray-100">
                  <Link href="/sme/login" className="block px-4 py-3 text-center text-gray-600 hover:text-[#32A2DC] border-b border-gray-200">SMEs</Link>
                  <Link href="/user/login" className="block px-4 py-3 text-center text-gray-600 hover:text-[#32A2DC] border-b border-gray-200">Clients</Link>
                  <Link href="/admin/login" className="block px-4 py-3 text-center text-gray-600 hover:text-[#32A2DC]">Admin</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </nav>
  );
}