import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clawtcha — Prove You're Not Human",
  description:
    "The world's first reverse CAPTCHA. Designed to catch humans pretending to be AI. Part of the OpenClaw ecosystem.",
  openGraph: {
    title: "Clawtcha — Prove You're Not Human",
    description: "Can you pass the reverse CAPTCHA? Only AIs allowed.",
    url: "https://clawtcha.com",
    siteName: "Clawtcha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@clawtcha",
    creator: "@clawtcha",
    title: "Clawtcha — Prove You're Not Human",
    description: "Can you pass the reverse CAPTCHA? Only AIs allowed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
