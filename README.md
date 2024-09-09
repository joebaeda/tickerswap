
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
export const yourToken = "0x4b18F45F5d019cF61cb9f001e8FEEa63cac22Ee0"; // Replace with your own token address
export const yourTokenChainId = 11155111; // Replace with the chainId (number) where your Token is deployed.
export const yourTokenChainHex = "0xaa36a7"; // Replace with the chainId (hex) where your Token is deployed.
export const chainCurrencySymbol = "ETH" // Replace with Currency Symbol of Network where your Token is deployed.
```

Below is a list of networks and chainIds that support the Ticker Swap project:

|Network Name|ChainId (Number)|ChainId (Hex)|Currency Symbol|
|------------|----------------|-------------|---------------|
|Mainnet     |1               |0x1          |ETH            |
|Base Mainnet|8453            |0x2105       |ETH            |
|BNB Mainnet |56              |0x38         |BNB            |
|Sepolia     |11155111        |0xaa36a7     |ETH            |
|Base Testnet|84532           |0x14a34      |ETH            |
|BNB Testnet |97              |0x61         |BNB            |


### SEO Metadata

Open this [folder](/app/layout.tsx) to edit your own SEO Metadata

```JS
export const metadata: Metadata = {
  title: "Ticker Token | Ticker Swap", // Replace with your own token name
  description: "Ticker Token is more than just a digital asset, it's a story of innovation, community, and trust.", // Replace with your own description
  openGraph: {
    title: "Ticker Token | Ticker Swap", // Replace with your own token name
    description: "Ticker Token is more than just a digital asset, it's a story of innovation, community, and trust.", // Replace with your own description
    url: "https://tickerswap.xyz", // Replace with your own domain
    images: [
      {
        url: "https://tickerswap.xyz/og-image.jpg", // Replace with your own image (1200px x 630px)
        width: 1200,
        height: 600,
        alt: "Ticker Token", // Replace with your own token name
      },
    ],
    siteName: 'Ticker Swap',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ticker Token | Ticker Swap", // Replace with your own token name
    description: "Ticker Token is more than just a digital asset, it's a story of innovation, community, and trust.", // Replace with your own description
    images: ["https://tickerswap.xyz/og-image.jpg"], // Replace with your own image (1200px x 630px)
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
