import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WalletProvider } from "@/context/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ticker Swap | Story of Innovation",
  description: "Each Token on the Ticker Swap ecosystem is more than just a digital asset, it's a story of innovation, community, and trust.",
  openGraph: {
    title: "Ticker Swap | Story of Innovation",
    description: "Each Token on the Ticker Swap ecosystem is more than just a digital asset, it's a story of innovation, community, and trust.",
    url: "https://tickerswap.xyz",
    images: [
      {
        url: "https://tickerswap.xyz/og-image.jpg",
        width: 1200,
        height: 600,
        alt: "Ticker Swap",
      },
    ],
    videos: [{
      url: "https://tickerswap.xyz/video/survival.mp4",
      width: 1200,
      height: 600,
    },
    ],
    audio: ["https://tickerswap.xyz/audio/thankyou.mp3"],
    siteName: 'Ticker Swap',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ticker Swap | Story of Innovation",
    description: "Each Token on the Ticker Swap ecosystem is more than just a digital asset, it's a story of innovation, community, and trust.",
    images: ["https://tickerswap.xyz/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: "/favicon.ico"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
