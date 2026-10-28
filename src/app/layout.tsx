import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TableOfContents } from "@/components/TableOfContents";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Record & Replay API Tests for a Go App with Keploy",
  description:
    "A beginner-friendly, step-by-step tutorial for generating API tests and mocks for a Gin + MongoDB Go service using Keploy's record and test modes.",
  openGraph: {
    title: "Record & Replay API Tests for a Go App with Keploy",
    description:
      "Generate tests and mocks for a Gin + MongoDB service from real traffic, with zero test code.",
    type: "article",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
              <main className="min-w-0 py-10 lg:py-14">{children}</main>
              <aside className="hidden lg:block">
                <TableOfContents />
              </aside>
            </div>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
