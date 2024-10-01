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
        <div className="fixed inset-0 p-4 rounded-t-2xl bg-gray-50 dark:bg-[#3c3c3c] top-[12%] overflow-hidden overflow-y-auto custom-scroll z-50">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Token By Creator */}
            <div className="font-mono text-gray-500 dark:text-white">
                {tokenNotFound ? (
                    <div className="flex flex-col items-center justify-center min-h-96">
                        <svg width="200" height="200" fill="rgb(249 115 22)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.353 19C18.815 19 20 17.787 20 16.292S18 13 14.833 14.937c-.042-.2 3.834-1.624 2.167-4.062-1.667-2.437-4 .875-3-1.875 1.667-3.25-2.333 2.688-4.833-3-1.514 1.625 1.973 3.25-1.514 4.875S6 14 8.333 14.938C5.68 14.938 5 16.198 5 17.194 5 18.192 5.882 19 7.653 19zM16.99 8.276c.65.31 1.206.806 1.66 1.47.659.964.888 1.894.784 2.76 1.53.624 2.566 1.988 2.566 3.786C22 18.882 19.93 21 17.353 21h-9.7C4.992 21 3 19.528 3 17.194c0-1.132.413-2.113 1.176-2.847a4 4 0 0 1-.188-.36c-.925-2.048.338-3.768 2.82-4.925q.243-.114.378-.195l-.057-.164c-.25-.707-.346-1.06-.364-1.62-.03-.898.282-1.742.938-2.446l2.071-2.224 1.224 2.782c.337.767.658 1.176.919 1.336.163.101.372.087.827-.101.098-.041.46-.205.526-.233.163-.07.303-.12.467-.163.443-.114.875-.132 1.403.095.835.357 1.241 1.119 1.254 1.884.196.09.394.166.597.263M14 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M4 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2m16 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                        </svg>
                        <p className="text-xl text-center max-w-80 font-semibold">You don&#39;t have a token yet, create one and earn royalties.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="text-left">
                                    <th className="px-4 py-2">Token Name</th>
                                    <th className="px-4 py-2">Chain</th>
                                    <th className="px-4 py-2">Token Burn</th>
                                    <th className="px-4 py-2">ETH Fees</th>
                                    <th className="px-4 py-2">Token Fees</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-100 dark:bg-[#282828] rounded-3xl">
                                {tokenData.toReversed().map((token, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{token.tokenName}</td>
                                        <td className="px-4 py-2">{token.tokenChainName}</td>
                                        <td className="px-4 py-2">{token.totalTokenBurn} {token.tokenSymbol}</td>
                                        <td className="px-4 py-2">{token.totalEthFees} {token.tokenChainCurrency}</td>
                                        <td className="px-4 py-2">{token.totalTokenFees} {token.tokenSymbol}</td>
                                        <td className="px-4 py-2">
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
        <div className="absolute bottom-[3%] right-3">
            <button
                onClick={openModal}
                className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500"
            >
                <svg width="35" height="35" fill="#fff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
