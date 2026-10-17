import React from "react";

export default function JsonLdSchema() {
  const schemaPayload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://naviorstudios.store/#organization",
        "name": "Navior Studios",
        "url": "https://naviorstudios.store",
        "logo": "https://naviorstudios.store/logo.svg",
        "image": "https://naviorstudios.store/og-brand-cover.png",
        "description":
          "Full-stack enterprise IT solutions agency engineering custom software, native mobile apps, cloud architectures, and production AI integrations.",
        "email": "contact@naviorstudios.store",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mohali",
          "addressRegion": "Punjab",
          "addressCountry": "IN",
        },
        "areaServed": [
          "United States",
          "United Kingdom",
          "European Union",
          "India",
          "Global",
        ],
        "priceRange": "$$$$",
        "knowsAbout": [
          "Cloud Native Architecture",
          "Next.js Full-Stack Engineering",
          "FastAPI Python Microservices",
          "React Native Mobile App Development",
          "PostgreSQL Performance Optimization",
          "Cybersecurity Auditing & Hardening",
          "Enterprise Artificial Intelligence Integration",
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "IT Services & Software Engineering Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Enterprise Software Engineering",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sub-Second Cloud Architecture & Migration",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://naviorstudios.store/#website",
        "url": "https://naviorstudios.store",
        "name": "Navior Studios",
        "publisher": {
          "@id": "https://naviorstudios.store/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
    />
  );
}
