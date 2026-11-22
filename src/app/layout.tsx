import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import { StructuredData } from "@/components/ui/StructuredData";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Dezen Contrast Studio — Architectural Interior Design",
    template: "%s | Dezen Contrast Studio",
  },
  description:
    "Dezen Contrast Studio crafts architectural interiors defined by material tension, spatial balance, and intentional contrast. Plot No. 63, 402, Road No. 5, Ayyappa Society, Madhapur, Hyderabad, Telangana 500081. Contact: Dezencontraststudio@gmail.com | +91 96660 55462 | Instagram: @dezen.contraststudio",
  keywords: [
    "architectural interior design",
    "interior architecture",
    "luxury interiors",
    "spatial design",
    "material contrast",
    "Dezen Contrast Studio",
    "Hyderabad interior design",
    "Madhapur architects",
  ],
  authors: [{ name: "Dezen Contrast Studio" }],
  creator: "Dezen Contrast Studio",
  publisher: "Dezen Contrast Studio",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dezencontraststudio.com",
    siteName: "Dezen Contrast Studio",
    title: "Dezen Contrast Studio — Architectural Interior Design",
    description:
      "Crafting architectural interiors defined by material tension, spatial balance, and intentional contrast. Based in Hyderabad, serving clients globally.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dezen Contrast Studio — Portfolio",
      },
    ],
    emails: ["Dezencontraststudio@gmail.com"],
    phoneNumbers: ["+91 96660 55462"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dezen Contrast Studio",
    description:
      "Architectural interiors defined by material tension and spatial balance. Hyderabad-based studio serving clients globally.",
    images: ["/og-image.jpg"],
    creator: "@dezen.contraststudio",
  },
  verification: {
    google: "google-site-verification-code",
    other: {
      facebook: "META_VERIFICATION_CODE_HERE",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}