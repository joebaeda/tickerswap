import Image from "next/image";
import Swap from "./Swap";
import { useState, useEffect } from "react";
import { useWallet } from "@/context/Providers";

interface TokenModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-md">
            <div className="m-4 sm:m-0 max-h-[96vh] flex flex-col items-center justify-center w-full overflow-hidden">
                <div className="relative overflow-y-auto custom-scroll">
                    {children}
                </div>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute -top-8"
                >
                    <svg width="170" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 504">
                        <path fill="#fff" d="m133.6 29.5 38.1 213.3-15.5 2.8-37.1-207.7c4.7-3 9.5-5.7 14.5-8.4m193.8 163.6-14 7.2L212.8 3c5.5-.9 11-1.5 16.6-2z" />
                        <path fill="#fff" d="m161.2 184.3 10.5 58.5-15.6 2.8-10-56.5zm166.2 8.8-14 7.2-28.3-55.5 15.2-4.9z" />
                        <path fill="rgb(249 115 22)" d="M451 308.9 120.7 414.1c-1.3.4-2.7-.3-3.1-1.6L59.3 229.7c-.4-1.3.3-2.7 1.6-3.1l330.3-105.2c1.3-.4 2.7.3 3.1 1.6l58.2 182.8c.5 1.3-.2 2.7-1.5 3.1" />
                        <path fill="#fff" d="m429.4 298.4-297.2 94.7c-1.7.6-3.6-.4-4.2-2.1L80.3 241.2c-.6-1.7.4-3.6 2.1-4.2l297.2-94.7c1.7-.6 3.6.4 4.2 2.1l47.7 149.7c.6 1.9-.4 3.8-2.1 4.3m-296.1 87.4 290.9-92.7-45.7-143.4-290.9 92.7z" />
                        <circle cx="320.4" cy="202.3" r="15.3" />
                        <circle cx="165.5" cy="251.7" r="15.3" />
                        <path fill="#fff" d="M175.7 252.1c-3.3 0-6.3-2.1-7.4-5.3-1.4-4.1.8-8.6 4.9-10L309 190.1c4.1-1.4 8.6.8 10 4.9s-.8 8.6-4.9 10l-135.8 46.7c-.9.2-1.7.4-2.6.4m-7.9 88.7c6.1-1.9 10.2-5.9 12.6-11.9l10.5 5.6c-4 9.1-10.3 14.9-18.8 17.7-8.5 2.7-16.4 2.3-23.6-1.3s-12.1-9.5-14.8-17.7c-2.6-8.2-2-15.9 1.9-23.2s9.8-12.2 17.9-14.8c9.1-2.9 17.7-1.9 26.1 3.1l-4.9 11.1c-5.4-3.6-11.1-4.5-16.8-2.6-4.6 1.5-8.1 4.3-10.4 8.3-2.3 4.1-2.7 8.7-1 13.8 1.6 5.1 4.5 8.8 8.6 10.9 4 2 8.2 2.4 12.7 1m35.4.6-17.6-55.2 12.3-3.9 14.1 44.2 23.5-7.5 3.5 11zm86.9-36.1c-3.8 7.2-9.8 12.2-18 14.8s-15.9 2.1-23.2-1.6-12.3-9.6-14.9-17.7-2-15.8 1.9-23c3.8-7.2 9.8-12.2 18-14.8s15.9-2.1 23.2 1.6 12.3 9.6 14.9 17.7 2 15.7-1.9 23m-10.7-19c-1.6-4.9-4.5-8.6-8.8-11.1s-8.7-3-13.3-1.5-7.9 4.5-10 8.9c-2.1 4.5-2.3 9.2-.7 14.1s4.5 8.6 8.7 11c4.3 2.4 8.7 2.9 13.3 1.5 4.6-1.5 7.9-4.4 10-8.9 2.2-4.4 2.4-9.1.8-14m29.8-27.4c-.9 1.4-1.1 2.8-.5 4.4.5 1.6 1.6 2.7 3.4 3.1 1.8.5 5.5.5 11.1.1s10.3.3 14.1 1.9c3.7 1.7 6.4 5 8 9.9s1 9.6-1.7 13.8q-4.05 6.45-13.2 9.3c-8.7 2.8-17.6 2.1-26.7-2.2L308 288c7.6 3.3 13.9 4.2 19 2.5 2.3-.7 3.9-1.8 4.9-3.2s1.2-2.9.7-4.6-1.6-2.8-3.3-3.3-4.7-.7-9.1-.4c-6.9.5-12.3 0-16-1.5-3.8-1.5-6.5-4.9-8.1-10.1-1.7-5.2-1.1-9.9 1.8-13.9s7.1-7 12.7-8.8c3.7-1.2 7.6-1.7 11.7-1.6s7.9.9 11.3 2.3l-3.4 11c-6-2.1-11.5-2.3-16.6-.7-2.1.8-3.5 1.8-4.4 3.2m73.3-35.6 3.5 11-27.5 8.8 3.6 11.4 24.7-7.9 3.4 10.5-24.7 7.9 3.7 11.5 28.3-9.1 3.5 10.9-40.7 13-17.6-55.3z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

