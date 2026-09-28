import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "HOTSPOT | Indian Restaurant & Online Food Ordering",
  description:
    "Order delicious biryani, starters, curries, tandoori and more from HOTSPOT. Explore our menu and place your order online.",
  metadataBase: new URL("https://hotspot.demo"),
  openGraph: {
    title: "HOTSPOT | Indian Restaurant & Online Food Ordering",
    description:
      "Order delicious biryani, starters, curries, tandoori and more from HOTSPOT.",
    type: "website",
    siteName: "HOTSPOT",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOTSPOT | Indian Restaurant & Online Food Ordering",
    description: "Order delicious biryani, starters, curries, tandoori and more.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "HOTSPOT",
    servesCuisine: "Indian",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Road",
      addressLocality: "Vijayawada",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    telephone: "+91 98765 43210",
  };
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
