"use client"
import Image from "next/image";
import Link from "next/link";
import SmeLogo from '../../../public/sme-logo.svg'
import { useState } from "react";
import { Headphones, Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
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
                <ul className="above-1400 space-x-8 font-sans text-gray-600 text-lg uppercase font-medium">
                    <li><Link href="/" className="text-[#32A2DC] font-normal">Home</Link></li>
                    <li><Link href="/smes" className="hover:text-[#32A2DC]">SMEs</Link></li>
                    {/* <li><Link href="/clients" className="hover:text-[#32A2DC]">Clients</Link></li> */}
                    <li><Link href="/careers" className="hover:text-[#32A2DC]">Careers</Link></li>
                    <li><Link href="/about-us" className="hover:text-[#32A2DC]">About Us</Link></li>
                    <li><Link href="/contact-us" className="hover:text-[#32A2DC]">Contact Us</Link></li>
                </ul>

                {/* Desktop Buttons (≥1400px) */}
                <div className="above-1400 items-center space-x-4">
                    {/* <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-2">
                            <span className="w-4 h-4 text-[#32A2DC]">☎</span>
                        </div>
                        <span>24/7 Support: (234) 109-666</span>
                    </div> */}

                    {/* <Link href="/#contact-us" className="text-center cursor-pointer px-5 py-2 border border-[#32A2DC] text-[#32A2DC] rounded-full text-sm hover:bg-[#32A2DC] hover:text-white transition">
                        Contact Us
                    </Link> */}
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
                        <li><Link href="/" onClick={() => setIsOpen(false)}>How We Help</Link></li>
                        <li><Link href="/smes" onClick={() => setIsOpen(false)}>SMEs</Link></li>
                        <li><Link href="/clients" onClick={() => setIsOpen(false)}>Clients</Link></li>
                        <li><Link href="/careers" onClick={() => setIsOpen(false)}>Careers</Link></li>
                        <li><Link href="/about-us" onClick={() => setIsOpen(false)}>About Us</Link></li>
                        <li><Link href="/#contact-us" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
                    </ul>

                    <div className="flex flex-col space-y-3 px-6 pb-6">
                        <Link href="/#contact-us" className="text-center cursor-pointer px-5 py-2 border border-[#32A2DC] text-[#32A2DC] rounded-full text-sm hover:bg-[#32A2DC] hover:text-white transition">
                            Contact Us
                        </Link>
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
    )
}