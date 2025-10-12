import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "./components/Navbar";
import { Toaster } from "sonner";
import { auth } from "./_lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Finance",
  description: "Financial Budget Planner and Observer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-gray-900 min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto w-full">{children}</main>
          <Toaster position="top-right" expand={false} richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
