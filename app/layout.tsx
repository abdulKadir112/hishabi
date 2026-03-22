import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import InstallPWA from "../app/components/InstallPWA";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "প্রবাসী ফান্ড",
  description: "Hishabi PWA App",

  manifest: "../public/manifest.json",
  themeColor: "#000000",

  icons: {
    apple: "../public/app logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta */}
        <link rel="icon" href="../public/app logo.png" />
        <meta name="theme-color" content="#000000" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <InstallPWA />
      </body>
    </html>
  );
}