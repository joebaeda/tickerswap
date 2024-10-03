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
                <div className="absolute top-3 w-full px-4 flex flex-row justify-between items-center">

                    {/* Back button left */}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="text-orange-500"
                    >
                        <svg width={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576.281 576.281" transform="scale(-1 1)">
                            <defs>
                                <linearGradient id="a">
                                    <stop offset="0%" stopColor="currentColor" />
                                    <stop stopOpacity="10" offset="100%" stopColor="#990855" />
                                </linearGradient>
                            </defs>
                            <path fill="url(#a)" d="M 15.977 479.417 c 11.063 11.951 26.715 18.807 42.943 18.807 c 11.384 0 22.469 -3.34 32.06 -9.656 c 16.849 -11.1 44.967 -27.186 83.241 -40.795 c 36.443 -12.957 75.037 -21.213 115.065 -24.635 v 29.748 c 0 8.281 1.684 16.273 5.003 23.754 a 57.7 57.7 0 0 0 13.396 18.822 c 10.914 10.209 25.15 15.83 40.083 15.83 c 15.157 0 29.546 -5.854 40.517 -16.482 L 558.03 330.317 a 58 58 0 0 0 13.301 -19.555 a 58.1 58.1 0 0 0 4.45 -22.322 a 58.1 58.1 0 0 0 -4.416 -22.33 a 58.05 58.05 0 0 0 -13.271 -19.574 l -169.743 -165 c -10.978 -10.669 -25.388 -16.546 -40.577 -16.548 c -14.934 -0.001 -29.17 5.62 -40.085 15.829 a 57.7 57.7 0 0 0 -13.399 18.824 c -3.319 7.48 -5.002 15.472 -5.002 23.753 v 33.81 c -48.832 4.019 -92.462 15.136 -130 33.156 c -39.032 18.738 -71.783 44.996 -97.341 78.044 c -20.422 26.406 -36.165 57.037 -46.793 91.043 C 7.564 383.731 2.694 409.253 0.68 435.3 c -0.644 8.316 0.443 16.475 3.23 24.25 a 57.8 57.8 0 0 0 12.067 19.867" />
                        </svg>
                    </button>

                    {/* Back button right */}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="text-orange-500"
                    >
                        <svg width={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576.281 576.281">
                            <defs>
                                <linearGradient id="a">
                                    <stop offset="0%" stopColor="currentColor" />
                                    <stop stopOpacity="10" offset="100%" stopColor="#990855" />
                                </linearGradient>
                            </defs>
                            <path fill="url(#a)" d="M15.977 479.417c11.063 11.951 26.715 18.807 42.943 18.807 11.384 0 22.469-3.34 32.06-9.656 16.849-11.1 44.967-27.186 83.241-40.795 36.443-12.957 75.037-21.213 115.065-24.635v29.748c0 8.281 1.684 16.273 5.003 23.754a57.7 57.7 0 0 0 13.396 18.822c10.914 10.209 25.15 15.83 40.083 15.83 15.157 0 29.546-5.854 40.517-16.482L558.03 330.317a58 58 0 0 0 13.301-19.555 58.1 58.1 0 0 0 4.45-22.322 58.1 58.1 0 0 0-4.416-22.33 58.05 58.05 0 0 0-13.271-19.574l-169.743-165c-10.978-10.669-25.388-16.546-40.577-16.548-14.934-.001-29.17 5.62-40.085 15.829a57.7 57.7 0 0 0-13.399 18.824c-3.319 7.48-5.002 15.472-5.002 23.753v33.81c-48.832 4.019-92.462 15.136-130 33.156-39.032 18.738-71.783 44.996-97.341 78.044-20.422 26.406-36.165 57.037-46.793 91.043C7.564 383.731 2.694 409.253.68 435.3c-.644 8.316.443 16.475 3.23 24.25a57.8 57.8 0 0 0 12.067 19.867" />
                        </svg>
                    </button>

                </div>
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

interface TokenCardProps {
    nativeCoinPriceId: string;
}

const TokenCard: React.FC<TokenCardProps> = ({nativeCoinPriceId}) => {
    const [data, setData] = useState<TokenContract[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredTokens, setFilteredTokens] = useState<TokenContract[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState<TokenContract | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [tokenBlockExplorer, setTokenBlockExplorer] = useState<string>('');
    const [nativeCurrency, setNativeCurrency] = useState<string>('');
    const { signer, address, network } = useWallet();

    // Fetch data from the API
    const fetchDataFromAPI = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                setData(result.data);
                // save to localStorage
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
        <div className="fixed inset-0 p-4 rounded-t-2xl font-mono text-gray-500 bg-gray-50 dark:text-white dark:bg-[#3c3c3c] top-[12%] overflow-hidden overflow-y-auto custom-scroll z-50">

            {/* Search Input */}
            <div className="flex flex-row mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tokens or type contract address, name, symbol, chain name or chain ID"
                    className="w-full p-4 focus:outline-none bg-gray-100 dark:bg-[#282828] rounded-xl"
                />
            </div>

            {/* Token Card List */}
            <div>
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <svg width={150} height={150} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#bec4cf" d="M17.353 19C18.815 19 20 17.787 20 16.292S18 13 14.833 14.937c-.042-.2 3.834-1.624 2.167-4.062-1.667-2.437-4 .875-3-1.875 1.667-3.25-2.333 2.688-4.833-3-1.514 1.625 1.973 3.25-1.514 4.875S6 14 8.333 14.938C5.68 14.938 5 16.198 5 17.194 5 18.192 5.882 19 7.653 19zM16.99 8.276c.65.31 1.206.806 1.66 1.47.659.964.888 1.894.784 2.76 1.53.624 2.566 1.988 2.566 3.786C22 18.882 19.93 21 17.353 21h-9.7C4.992 21 3 19.528 3 17.194c0-1.132.413-2.113 1.176-2.847a4 4 0 0 1-.188-.36c-.925-2.048.338-3.768 2.82-4.925q.243-.114.378-.195l-.057-.164c-.25-.707-.346-1.06-.364-1.62-.03-.898.282-1.742.938-2.446l2.071-2.224 1.224 2.782c.337.767.658 1.176.919 1.336.163.101.372.087.827-.101.098-.041.46-.205.526-.233.163-.07.303-.12.467-.163.443-.114.875-.132 1.403.095.835.357 1.241 1.119 1.254 1.884.196.09.394.166.597.263M14 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M4 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2m16 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                        </svg>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredTokens.toReversed().map((token, index) => (
                            <div
                                key={index}
                                className="hover:shadow-lg bg-gradient-to-br from-gray-100 to-yellow-200 dark:from-[#393939] dark:to-[#282828] rounded-xl"
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
                                    <div className="absolute top-0 right-0 bg-gradient-to-br from-gray-100 to-yellow-200 dark:from-[#393939] dark:to-[#282828] p-2 flex flex-row rounded-bl-xl rounded-tr-xl justify-between items-center gap-2">
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
                        currencySymbol={nativeCurrency}
                        chainBlockExplorer={tokenBlockExplorer}
                        nativeCoinPriceId={nativeCoinPriceId}
                    />
                )}
            </TokenModal>

            {/* Network Switch Confirmation Modal */}
            <TokenModal isOpen={isConfirmModalOpen} onClose={closeConfirmModal}>
                <div className="max-w-3xl p-4 rounded-xl flex flex-col sm:flex-row gap-6 bg-gray-50 dark:bg-[#3c3c3c]">
                    {/* Token Image */}
                    <div className="sm:w-1/3 flex justify-center mt-2">
                        <Image
                            src={selectedToken?.tokenLogoUrls ? selectedToken.tokenLogoUrls.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : "/poop.webp"}
                            alt={`${selectedToken?.tokenName || 'Token'} logo`}
                            width={350}
                            height={350}
                            priority={true}
                            className="rounded-xl mx-auto object-cover"
                        />
                    </div>

                    {/* Token Description and Confirmation */}
                    <div className="sm:w-2/3 flex flex-col justify-between mt-2">
                        <div className="mb-6">
                            <p className="text-md mb-4">
                                {selectedToken?.tokenDescription || "No description available for this token."}
                            </p>

                            {/* Token Detail */}
                            <div className="w-full rounded-2xl">
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

interface TokenProps {
    nativeCoinPriceId: string;
}

const Token: React.FC<TokenProps> = ({nativeCoinPriceId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="absolute top-[5.6%] right-44">
            <button onClick={openModal} className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono">Swap</button>

            <TokenModal isOpen={isModalOpen} onClose={closeModal}>
                <TokenCard nativeCoinPriceId={nativeCoinPriceId} />
            </TokenModal>
        </div>
    );
};

export default Token;
