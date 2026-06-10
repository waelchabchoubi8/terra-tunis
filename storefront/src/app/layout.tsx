import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getShopProducts } from "@/lib/catalogue";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Terra Tunis — Authentic Tunisian goods, delivered to Sweden",
    template: "%s · Terra Tunis",
  },
  description:
    "A curated marketplace of artisan Tunisian brands — cold-pressed olive oil, raw honey, heirloom spices and fine pastries. Sourced with care, shipped to Sweden.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the catalogue once (Medusa, or mock fallback) and hand it to the
  // client providers so every component reads from the same source.
  const products = await getShopProducts();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <Providers products={products}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
