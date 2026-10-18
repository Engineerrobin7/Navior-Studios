import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import JsonLdSchema from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F0F11",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteConfig = {
  name: "Navior Studios",
  domain: "naviorstudios.store",
  url: "https://naviorstudios.store",
  description:
    "Navior Studios is a full-service technology agency engineering custom software, native iOS/Android mobile apps, Next.js web applications, and multi-tenant cloud SaaS systems.",
  ogImage: "https://naviorstudios.store/og-brand-cover.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Enterprise Cloud Architecture & Custom Software Engine`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Custom Enterprise Software",
    "Cloud Architecture Services",
    "Next.js Modernization Agency",
    "FastAPI Microservices Development",
    "React Native Mobile App Engineering",
    "Enterprise AI Integration Company",
    "Navior Studios",
  ],
  authors: [{ name: "Navior Studios Architecture Board", url: siteConfig.url }],
  creator: "Navior Studios Enterprise Division",
  publisher: "Navior Studios LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | High-Performance IT Solutions & Digital Services`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Navior Studios Tech-Noir Enterprise Infrastructure Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Enterprise Engineering Agency`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@NaviorStudios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <JsonLdSchema />
      </head>
      <body className="bg-[#090d16] text-[#f8fafc] antialiased min-h-screen selection:bg-blue-500/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
