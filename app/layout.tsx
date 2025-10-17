import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppMaster - Ultimate App Installer",
  description:
    "Install all your favorite Windows applications with one click. Generate automated installation scripts for browsers, development tools, media players, and more.",
  keywords: [
    "app installer",
    "windows apps",
    "winget",
    "chocolatey",
    "batch installer",
    "software installation",
  ],
  authors: [{ name: "AppMaster" }],
  creator: "AppMaster",
  publisher: "AppMaster",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://appmaster.app",
    title: "AppMaster - Ultimate App Installer",
    description:
      "Install all your favorite Windows applications with one click",
    siteName: "AppMaster",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AppMaster - Ultimate App Installer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AppMaster - Ultimate App Installer",
    description:
      "Install all your favorite Windows applications with one click",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
