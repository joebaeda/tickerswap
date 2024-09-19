import useContractData from "@/hook/useContractData";
import Image from "next/image";
import Swap from "./Swap";
import { useState, useEffect } from "react";
import { useWallet } from "@/context/Providers";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
            <div className="m-4 sm:m-0 max-h-[96vh] flex flex-col items-center justify-center w-full overflow-hidden">
                <div className="relative overflow-y-auto custom-scroll">
                    {children}
                </div>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-0 right-0 bg-gray-50 rounded-bl-2xl p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 70 70" xmlSpace="preserve">
                        <path d="M18.041 14.021c1.013 0 2.021.385 2.79 1.153l14.196 14.142 14.142-14.142a3.93 3.93 0 0 1 2.791-1.152c1.024 0 2.053.394 2.839 1.18 1.563 1.562 1.574 4.082.027 5.63L40.685 34.973l14.142 14.196c1.547 1.547 1.535 4.068-.026 5.631a4 4 0 0 1-2.839 1.178 3.93 3.93 0 0 1-2.792-1.152L35.027 40.63 20.831 54.825a3.93 3.93 0 0 1-2.791 1.154 4 4 0 0 1-2.839-1.18c-1.563-1.563-1.574-4.084-.027-5.631l14.197-14.196-14.197-14.141c-1.547-1.547-1.533-4.068.027-5.63a4 4 0 0 1 2.84-1.18m0-4a7.96 7.96 0 0 0-5.667 2.351c-3.12 3.121-3.132 8.185-.028 11.287l11.363 11.319-11.363 11.361c-3.105 3.107-3.092 8.172.028 11.289a7.96 7.96 0 0 0 5.666 2.352 7.9 7.9 0 0 0 5.62-2.326l11.362-11.361 11.313 11.355a7.9 7.9 0 0 0 5.626 2.33c2.138 0 4.15-.834 5.666-2.35 3.12-3.121 3.132-8.184.027-11.287L46.336 34.978 57.654 23.66c3.104-3.106 3.092-8.17-.028-11.287a7.96 7.96 0 0 0-5.666-2.351 7.9 7.9 0 0 0-5.618 2.323l-11.32 11.319L23.654 12.34a7.9 7.9 0 0 0-5.613-2.319" />
                        <path d="M50.7 21.714a.999.999 0 0 1-.707-1.707l2.121-2.121a.999.999 0 1 1 1.414 1.414l-2.121 2.121a1 1 0 0 1-.707.293m-9.899 9.9a.999.999 0 0 1-.707-1.707l7.07-7.07a.999.999 0 1 1 1.414 1.414l-7.07 7.07a1 1 0 0 1-.707.293" />
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
    timestamp: string;
}

const TokenCard = () => {
    const { data } = useContractData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState<TokenContract | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [tokenBlockExplorer, setTokenBlockExplorer] = useState<string>('');
    const [nativeCurrency, setNativeCurrency] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state
    const [filteredTokens, setFilteredTokens] = useState<TokenContract[]>([]); // Filtered tokens state
    const { signer, address, balances, chainIds } = useWallet();

    // Handle search filtering
    useEffect(() => {
        const filtered = data.filter(token =>
            token.tokenAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.tokenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.deployer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTokens(filtered);
    }, [searchTerm, data]);

    const handleCardClick = (token: TokenContract) => {
        if (Number(chainIds) !== token.tokenChainId) {
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
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tokens or type contract address, name or symbol"
                    className="w-full p-4 focus:outline-none text-gray-500 font-mono border border-lime-400 rounded-xl"
                />
            </div>

            {/* Token Card List */}
            <div className="text-white font-mono">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredTokens.map((token, index) => (
                        <div
                            key={index}
                            className="hover:shadow-lg bg-gradient-to-br from-amber-500 to-amber-200 rounded-xl p-4"
                        >
                            {/* Token Logo, Chain name and chain logo */}
                            <div className="relative flex justify-end items-center mt-2">
                                <Image
                                    src={token.tokenLogoUrls.replace("ipfs://", "https://ipfs.io/ipfs/")}
                                    alt={`${token.tokenName || 'Token'} logo`}
                                    width={250}
                                    height={250}
                                    priority={true}
                                    className="w-full rounded-xl border-lime-400 border object-cover bg-gray-200"
                                />
                                <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-500 to-amber-200 p-2 flex flex-row rounded-bl-xl justify-between items-center gap-2">
                                    <p className="text-sm sm:text-md">{token.tokenChainName}</p>
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
                            <div onClick={() => handleCardClick(token)} className="flex flex-col mt-2 cursor-pointer">
                                <h2 className="text-xl font-semibold">{token.tokenName}</h2>
                                <p className="text-lg">{token.tokenSymbol}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Swap Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
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
            </Modal>

            {/* Network Switch Confirmation Modal */}
            <Modal isOpen={isConfirmModalOpen} onClose={closeConfirmModal}>
                <div className="max-w-2xl p-4 text-gray-500 bg-gray-50 rounded-xl font-mono flex flex-col sm:flex-row gap-6">
                    {/* Token Image */}
                    <div className="sm:w-1/3 flex justify-center mt-2">
                        <Image
                            src={selectedToken?.tokenLogoUrls ? selectedToken.tokenLogoUrls.replace("ipfs://", "https://ipfs.io/ipfs/") : "/poop.webp"}
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
            </Modal>

        </div>
    );
};

export default TokenCard;
