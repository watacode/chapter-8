"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="flex justify-between items-center bg-gray-800 text-white p-6">
          <Link href="/">
            <h2 className="font-bold text-xl">Blog</h2>
          </Link>
          <Link href="/contact">
            <h2 className="font-bold text-xl">問い合わせ</h2>
          </Link>
        </header>

        {children}
      </body>
    </html>
  );
}
