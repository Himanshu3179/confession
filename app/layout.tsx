
import type { Metadata } from "next";
import { Inter, Lobster, Satisfy, Cabin_Sketch, Permanent_Marker, Kaushan_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Background from "@/components/Background";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
export const lobster = Lobster({ weight: "400", subsets: ["latin"] });
export const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
const cabin = Cabin_Sketch({ weight: "400", subsets: ["latin"] });
export const permanent = Permanent_Marker({ weight: "400", subsets: ["latin"] });
export const kaushan = Kaushan_Script({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Confession",
  description: "Confess Your Heart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/love.png' />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen  max-w-screen overflow-hidden relative ">
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
            <Background />
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
