import './globals.css'
import { Inter_Tight } from 'next/font/google'
import type { ReactNode } from 'react'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={interTight.className}>
        {children}
      </body>
    </html>
  )
}
