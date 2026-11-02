import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    /* 🚨 suppressHydrationWarning দেওয়া জরুরি যাতে সার্ভার ও ক্লায়েন্টের থিম মিসম্যাচ না করে */
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Toaster position="top-center" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}