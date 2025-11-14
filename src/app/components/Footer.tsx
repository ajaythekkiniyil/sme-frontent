import Image from "next/image";
import SmeLogo from '../../../public/sme-logo.svg'
import Link from "next/link";
import { Facebook, Github, Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
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
                        <li>info@smeoncall.co</li>
                        <li>152 Thatcher Road St, Mahattan, NY 10463, United States</li>
                        <li>(+068) 568 9696</li>
                    </ul>

                    {/* Social Links */}
                    <div className="flex items-center gap-3 mt-6">
                        <Link
                            href="#"
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
                        >
                            X
                        </Link>
                        <Link
                            href="#"
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
                        >
                            <Facebook size={18} />
                        </Link>
                        <Link
                            href="#"
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
                        >
                            <Github size={18} />
                        </Link>
                        <Link
                            href="#"
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
                        >
                            <Instagram size={18} />
                        </Link>
                        <Link
                            href="#"
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600"
                        >
                            <Youtube size={18} />
                        </Link>
                    </div>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="font-thin text-lg text-gray-900 mb-4">Useful Links</h3>
                    <ul className="space-y-3 text-md text-gray-500">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/smes">SMEs</Link></li>
                        {/* <li><Link href="/clients">Clients</Link></li> */}
                        <li><Link href="/careers">Careers</Link></li>
                        <li><Link href="/about-us">About us</Link></li>
                        <li><Link href="/contact-us">Contact us</Link></li>
                        <li><Link href="/compliance">Compliance</Link></li>
                    </ul>
                </div>

                {/* How We Help */}
                <div>
                    <h3 className="font-thin text-lg text-gray-900 mb-4">How We Help</h3>
                    <ul className="space-y-3 text-md text-gray-500">
                        <li><Link href="/help-center">Help Center</Link></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link href="/terms-and-condition">Term & Condition</Link></li>
                        <li><Link href="/faq">FAQs</Link></li>
                    </ul>
                </div>

                {/* Who We Are */}
                <div>
                    <h3 className="font-thin text-lg text-gray-900 mb-4">Who We Are</h3>
                    <ul className="space-y-3 text-md text-gray-500">
                        <li><Link href="/careers">Careers</Link></li>
                        <li><Link href="/contact-us">Contact us</Link></li>
                        <li><Link href="/about-us">About us</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 py-6">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <p>© 2025 SMEOnCall All rights reserved.</p>
                    <ul className="flex items-center gap-6 mt-4 md:mt-0">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about-us">About</Link></li>
                        <li><Link href="/services">How We Help</Link></li>
                        <li><Link href="/clients">Clients</Link></li>
                        <li><Link href="/smes">SME</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}