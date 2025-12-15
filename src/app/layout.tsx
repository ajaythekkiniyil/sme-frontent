"use client"
import './globals.css'
import QueryProvider from "./QueryProvider";
import { Source_Sans_3 } from 'next/font/google';
import type { ReactNode } from 'react'
import Footer from './components/Footer';
import Header from './components/Header';
import { usePathname } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 1. Configure the font and assign it a CSS variable
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans', // <--- This is the key CSS variable name
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.includes("dashboard") || pathname.includes("login");

  return (
    <html lang="en" className={sourceSans.variable}>
      <body className={`${sourceSans.variable} font-sans`}>
        {!hideLayout && <Header />}
        <QueryProvider>
          {children}
        </QueryProvider>
        {!hideLayout && <Footer />}
      </body>
    </html>
  )
}
