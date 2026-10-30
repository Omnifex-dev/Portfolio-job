import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OceanBackground from "@/components/ocean/OceanBackground";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

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
  themeColor: "#0d72a6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <OceanBackground />
        <Navbar />
        <main className="relative z-10 flex-1 px-4 pb-20 pt-32 sm:pt-36">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
