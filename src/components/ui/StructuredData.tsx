"use client";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalFirm",
    "name": "Dezen Contrast Studio",
    "alternateName": "Dezen Contrast",
    "description": "Architectural interior design studio crafting spaces defined by material tension, spatial balance, and intentional contrast.",
    "url": "https://dezencontraststudio.com",
    "logo": "https://dezencontraststudio.com/logo.png",
    "image": "https://dezencontraststudio.com/og-image.jpg",
    "email": "Dezencontraststudio@gmail.com",
    "telephone": "+91-96660-55462",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 63, 402, Road No. 5, Ayyappa Society",
      "addressLocality": "Madhapur",
      "addressRegion": "Telangana",
      "postalCode": "500081",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4435",
      "longitude": "78.3772",
    },
    "sameAs": [
      "https://instagram.com/dezen.contraststudio",
      "https://wa.me/919666055462",
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "17.4435",
        "longitude": "78.3772",
      },
      "geoRadius": "500000",
    },
    "priceRange": "$$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00",
      },
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Interior Design",
            "description": "Full interior architecture for homes, apartments, and villas.",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial & Workplace Design",
            "description": "Office interiors, coworking spaces, and commercial fit-outs.",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hospitality & Retail Design",
            "description": "Hotels, restaurants, cafes, and retail flagship stores.",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Design Consultation",
            "description": "Strategic design advisory, material specification, and design reviews.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}