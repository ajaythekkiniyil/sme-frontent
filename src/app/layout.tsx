import './globals.css'
import QueryProvider from "./QueryProvider";
import { Inter_Tight } from 'next/font/google'
import type { ReactNode } from 'react'
import Footer from './components/Footer';
import Header from './components/Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={interTight.className}>
        <Header />
        <QueryProvider>
          {children}
        </QueryProvider>
        <Footer />
      </body>
    </html>
  )
}
