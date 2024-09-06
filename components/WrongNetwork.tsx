"use client";

import React from 'react';
import { useWallet } from '@/context/WalletContextProvider'; // Assuming you have a WalletProvider context

const WrongNetwork: React.FC = () => {
    const { isCorrectNetwork } = useWallet();

    const switchNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }], // Sepolia network chainId
            });
            window.location.reload(); // Refresh the page after switching network
        } catch (error) {
            console.error('Failed to switch network:', error);
            // Optional: add more error handling here
        }
    };

    if (isCorrectNetwork) {
        return null; // Don't render anything if the network is correct
    }

    return (
        <div className="fixed bottom-4">
            <button
                onClick={switchNetwork}
                className="text-3xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32" xmlSpace="preserve">
                    <path d="M30 17c0 7.72-6.28 14-14 14S2 24.72 2 17C2 10.311 6.718 4.71 13 3.332v4.129C8.948 8.739 6 12.531 6 17c0 5.514 4.486 10 10 10s10-4.486 10-10c0-4.469-2.948-8.261-7-9.539V3.332C25.282 4.71 30 10.311 30 17m-14-4a2 2 0 0 0 2-2V3a2 2 0 0 0-4 0v8a2 2 0 0 0 2 2" fill="#e5e7eb" />
                </svg>
            </button>
        </div>
    );
};

export default WrongNetwork;
