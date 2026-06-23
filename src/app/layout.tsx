import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
 title: "Dr. Ruchi Jain | Radiaance Dentistry",
 description: "Premium digital business card for Dr. Ruchi Jain at Radiaance Dentistry. Compassionate Care. Trusted Expertise.",
 openGraph: {
 title: "Dr. Ruchi Jain | Radiaance Dentistry",
 description: "Premium digital business card for Dr. Ruchi Jain at Radiaance Dentistry.",
 url: "https://drruchijain.example.com",
 siteName: "Radiaance Dentistry",
 images: [
 {
 url: "/doctor-photo.jpeg",
 width: 800,
 height: 600,
 },
 ],
 locale: "en_IN",
 type: "website",
 },
 themeColor: "#0F766E",
 manifest: "/manifest.json",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" className={`${inter.variable} h-full antialiased`}>
 <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 ">
 {children}
 </body>
 </html>
 );
}
