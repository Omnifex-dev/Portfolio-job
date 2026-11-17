import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ParallaxBackdrop from "@/components/ParallaxBackdrop";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <ParallaxBackdrop />
        <Cursor />
        <Navbar />
        <main className="relative z-10 flex-1 pb-24 pt-32 sm:pt-40">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
