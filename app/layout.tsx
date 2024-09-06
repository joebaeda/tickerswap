import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContextProvider";

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
  title: "Test Token Sepolia | Ticker Swap", // Change with your own token name
  description: "Test Token Sepolia is more than just a digital asset, it's a story of innovation, community, and trust.", // Change with your own description
  openGraph: {
    title: "Test Token Sepolia | Ticker Swap", // Change with your own token name
    description: "Test Token Sepolia is more than just a digital asset, it's a story of innovation, community, and trust.", // Change with your own description
    url: "https://tickerswap.xyz", // Change with your own domain
    images: [
      {
        url: "https://tickerswap.xyz/og-image.jpg", // Change with your own image (1200px x 630px)
        width: 1200,
        height: 600,
        alt: "Test Token Sepolia", // Change with your own token name
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
    title: "Test Token Sepolia | Ticker Swap", // Change with your own token name
    description: "Test Token Sepolia is more than just a digital asset, it's a story of innovation, community, and trust.", // Change with your own description
    images: ["https://tickerswap.xyz/og-image.jpg"], // Change with your own image (1200px x 630px)
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
