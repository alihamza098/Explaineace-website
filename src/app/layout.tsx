import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { siteConfig } from "@/data/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAFAF8",
};

export const metadata: Metadata = {
  title: {
    default: "Screencast & SaaS Explainer Video Service for Software Teams | EXPLAINERACE",
    template: "%s | EXPLAINERACE",
  },
  description:
    "Hire Ali for screencast video production and SaaS explainer videos. Crystal-clear product demos and software walkthroughs from $120/60s. Get a quote today.",
  keywords: [
    "software tutorial video creator",
    "SaaS tutorial video",
    "software walkthrough video",
    "app demo video",
    "mobile app tutorial video",
    "website walkthrough video",
    "software training video",
    "product explainer video",
    "screen recording tutorial",
    "SaaS onboarding video",
    "software demo video",
  ],
  authors: [{ name: "Ali", url: siteConfig.fiverr.profileUrl }],
  creator: "Ali (EXPLAINERACE)",
  publisher: "EXPLAINERACE",
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    title: "EXPLAINERACE | Software Tutorials & SaaS Walkthrough Specialist",
    description: siteConfig.subheadline,
    images: [
      {
        url: "https://img.youtube.com/vi/W6-glP7Ct5o/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "EXPLAINERACE - Software & SaaS Video Specialist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EXPLAINERACE | Software Tutorials & SaaS Walkthroughs",
    description: siteConfig.subheadline,
    images: ["https://img.youtube.com/vi/W6-glP7Ct5o/maxresdefault.jpg"],
  },
  verification: {
    google: "wg_6qxRwz-Q9S7_d3SPwA7j6vmlHrxuZEX8v_fQuBMk",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "EXPLAINERACE",
  "alternateName": "ExplainerAce Software Video Production",
  "description":
    "Professional software tutorial videos, SaaS product walkthroughs, app demos, and training content for software companies, startups, and product teams.",
  "url": siteConfig.siteUrl,
  "image": "https://img.youtube.com/vi/W6-glP7Ct5o/maxresdefault.jpg",
  "telephone": siteConfig.whatsapp.number,
  "email": siteConfig.contactEmail,
  "priceRange": "$$$",
  "founder": {
    "@type": "Person",
    "name": "Ali",
    "jobTitle": "Software Tutorial & SaaS Video Specialist",
    "sameAs": [
      siteConfig.fiverrProfiles[0].url,
      siteConfig.fiverrProfiles[1].url,
      siteConfig.youtube.playlistUrl,
    ],
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software Video Production Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SaaS Walkthrough & Onboarding Videos",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Demo & Gesture Walkthroughs",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Software Feature Tutorials & Documentation Videos",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Flag JS early so scroll-reveal styles never flash hidden content for no-JS/crawlers */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain min-h-screen flex flex-col bg-background text-ink antialiased selection:bg-brand-600 selection:text-white overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 overflow-x-hidden focus:outline-none">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
