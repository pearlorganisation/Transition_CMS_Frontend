import type { ReactNode } from "react";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import Footer from "@/components/Footer";
import TopNav from "@/components/Topbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: "Transition VC",
  description:
    "Transition VC is on a mission to offset 40 million tons of carbon—1% of India’s annual emissions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={`antialiased`}>
        <div className="flex h-full min-h-screen w-full font-arial text-main">
          <div className="w-full">
            <div className="fixed w-full z-50">
              <TopNav />
            </div>
            <main className="w-full z-0 top-0 ">
              {children}
            </main>
            <Footer />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
