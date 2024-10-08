import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
    buy,
    sell,
    tokenNames,
    tokenSymbols,
    totalTokenSupply,
    tokenPriceInETH,
    ethPriceInToken,
    tokenBalance,
    creatorFee,
    ethBalance
} from '@/lib/token';
import Toast from './Toast';

const formatToUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

interface SwapProps {
    tokenAddress: string;
    signer?: ethers.Signer | null;
    addressConnected: string;
    currencySymbol: string;
    chainBlockExplorer: string;
    nativeCoinPriceId: string;
}

const Swap: React.FC<SwapProps> = ({ tokenAddress, signer, addressConnected, currencySymbol, nativeCoinPriceId }) => {
    const [amount, setAmount] = useState<string>('');
    const [amountEtherInUSD, setAmountEtherInUSD] = useState<string | null>(null);
    const [amountTokenInUSD, setAmountTokenInUSD] = useState<string | null>(null);
    const [swapType, setSwapType] = useState<'buy' | 'sell'>('buy');
    const [tokenName, setTokenName] = useState<string>('');
    const [tokenSymbol, setTokenSymbol] = useState<string>('');
    const [totalSupply, setTotalSupply] = useState<string>('');
    const [ethPrice, setEthPrice] = useState<string | null>(null);
    const [tokenPrice, setTokenPrice] = useState<string | null>(null);
    const [nativePriceInUSD, setNativePriceInUSD] = useState<number | null>(null);
    const [priceInUSD, setPriceInUSD] = useState<string | null>(null);
    const [creatorGotFee, setCreatorGotFee] = useState<string>('');
    const [feeOnEth, setFeeOnEth] = useState<string | null>(null);
    const [feeOnToken, setFeeOnToken] = useState<string | null>(null);
    const [ethMinAmountOut, setETHMinAmountOut] = useState<string | null>(null);
    const [tokenMinAmountOut, setTokenMinAmountOut] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);
    const [tokenBalances, setTokenBalance] = useState<string>('');
    const [etherBalance, setEtherBalance] = useState<string>('');

    useEffect(() => {
        const fetchTokenPriceInUSD = async () => {
            try {
                const response = await fetch(`/api/price?id=${nativeCoinPriceId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch token price');
                }
                const data = await response.json();
                const nativeCoinPrice = data[nativeCoinPriceId].usd;
                setNativePriceInUSD(nativeCoinPrice);

            } catch (error) {
                console.error('Error fetching token price:', error);
                return null;
            }
        };
        fetchTokenPriceInUSD();

    }, [nativeCoinPriceId])

    useEffect(() => {
        const fetchTokenData = async () => {
            if (tokenAddress) {
                try {
                    const name = await tokenNames(tokenAddress);
                    const symbol = await tokenSymbols(tokenAddress);
                    const supplyInWei = await totalTokenSupply(tokenAddress);
                    const supply = ethers.formatEther(supplyInWei);
                    const tokenOwnedWei = await tokenBalance(tokenAddress, addressConnected);
                    const ethOwnedWei = await ethBalance(addressConnected);
                    const tokenOwned = ethers.formatEther(tokenOwnedWei);
                    const ethOwned = ethers.formatEther(ethOwnedWei);
                    setTokenName(name);
                    setTokenSymbol(symbol);
                    setTotalSupply(supply);
                    setTokenBalance(tokenOwned);
                    setEtherBalance(ethOwned);

                    const priceInETH = await tokenPriceInETH(tokenAddress);
                    const priceInToken = await ethPriceInToken(tokenAddress);
                    const feeForCreator = await creatorFee(tokenAddress);
                    setCreatorGotFee(String(feeForCreator));

                    setEthPrice(ethers.formatEther(priceInETH));
                    setTokenPrice(ethers.formatEther(priceInToken));

                    const priceToUSD = Number(ethers.formatEther(priceInETH)) * Number(nativePriceInUSD);
                    setPriceInUSD(formatToUSD(priceToUSD));

                    if (swapType === 'buy') {
                        const ethAmountToUSD = Number(amount) * Number(nativePriceInUSD);
                        setAmountEtherInUSD(formatToUSD(ethAmountToUSD));
                    } else {
                        const etherAmount = Number(amount) * Number(ethers.formatEther(priceInETH));
                        const tokenAmountInUSD = etherAmount * Number(nativePriceInUSD);
                        setAmountTokenInUSD(formatToUSD(tokenAmountInUSD));
                    }

                } catch (err) {
                    console.error('Failed to fetch token data:', err);
                }
            }
        };

        fetchTokenData();
    }, [tokenAddress, addressConnected, nativePriceInUSD, swapType, amount]);

    useEffect(() => {
        const estimateAmountOut = async () => {
            if (!amount || !ethPrice || !tokenPrice) return;

            try {
                // Convert amounts to Number for precise calculations
                const ethAmount = Number(amount);
                const tokenAmount = Number(amount);
                const priceInEth = Number(ethPrice);
                const priceInToken = Number(tokenPrice);

                const feeForCreator = await creatorFee(tokenAddress);

                if (swapType === 'buy') {
                    // Calculate tokens out for the given ETH amount
                    const tokensOut = ethAmount / priceInEth;
                    const tokensMinOut = tokensOut * 95 / 100; // Apply slippage
                    const feeEth = ethAmount * Number(feeForCreator) / 100; // Aplly fee for creator

                    // Convert to readable format
                    setTokenMinAmountOut(String(tokensMinOut));
                    setFeeOnEth(String(feeEth));
                } else if (swapType === 'sell') {
                    // Calculate ETH out for the given token amount
                    const ethOut = tokenAmount / priceInToken;
                    const ethMinOut = ethOut * 95 / 100; // Apply slippage
                    const feeToken = tokenAmount * Number(feeForCreator) / 100 // Apply fee for creator

                    // Convert to readable format
                    setETHMinAmountOut(String(ethMinOut));
                    setFeeOnToken(String(feeToken));
                }
            } catch (err) {
                console.error('Failed to estimate amount out:', err);
            }
        };

        estimateAmountOut();
    }, [amount, swapType, ethPrice, tokenPrice, tokenAddress]);

    const handleSwap = async () => {
        if (!signer || !tokenAddress) return;

        const ethAmount = ethers.parseEther(amount);
        const tokenAmount = ethers.parseUnits(amount, 18);
        setLoading(true);

        try {
            if (swapType === 'buy') {
                // Calculate 1% of the total supply
                const tenPercentOfSupply = Number(totalSupply) * 1 / 100;

                // Calculate price in ETH for 1% token supply
                const maxETHAmount = tenPercentOfSupply / Number(tokenPrice as string);

                // Check if the purchase exceeds 1% of the total supply
                if (ethAmount > ethers.parseEther(String(maxETHAmount))) {
                    setToast({
                        message: `The purchase amount exceeds 1% of the total supply. You can buy up to ${parseFloat(maxETHAmount.toString()).toFixed(5)} ${currencySymbol}.`,
                        type: 'error',
                    });
                    setLoading(false);
                    return;
                }

                await buy(tokenAddress, ethers.parseUnits(tokenMinAmountOut as string, 18), ethAmount, signer);
            } else if (swapType === 'sell') {
                await sell(tokenAddress, tokenAmount, ethers.parseEther(String(parseFloat(ethMinAmountOut as string).toFixed(4))), signer);
            }

            // Show success toast
            setToast({ message: 'Swap successful!', type: 'success' });

            // Wait for 3 seconds before reloading
            setTimeout(() => {
                setLoading(false);
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error('Swap failed:', error);

            // Show error toast
            setToast({ message: 'Swap failed. Please try again.', type: 'error' });

            // Stop loading after showing the error
            setLoading(false);

            // Optionally wait before removing the toast
            setTimeout(() => {
                setToast(null);
            }, 3000);
        }
    };


    return (

        <div className="fixed inset-0 rounded-t-2xl font-mono text-gray-500 bg-gray-50 dark:text-white dark:bg-[#3c3c3c] top-[12%] overflow-hidden overflow-y-auto custom-scroll z-50">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}


            {/* Swap Form */}
            <div className="relative w-full p-4">

                <div className="mt-4">
                    {/* Input 1: Swap from */}
                    <div className="p-4 bg-gray-100 dark:bg-[#282828] rounded-xl shadow-sm">
                        <div className="flex justify-between items-center">
                            <label htmlFor="fromAmount" className="text-sm font-medium">
                                {swapType === 'buy' ? `${currencySymbol}` : `${tokenSymbol}`}
                            </label>
                            {/* Make the balance clickable to set the max amount */}
                            <span
                                className="text-sm font-medium text-right cursor-pointer"
                                onClick={() => setAmount(swapType === 'buy' ? etherBalance : tokenBalances)}
                            >
                                Balance: {swapType === 'buy' ? `${etherBalance.slice(0, 8)}` : `${tokenBalances.slice(0, 8)}`}
                            </span>
                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                type="text"
                                value={amount}
                                id="fromAmount"
                                name="fromAmount"
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                disabled={loading}
                                className="w-full py-3 bg-transparent text-lg focus:outline-none"
                            />
                            <button onClick={() => setAmount(swapType === 'buy' ? etherBalance : tokenBalances)} className="ml-2 px-3 py-1 font-semibold">
                                MAX
                            </button>
                        </div>
                        <p>{swapType === 'buy' ? `${amountEtherInUSD || '$0.00'}` : `${amountTokenInUSD || '$0.00'}`}</p>
                    </div>
                </div>


                {/* Switch Button */}
                <div className="flex justify-center items-center -my-4">
                    <button
                        onClick={() => setSwapType(swapType === 'buy' ? 'sell' : 'buy')}
                        className="p-2 bg-gray-50 dark:bg-[#3c3c3c] rounded-full transition"
                        disabled={loading}
                    >
                        <svg width="42" height="42" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0 0h16v16H0z" />
                            <path d="M5 16V4.8L2.4 7.4 1 6l6-6v16zm6-4.8 2.6-2.6L15 10l-6 6V0h2z" />
                        </svg>
                    </button>
                </div>

                {/* Input 2: Swap to */}
                <div className="p-4 bg-gray-100 dark:bg-[#282828] rounded-xl shadow-sm">
                    <div className="flex justify-between items-center">
                        <label htmlFor="toAmount" className="text-sm font-medium">
                            {swapType === 'buy' ? `${tokenSymbol}` : `${currencySymbol}`}
                        </label>
                        <span className="text-sm font-medium text-right">Balance: {swapType === 'buy' ? `${tokenBalances.slice(0, 8)}` : `${etherBalance.slice(0, 8)}`}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            value={swapType === 'buy' ? `${tokenMinAmountOut || '0'}` : `${ethMinAmountOut || '0'}`}
                            id="toAmount"
                            name="toAmount"
                            placeholder="0"
                            disabled
                            className="w-full py-3 bg-transparent text-lg focus:outline-none"
                        />
                        <button onClick={() => setAmount(swapType === 'buy' ? etherBalance : tokenBalances)} className="ml-2 px-3 py-1 font-semibold">
                            MAX
                        </button>
                    </div>
                    <p>{swapType === 'buy' ? `${amountEtherInUSD || '$0.00'}` : `${amountTokenInUSD || '$0.00'}`}</p>
                </div>

                {/* Price Information */}
                <div className="text-center text-sm text-gray-500 my-4">
                    Price: {priceInUSD || '$0.00'}
                    <span> - &#40;
                        {swapType === 'buy'
                            ? `1 ${currencySymbol} = ${tokenPrice?.slice(0, 8)} ${tokenSymbol}`
                            : `1 ${tokenSymbol} = ${ethPrice?.slice(0, 8)} ${currencySymbol}`}
                        &#41;</span>
                </div>

            </div>

            {/* Est output and Button */}
            <div className="w-full absolute bottom-1 p-4">

                {/* Est output */}
                {swapType === 'buy' ? (
                    <>
                        <p className="py-3">Fee &#40;{creatorGotFee}%&#41;: <span className="float-right">{feeOnEth ? feeOnEth.slice(0, 8) : '0'} {currencySymbol}</span></p>
                        <p>Received &#40;Est&#41;: <span className="float-right">{tokenMinAmountOut ? tokenMinAmountOut.slice(0, 8) : '0'} {tokenSymbol}</span></p>
                    </>
                ) : (
                    <>
                        <p className="py-3">Fee &#40;{creatorGotFee}%&#41;: <span className="float-right">{feeOnToken ? feeOnToken.slice(0, 8) : '0'} {tokenSymbol}</span></p>
                        <p>Received &#40;Est&#41;: <span className="float-right">{ethMinAmountOut ? ethMinAmountOut.slice(0, 8) : '0'} {currencySymbol}</span></p>
                    </>
                )}

                {/* Swap Button */}
                <button
                    onClick={handleSwap}
                    className={`w-full mt-6 p-3 rounded-lg ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold`}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : swapType === 'buy' ? `Buy ${tokenName}` : `Sell ${tokenName}`}
                </button>

            </div>

        </div>
    );
};

export default Swap;
