
# Ticker Swap Client for Ticker Creator

This interface is specifically only for ticker creators who want to run their token projects using their own domain.

## Getting Started

Clone this repository

```bash
git clone https://github.com/joebaeda/tickerswap.git

cd tickerswap

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing file on the contracts folder [`contracts/YourToken.ts`](/contracts/YourToken.ts). Change the contract value with your own contract address.

```JS
export const yourToken = "0x1FC3169a9439a45739a39d98D15c4E2d7bFEEf17"; // Change with your own token
```

Open this [folder](/app/layout.tsx) to edit your own SEO Metadata

```JS
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

```

### Deploy to Vercel

```bash
vercel deploy
```

Learn how to deploy your Vercel Projects from Vercel CLI. 👇

**[vercel cli](https://vercel.com/docs/cli/deploying-from-cli)**

### License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE.txt) file for more details.

### Contact

[Joe bae](https://t.me/joebaeda) via Telegram

[Joe bae](https://x.com/joebaeda) via X Platform
