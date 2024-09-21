import { sendRoyalty, totalETHFee, totalTokenBurn, totalTokenFee } from "@/lib/token";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Toast from "./Toast";

interface CreatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose, children }) => {
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
                        <path fill="#daa520" d="M451 308.9 120.7 414.1c-1.3.4-2.7-.3-3.1-1.6L59.3 229.7c-.4-1.3.3-2.7 1.6-3.1l330.3-105.2c1.3-.4 2.7.3 3.1 1.6l58.2 182.8c.5 1.3-.2 2.7-1.5 3.1" />
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

interface TokenByCreatorProps {
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
    tokenChainName: string;
    tokenChainCurrency: string;
    totalTokenBurn: string;
    totalEthFees: string;
    totalTokenFees: string;
    isWithdraw: boolean;
    isGotRoyalty: boolean;
}

interface CreatorCardProps {
    signer: ethers.Signer | null;
    address: string;
    rpcUrl: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ signer, address, rpcUrl }) => {
    const [tokenNotFound, setTokenNotFound] = useState(false);
    const [tokenByCreator, setTokenByCreator] = useState<TokenContract[]>([]);
    const [tokenData, setTokenData] = useState<TokenByCreatorProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);

    // Get list of tokens by creator address
    useEffect(() => {
        const storedData = localStorage.getItem("contractData");
        if (storedData) {
            const data = JSON.parse(storedData);
            const filtered = data.filter((token: TokenContract) =>
                token.deployer.toLowerCase() === address.toLowerCase()
            );

            setTokenByCreator(filtered);

            if (filtered.length === 0) {
                setTokenNotFound(true);
            } else {
                setTokenNotFound(false);
            }
        } else {
            setTokenNotFound(true);
        }
    }, [address]);

    useEffect(() => {
        const fetchTokenData = async () => {
            const dataPromises = tokenByCreator.map(async (token: TokenContract) => {
                const totalTokenBurnValue = await totalTokenBurn(token.tokenAddress, token.tokenChainRPCUrls);
                const totalEthFeesValue = await totalETHFee(token.tokenAddress, token.tokenChainRPCUrls);
                const totalTokenFeesValue = await totalTokenFee(token.tokenAddress, token.tokenChainRPCUrls);

                return {
                    tokenAddress: token.tokenAddress,
                    tokenName: token.tokenName,
                    tokenSymbol: token.tokenSymbol,
                    tokenChainName: token.tokenChainName,
                    tokenChainCurrency: token.tokenChainCurrency,
                    totalTokenBurn: ethers.formatEther(totalTokenBurnValue),
                    totalEthFees: ethers.formatEther(totalEthFeesValue),
                    totalTokenFees: ethers.formatEther(totalTokenFeesValue),
                    isWithdraw: token.tokenChainRPCUrls === rpcUrl ? true : false,
                    isGotRoyalty: totalTokenFeesValue > BigInt(0) ? true : false,
                };

            });

            const resolvedData = await Promise.all(dataPromises);
            setTokenData(resolvedData);
        };

        fetchTokenData();
    }, [rpcUrl, tokenByCreator]);

    // Withdraw Royalty
    const withdraw = async (tokenAddress: string) => {
        try {
            setLoading(true);
            await sendRoyalty(tokenAddress, signer as ethers.Signer);
        } catch (error) {
            setToast({message: "No Royalties Available to Withdraw", type: "error"});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 p-4 rounded-t-2xl bg-gray-50 top-[21%] overflow-hidden overflow-y-auto custom-scroll z-50">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Token By Creator */}
            <div className="font-mono text-gray-500">
                {tokenNotFound ? (
                    <div className="flex flex-col items-center justify-center min-h-96">
                        <svg width="200" height="200" fill="goldenrod" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.353 19C18.815 19 20 17.787 20 16.292S18 13 14.833 14.937c-.042-.2 3.834-1.624 2.167-4.062-1.667-2.437-4 .875-3-1.875 1.667-3.25-2.333 2.688-4.833-3-1.514 1.625 1.973 3.25-1.514 4.875S6 14 8.333 14.938C5.68 14.938 5 16.198 5 17.194 5 18.192 5.882 19 7.653 19zM16.99 8.276c.65.31 1.206.806 1.66 1.47.659.964.888 1.894.784 2.76 1.53.624 2.566 1.988 2.566 3.786C22 18.882 19.93 21 17.353 21h-9.7C4.992 21 3 19.528 3 17.194c0-1.132.413-2.113 1.176-2.847a4 4 0 0 1-.188-.36c-.925-2.048.338-3.768 2.82-4.925q.243-.114.378-.195l-.057-.164c-.25-.707-.346-1.06-.364-1.62-.03-.898.282-1.742.938-2.446l2.071-2.224 1.224 2.782c.337.767.658 1.176.919 1.336.163.101.372.087.827-.101.098-.041.46-.205.526-.233.163-.07.303-.12.467-.163.443-.114.875-.132 1.403.095.835.357 1.241 1.119 1.254 1.884.196.09.394.166.597.263M14 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M4 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2m16 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                        </svg>
                        <p className="text-xl text-center max-w-80 font-semibold">You don&#39;t have a token yet, create one and earn royalties.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="text-left">
                                    <th className="px-4 py-2 border">Token Name</th>
                                    <th className="px-4 py-2 border">Chain</th>
                                    <th className="px-4 py-2 border">Token Burn</th>
                                    <th className="px-4 py-2 border">ETH Fees</th>
                                    <th className="px-4 py-2 border border-r-0">Token Fees</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tokenData.toReversed().map((token, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border">{token.tokenName}</td>
                                        <td className="px-4 py-2 border">{token.tokenChainName}</td>
                                        <td className="px-4 py-2 border">{token.totalTokenBurn} {token.tokenSymbol}</td>
                                        <td className="px-4 py-2 border">{token.totalEthFees} {token.tokenChainCurrency}</td>
                                        <td className="px-4 py-2 border border-r-0">{token.totalTokenFees} {token.tokenSymbol}</td>
                                        <td className="px-4 py-2 border border-l-0">
                                            {token.isWithdraw && token.isGotRoyalty ? (
                                                <button
                                                    onClick={() => withdraw(token.tokenAddress)}
                                                    disabled={loading}
                                                    className="w-full bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                                                >
                                                    {loading ? "Withdrawing..." : "Withdraw Royalty"}
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="w-full bg-gray-300 font-mono font-semibold text-white p-3 rounded-xl"
                                                >
                                                    Withdraw Royalty
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}

            </div>
        </div>
    );
};

const Creator: React.FC<CreatorCardProps> = ({ signer, address, rpcUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="absolute bottom-[4%] right-5">
            <button
                onClick={openModal}
            >
                <svg width="60" height="60" fill="#fff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path fill="goldenrod" d="m 21.125 4 l -1.656 0.625 c -1.864 0.703 -3.074 1.43 -3.875 2.188 a 5.1 5.1 0 0 0 -1.375 2.218 c -0.196 0.63 -0.274 0.996 -0.406 1.188 c -0.118 0.168 -0.32 0.37 -0.97 0.562 c -0.011 -0.008 -0.09 -0.058 -0.093 -0.062 h -0.031 a 4.3 4.3 0 0 0 -1.625 -0.625 c -1.664 -0.281 -3.406 0.445 -4.375 2 l -0.032 0.031 a 5.76 5.76 0 0 0 -0.75 3.625 c 0.051 0.406 0.153 0.82 0.313 1.219 a 4.53 4.53 0 0 0 -3.625 2.25 h -0.031 c -1.219 2.152 -0.477 4.93 1.687 6.156 h 0.032 v 0.031 c 0.113 0.055 1.445 0.758 3.437 1.375 S 12.531 28 16 28 s 6.254 -0.578 8.25 -1.187 c 1.973 -0.606 3.082 -1.2 3.469 -1.438 l 0.031 -0.031 c 2.133 -1.239 2.852 -3.965 1.625 -6.063 h 0.031 a 4.36 4.36 0 0 0 -2.5 -2.031 c 0 -0.004 -0.031 0.004 -0.031 0 a 4.42 4.42 0 0 0 -2.094 -2.687 c 0.137 -0.438 0.219 -0.946 0.219 -1.563 c 0 -1.16 -0.414 -2.137 -0.969 -2.844 s -1.222 -1.18 -1.781 -1.625 s -1.008 -0.855 -1.25 -1.25 c -0.242 -0.394 -0.363 -0.77 -0.219 -1.531 Z" />
                    <path d="m21.125 4-1.656.625c-1.864.703-3.074 1.43-3.875 2.188a5.1 5.1 0 0 0-1.375 2.218c-.196.63-.274.996-.406 1.188-.118.168-.32.37-.97.562-.011-.008-.09-.058-.093-.062h-.031a4.3 4.3 0 0 0-1.625-.625c-1.664-.281-3.406.445-4.375 2l-.032.031a5.76 5.76 0 0 0-.75 3.625c.051.406.153.82.313 1.219a4.53 4.53 0 0 0-3.625 2.25h-.031c-1.219 2.152-.477 4.93 1.687 6.156h.032v.031c.113.055 1.445.758 3.437 1.375S12.531 28 16 28s6.254-.578 8.25-1.187c1.973-.606 3.082-1.2 3.469-1.438l.031-.031c2.133-1.239 2.852-3.965 1.625-6.063h.031a4.36 4.36 0 0 0-2.5-2.031c0-.004-.031.004-.031 0a4.42 4.42 0 0 0-2.094-2.687c.137-.438.219-.946.219-1.563 0-1.16-.414-2.137-.969-2.844s-1.222-1.18-1.781-1.625-1.008-.855-1.25-1.25c-.242-.394-.363-.77-.219-1.531Zm-2.25 3.188c.094.417.234.824.438 1.156.472.77 1.105 1.258 1.687 1.719.582.46 1.125.902 1.469 1.343.343.442.531.864.531 1.594 0 .48-.055.773-.125 1-2.727-.398-5.113-1.086-6.875-1.75-.352-.133-.66-.273-.969-.406a2.8 2.8 0 0 0 .438-.5c.449-.653.511-1.285.656-1.75s.309-.836.844-1.344c.32-.305 1.21-.7 1.906-1.062m-8.562 4.78c.44-.003.894.134 1.312.407.55.383 1.73.984 3.688 1.719a35 35 0 0 0 7.718 1.937h.032c.695.086 1.269.496 1.625 1.094-.356.066-.723.16-1.063.313-.05.023-.105.007-.156.03-.04.012-.047.024-.063.032-.031.016-.062.016-.093.031-.028.012-.06.047-.094.063q-.129.058-.375.156c-.324.137-.809.313-1.438.5-1.258.371-3.086.75-5.406.75-1.723 0-3.195-.195-4.344-.437-.36-.086-.707-.18-1.031-.282-.652-.207-1.258-.504-1.25-.5-.969-.652-1.363-1.437-1.469-2.281-.105-.844.13-1.742.5-2.375.469-.754 1.172-1.148 1.906-1.156m-4.032 6.97c.477-.036.977.082 1.438.343.008.004.023.028.031.032.055.03.125.062.188.093.125.067.269.133.468.219q.598.258 1.656.563c.25.07.555.148.844.218.106.028.203.067.313.094.011.004.02-.004.031 0 .398.102.793.191 1.188.25v-.031A22 22 0 0 0 16 21c2.535 0 4.559-.426 5.969-.844.707-.21 1.273-.433 1.656-.593.14-.06.219-.114.313-.157h.093l.032-.031.187-.094c1.242-.664 2.734-.27 3.438.969v.031c.683 1.168.289 2.68-.938 3.375h-.031v.032c-.078.046-1.203.66-3.032 1.218C21.86 25.465 19.25 26 16 26s-5.855-.527-7.687-1.094c-1.81-.562-2.715-1.074-3.063-1.25-.016-.008-.02-.023-.031-.031-1.196-.707-1.567-2.184-.875-3.406.347-.582.867-1.016 1.468-1.188.153-.043.31-.082.47-.093" />
                </svg>

            </button>

            <CreatorModal isOpen={isModalOpen} onClose={closeModal}>
                <CreatorCard signer={signer} rpcUrl={rpcUrl} address={address} />
            </CreatorModal>
        </div>
    );
};

export default Creator;
