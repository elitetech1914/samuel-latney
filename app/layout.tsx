import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { pageMetadata } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: [
    {
      path: "../public/fonts/cormorant-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/cormorant-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({
  src: [
    {
      path: "../public/fonts/inter-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata(
    "Samuel Latney | Author of Paired by Providence",
    "Discover Samuel Latney, author of Paired by Providence, a relationship-driven novel about love, family, race, loyalty, career, faith, and unexpected change.",
    "/",
  ),
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Samuel Latney | Author of Paired by Providence",
    template: "%s | Samuel Latney",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Newsletter />
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Samuel Latney",
              jobTitle: "Author",
              ...(process.env.NEXT_PUBLIC_SITE_URL
                ? { url: process.env.NEXT_PUBLIC_SITE_URL }
                : {}),
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
