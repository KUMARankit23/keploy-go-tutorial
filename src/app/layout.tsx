import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TableOfContents } from "@/components/TableOfContents";
import { MobileToc } from "@/components/MobileToc";
import { BackToTop } from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keploy-go-tutorial-ruby.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Record & Replay API Tests for a Go App with Keploy",
  description:
    "A beginner-friendly, step-by-step tutorial for generating API tests and mocks for a Gin + MongoDB Go service using Keploy's record and test modes.",
  authors: [{ name: "Ankit Kumar", url: "https://github.com/KUMARankit23" }],
  openGraph: {
    title: "Record & Replay API Tests for a Go App with Keploy",
    description:
      "Generate tests and mocks for a Gin + MongoDB service from real traffic, with zero test code.",
    type: "article",
    url: SITE_URL,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Record and replay API tests for a Go app with Keploy" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
              <main id="main" className="min-w-0 py-10 lg:py-14">
                <MobileToc />
                {children}
              </main>
              <aside className="hidden lg:block">
                <TableOfContents />
              </aside>
            </div>
          </div>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
