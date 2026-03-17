import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NAVIOR STUDIOS | Engineered Protection. Elevated Design.",
  description: "Ultra-premium protection and accessories for your daily gear. Engineered for the future of mobile experiences.",
};

import { AuthProvider } from "@/context/AuthContext";
import CartSidebar from "@/components/CartSidebar";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import SearchOverlay from "@/components/SearchOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LoadingScreen />
          <CustomCursor />
          <SearchOverlay />
          {children}
          <CartSidebar />
        </AuthProvider>
      </body>
    </html>
  );
}
