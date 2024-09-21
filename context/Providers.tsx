"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { ethers, Signer } from 'ethers';
import { networks } from '@/lib/networks';

interface NetworkProps {
    networkName: string;
    chainIdHex: string;
    chainIdNumber: number;
    rpcUrl: string;
    explorer: string;
    networkLogo: string;
    nativeCurrency: string;
}

interface ProvidersProps {
    signer: Signer | null;
    address: string;
    balances: string;
    network: NetworkProps | null;
    isWrongNetwork: boolean;
    isNoWallet: boolean;
    isConnected: boolean;
    connectWallet: () => void;
    disconnectWallet: () => void;
}

const WalletContext = createContext<ProvidersProps | undefined>(undefined);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [signer, setSigner] = useState<Signer | null>(null);
    const [address, setAddress] = useState<string>('');
    const [balances, setBalances] = useState<string>('');
    const [network, setNetwork] = useState<NetworkProps | null>(null);
    const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(false);
    const [isNoWallet, setIsNoWallet] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const connectWallet = useCallback(async () => {
        if (!window?.ethereum) {
            setIsNoWallet(true);
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();

            // Find the matching network
            const networkInfo = networks.find((net) => BigInt(net.chainIdNumber) === network.chainId);

            if (!networkInfo) {
                setIsWrongNetwork(true);
            } else {
                setNetwork(networkInfo);
                setIsWrongNetwork(false);
            }


            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            const userBalances = await provider.getBalance(userAddress);
            setSigner(signer);
            setAddress(userAddress);
            setIsNoWallet(false);
            setBalances(ethers.formatEther(userBalances));
            setIsConnected(true);
            console.log(`Connected with address: ${userAddress}`);

        } catch (error) {
            console.error('Failed to connect wallet:', error);
            setIsNoWallet(true);
            setIsConnected(false);
        }
    }, []);

    const disconnectWallet = useCallback(() => {
        setSigner(null);
        setAddress('');
        setBalances('');
        setNetwork(null);
        setIsWrongNetwork(false);
        setIsNoWallet(false);
        setIsConnected(false);
    }, []);

    useEffect(() => {
        connectWallet(); // Attempt to connect wallet on mount

        if (window?.ethereum) {
            const handleChainChanged = () => {
                console.log('Network changed');
            };

            const handleAccountsChanged = (accounts: string[]) => {
                console.log('Accounts changed');
                if (accounts.length === 0) {
                    disconnectWallet(); // Handle wallet disconnect
                } else {
                    window.location.reload(); // Reload the page on account change
                }
            };

            const handleDisconnect = () => {
                console.log('Wallet disconnected');
                disconnectWallet(); // Handle wallet disconnect
            };

            window.ethereum.on('chainChanged', handleChainChanged);
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('disconnect', handleDisconnect);

            // Cleanup event listeners on unmount
            return () => {
                window.ethereum.removeListener('chainChanged', handleChainChanged);
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('disconnect', handleDisconnect);
            };
        }
    }, [connectWallet, disconnectWallet]);

    return (
        <WalletContext.Provider value={{ signer, address, balances, network, isWrongNetwork, isNoWallet, isConnected, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};
