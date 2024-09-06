import {
    ethReserveAmount,
    tickerContract,
    tokenBalance,
    tokenNames,
    tokenPriceInETH,
    tokenReserveAmount,
    tokenSymbols,
    totalTokenSupply
} from '@/lib/token';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

interface DiscoverProps {
    tokenAddress: string;
}

const Discover: React.FC<DiscoverProps> = ({ tokenAddress }) => {
    const [currentPrice, setCurrentPrice] = useState<string>('');
    const [marketCap, setMarketCap] = useState<string>('');
    const [volume, setVolume] = useState<string>('');
    const [totalSupply, setTotalSupply] = useState<string>('');
    const [holders, setHolders] = useState<number>(0);
    const [ethReserve, setEthReserve] = useState<string>('');
    const [tokenReserve, setTokenReserve] = useState<string>('');
    const [tokenName, setTokenName] = useState<string>('');
    const [tokenSymbol, setTokenSymbol] = useState<string>('');

    useEffect(() => {
        const fetchContractData = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = tickerContract(tokenAddress);

            try {
                const tName = await tokenNames(tokenAddress);
                const tSymbol = await tokenSymbols(tokenAddress);
                const supply = await totalTokenSupply(tokenAddress);
                const ethReserve = await ethReserveAmount(tokenAddress);
                const tokenReserve = await tokenReserveAmount(tokenAddress);
                const price = await tokenPriceInETH(tokenAddress);

                setCurrentPrice(ethers.formatEther(price));
                setTokenName(tName);
                setTokenSymbol(tSymbol);
                setEthReserve(ethers.formatEther(ethReserve));
                setTokenReserve(ethers.formatUnits(tokenReserve, 18));
                setTotalSupply(ethers.formatUnits(supply, 18));

                // Calculate Market Cap
                const marketCap = Number(ethers.formatUnits(supply, 18)) * Number(ethers.formatEther(price));
                setMarketCap(marketCap.toString());

                // Fetch Volume (last 24 hours)
                const currentBlock = await provider.getBlockNumber();
                const blocksPerDay = 24 * 60 * 4; // approx for Ethereum
                const fromBlock = currentBlock - blocksPerDay;
                const transferEvents = await contract.queryFilter(contract.filters.Transfer(null, null), fromBlock, currentBlock);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const volumeWei = transferEvents.reduce((total: any, event: any) => total + Number(ethers.formatUnits(event.args?.value, 18)), 0);
                const volumeETH = volumeWei * Number(ethers.formatEther(price));

                // Set the 24 hours volume
                setVolume(volumeETH.toString());

                // Fetch token holders
                // Query all Transfer events from the genesis block to the current block
                const filterTokenHolder = await contract.queryFilter(
                    contract.filters.Transfer(),
                    0,  // Start from block 0 (the genesis block)
                    currentBlock
                );

                // Use a Set to store unique token holder addresses
                const holders = new Set<string>();

                // Iterate over all Transfer events
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                filterTokenHolder.forEach((event: any) => {
                    const { from, to } = event.args!;

                    // Exclude the zero address as it represents burning or minting tokens
                    if (from !== ethers.ZeroAddress) {
                        holders.add(from);  // Add sender to the holders set
                    }
                    if (to !== ethers.ZeroAddress) {
                        holders.add(to);  // Add receiver to the holders set
                    }
                });

                // Filter holders who still have a positive balance
                const realHolders = new Set<string>();

                for (const address of Array.from(holders)) {
                    const balance = await tokenBalance(tokenAddress, address);
                    if (balance > BigInt(0)) {
                        realHolders.add(address);
                    }
                }

                setHolders(holders.size)

            } catch (error) {
                console.error('Failed to fetch contract data:', error);
            }
        };

        fetchContractData();
    }, [tokenAddress]);


    return (
        <div className="overflow-y-auto max-h-80 p-4 shadow-lg max-w-lg w-full rounded-2xl border bg-gray-100 border-gray-200 font-mono custom-scroll">
            <div className="text-gray-700">
                <div className="mb-6">
                    <h2 className="text-xl text-lime-600 font-bold my-4">Discover the {tokenName} &#40;{tokenSymbol}&#41;</h2>
                    <p className="mb-4">
                        In the vast universe of decentralized finance&#44; a star shines brightly—{tokenName}&#46; Born from the Ethereum blockchain&#44; this ERC-20 token has not only captivated investors but also carved a niche in the ever-evolving landscape of Automated Market Makers &#40;AMMs&#41;.
                    </p>

                    <h3 className="text-lg text-lime-600 font-semibold mb-3">The Journey of {tokenName} &#40;{tokenSymbol}&#41;</h3>
                    <p className="mb-4">
                        {tokenName} isn&#39;t just another digital asset&#44; it&#39;s a beacon of innovation&#44; With its built-in AMM&#44; {tokenName} seamlessly facilitates the determination of prices between itself and ETH&#44; ensuring fair and transparent trading for all participants&#46;
                    </p>
                    <p className="mb-4">As of now&#44; each {tokenName} is valued at {currentPrice} ETH&#46; This price&#44; ever-fluid&#44; reflects the dynamic nature of the market&#44; influenced by the forces of supply&#44; demand&#44; and trading volume&#46;</p>

                    <p className="mb-4">The Marketcap or total value of all {tokenName} combined has reached a staggering {marketCap} ETH&#46; This figure isn&#39;t just a number&#44; it represents the collective trust and belief that investors have placed in {tokenName}&#46;</p>

                    <p className="mb-4">Over the last 24 hours&#44; {volume} ETH worth of {tokenName} has exchanged hands&#46; This volume showcases the token&#39;s liquidity and the vibrancy of its trading community&#46;</p>

                    <h3 className="text-lg text-lime-600 font-semibold mb-3">A Glimpse at the Supply</h3>
                    <p className="mb-4">
                        {tokenName}&#39;s total supply is a key pillar of its value proposition&#46; With a finite number of tokens available&#44; scarcity plays a significant role in driving its price&#46;
                    </p>
                    <p className="mb-4">There are {totalSupply} {tokenSymbol} tokens in existence&#46; Each token represents a fraction of the {tokenName} ecosystem&#44; contributing to its market presence&#46;</p>

                    <h3 className="text-lg text-lime-600 font-semibold mb-3">The Community Behind {tokenName} &#40;{tokenSymbol}&#41;</h3>
                    <p className="mb-4">Over {holders} unique addresses hold {tokenName} &#40;{tokenSymbol}&#41;&#44; each contributing to the token&#39;s decentralized ownership&#46; This diverse community is the lifeblood of {tokenName}&#44; driving its adoption and use across various platforms&#46;</p>

                    <h3 className="text-lg text-lime-600 font-semibold mb-3">The Lifeblood: Reserves</h3>
                    <p className="mb-4">The contract holds {ethReserve} ETH in reserve&#44; a safety net ensuring liquidity and trust in the system&#46; Alongside ETH&#44; the contract also holds {tokenReserve} {tokenSymbol} in reserve&#44; bolstering the token&#39;s ability to meet market demands&#46;</p>

                    <h3 className="text-lg text-lime-600 font-semibold mb-3">Conclusion</h3>
                    <p className="mb-4">
                        {tokenName} is more than just a digital asset&#44; it&#39;s a story of innovation&#44; community&#44; and trust&#46; As it continues to evolve&#44; {tokenName} promises to remain a cornerstone of the decentralized finance ecosystem&#44; guiding its holders on a journey of growth and discovery&#46;
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Discover;