interface TokenContract {
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDescription: string;
    tokenLogoUrls: string;
    tokenChainName: string;
    tokenChainId: number;
    tokenChainHex: string;
    tokenChainLogoUrls: string;
    tokenChainCurrency: string;
    tokenChainRPCUrls: string;
    tokenChainExplorerUrls: string;
    deployer: string;
}

const TokenCard = () => {
    const [data, setData] = useState<TokenContract[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredTokens, setFilteredTokens] = useState<TokenContract[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState<TokenContract | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [tokenBlockExplorer, setTokenBlockExplorer] = useState<string>('');
    const [nativeCurrency, setNativeCurrency] = useState<string>('');
    const { signer, address, balances, network } = useWallet();

    // Fetch data from the API
    const fetchDataFromAPI = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/token');
            const result = await response.json();

            if (result.success) {
                setData(result.data);
                // Optionally save to localStorage
                localStorage.setItem('contractData', JSON.stringify(result.data));
            } else {
                console.log('Failed to fetch contract data');
            }
        } catch (err) {
            console.log('Error occurred while fetching contract data');
        } finally {
            setLoading(false);
        }
    };

    // Load from localStorage and fetch new data on mount
    useEffect(() => {
        const storedData = localStorage.getItem("contractData");
        if (storedData) {
            setData(JSON.parse(storedData));
        }
        fetchDataFromAPI(); // Fetch initial data

        // Auto-refresh every 30 minutes
        const interval = setInterval(() => {
            fetchDataFromAPI();
        }, 1800000);
        return () => clearInterval(interval);
    }, []);

    // Handle search filtering
    useEffect(() => {
        const filtered = data.filter(token =>
            token.tokenChainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.tokenChainId.toString().includes(searchTerm.toString()) ||
            token.tokenAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.tokenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.deployer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTokens(filtered);
    }, [searchTerm, data]);

    const handleCardClick = (token: TokenContract) => {
        if (network?.chainIdNumber !== token.tokenChainId) {
            setSelectedToken(token);
            setIsConfirmModalOpen(true);
        } else {
            setSelectedToken(token);
            setTokenBlockExplorer(token.tokenChainExplorerUrls);
            setNativeCurrency(token.tokenChainCurrency);
            setIsModalOpen(true);
        }
    };

    const handleConfirmSwitchNetwork = async () => {
        if (selectedToken) {
            setIsConfirmModalOpen(false);

            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: selectedToken.tokenChainHex }],
                });
            } catch (error) {
                if (error === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: selectedToken.tokenChainHex,
                                chainName: selectedToken.tokenChainName,
                                nativeCurrency: selectedToken.tokenChainCurrency,
                                rpcUrls: selectedToken.tokenChainRPCUrls,
                                blockExplorerUrls: selectedToken.tokenChainExplorerUrls,
                            }],
                        });
                    } catch (addError) {
                        console.error("Failed to add network", addError);
                    }
                } else {
                    console.error("Failed to switch network", error);
                }
            }

            setSelectedToken(selectedToken);
            setTokenBlockExplorer(selectedToken.tokenChainExplorerUrls);
            setNativeCurrency(selectedToken.tokenChainCurrency);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedToken(null);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setSelectedToken(null);
    };

    return (
        <div className="fixed inset-0 p-4 rounded-t-2xl bg-gray-50 top-[21%] overflow-hidden overflow-y-auto custom-scroll z-50">

            {/* Search Input */}
            <div className="flex flex-row mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tokens or type contract address, name, symbol, chain name or chain ID"
                    className="w-full p-4 focus:outline-none text-gray-500 font-mono border border-r-0 border-lime-400 rounded-l-xl"
                />
                <button onClick={fetchDataFromAPI} className="p-4 bg-white border border-l-0 border-lime-500 rounded-r-xl">
                    <svg width="32" height="32" fill="rgb(249 115 22)" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12v-2l-4 3 4 3v-2h2.997A6.006 6.006 0 0 0 16 8h-2a4 4 0 0 1-3.996 4zM9 2H6.003A6.006 6.006 0 0 0 0 8h2a4 4 0 0 1 3.996-4H9v2l4-3-4-3z" fillRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Token Card List */}
            <div className="text-white font-mono">
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <svg width={200} height={200} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.353 19C18.815 19 20 17.787 20 16.292S18 13 14.833 14.937c-.042-.2 3.834-1.624 2.167-4.062-1.667-2.437-4 .875-3-1.875 1.667-3.25-2.333 2.688-4.833-3-1.514 1.625 1.973 3.25-1.514 4.875S6 14 8.333 14.938C5.68 14.938 5 16.198 5 17.194 5 18.192 5.882 19 7.653 19zM16.99 8.276c.65.31 1.206.806 1.66 1.47.659.964.888 1.894.784 2.76 1.53.624 2.566 1.988 2.566 3.786C22 18.882 19.93 21 17.353 21h-9.7C4.992 21 3 19.528 3 17.194c0-1.132.413-2.113 1.176-2.847a4 4 0 0 1-.188-.36c-.925-2.048.338-3.768 2.82-4.925q.243-.114.378-.195l-.057-.164c-.25-.707-.346-1.06-.364-1.62-.03-.898.282-1.742.938-2.446l2.071-2.224 1.224 2.782c.337.767.658 1.176.919 1.336.163.101.372.087.827-.101.098-.041.46-.205.526-.233.163-.07.303-.12.467-.163.443-.114.875-.132 1.403.095.835.357 1.241 1.119 1.254 1.884.196.09.394.166.597.263M14 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M4 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2m16 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2" fill="rgb(249 115 22)" />
                        </svg>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredTokens.toReversed().map((token, index) => (
                            <div
                                key={index}
                                className="hover:shadow-lg bg-gradient-to-br from-amber-500 to-amber-200 rounded-xl"
                            >
                                {/* Token Logo, Chain name and chain logo */}
                                <div className="relative flex justify-end items-center">
                                    <Image
                                        src={token.tokenLogoUrls.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")}
                                        alt={`${token.tokenName || 'Token'} logo`}
                                        width={250}
                                        height={250}
                                        priority={true}
                                        className="w-full h-48 rounded-3xl object-cover p-4"
                                    />
                                    <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-500 to-amber-200 p-2 flex flex-row rounded-bl-xl rounded-tr-xl justify-between items-center gap-2">
                                        <p className="text-xs sm:text-sm">{token.tokenChainName}</p>
                                        <Image
                                            src={token.tokenChainLogoUrls}
                                            alt="Chain logo"
                                            width={40}
                                            height={40}
                                            priority={true}
                                            className="w-6 h-6 sm:w-8 sm:h-8 p-1 rounded-full border-lime-400 border object-contain bg-gray-200"
                                        />
                                    </div>
                                </div>

                                {/* Token Name and Symbol */}
                                <div onClick={() => handleCardClick(token)} className="px-4 pb-4 flex flex-col cursor-pointer">
                                    <h2 className="text-xl font-semibold">{token.tokenName}</h2>
                                    <p className="text-lg">{token.tokenSymbol}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Swap Modal */}
            <TokenModal isOpen={isModalOpen} onClose={closeModal}>
                {selectedToken && (
                    <Swap
                        tokenAddress={selectedToken.tokenAddress}
                        signer={signer}
                        addressConnected={address}
                        addressBalances={balances}
                        currencySymbol={nativeCurrency}
                        chainBlockExplorer={tokenBlockExplorer}
                    />
                )}
            </TokenModal>

            {/* Network Switch Confirmation Modal */}
            <TokenModal isOpen={isConfirmModalOpen} onClose={closeConfirmModal}>
                <div className="max-w-2xl p-4 text-gray-500 bg-gray-50 rounded-xl font-mono flex flex-col sm:flex-row gap-6">
                    {/* Token Image */}
                    <div className="sm:w-1/3 flex justify-center mt-2">
                        <Image
                            src={selectedToken?.tokenLogoUrls ? selectedToken.tokenLogoUrls.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : "/poop.webp"}
                            alt={`${selectedToken?.tokenName || 'Token'} logo`}
                            width={350}
                            height={350}
                            priority={true}
                            className="rounded-xl mx-auto border-lime-400 border object-cover bg-gray-200"
                        />
                    </div>

                    {/* Token Description and Confirmation */}
                    <div className="sm:w-2/3 flex flex-col justify-between mt-2">
                        <div className="mb-6">
                            <p className="text-md mb-4">
                                {selectedToken?.tokenDescription || "No description available for this token."}
                            </p>

                            {/* Token Detail */}
                            <div className="w-full rounded-2xl bg-gray-50 text-gray-500">
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2 text-green-500">
                                            &#10003;
                                        </span>
                                        <a href={`${selectedToken?.tokenChainExplorerUrls}/token/${selectedToken?.tokenAddress.toLowerCase()}`} target="_blank" className="font-semibold text-lime-500">Contract Address</a>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-green-500">
                                            &#10003;
                                        </span>
                                        <a href={`${selectedToken?.tokenChainExplorerUrls}/address/${selectedToken?.deployer.toLowerCase()}`} target="_blank" className="font-semibold text-lime-500">Deployer/Creator</a>
                                    </li>
                                </ul>
                            </div>

                            <p className="text-md my-4">
                                Do you want to switch to the correct {selectedToken?.tokenName} Network? {selectedToken?.tokenSymbol} uses <strong>{selectedToken?.tokenChainName}</strong> as the token network.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full flex justify-center sm:justify-between gap-4">
                            <button
                                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-500 py-2 px-4 rounded-xl"
                                onClick={closeConfirmModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl"
                                onClick={handleConfirmSwitchNetwork}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </TokenModal>

        </div>
    );
};

const Token = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={openModal} className="w-full border-4 border-white bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl">Swap</button>

            <TokenModal isOpen={isModalOpen} onClose={closeModal}>
                <TokenCard />
            </TokenModal>
        </div>
    );
};

export default Token;
