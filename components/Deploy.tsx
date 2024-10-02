import { useState, ChangeEvent, DragEvent } from 'react';
import { ethers } from 'ethers';
import Toast from './Toast';
import { deployTickerContract } from '@/lib/token';
import Image from 'next/image';

interface DeployModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose, children }) => {
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
    deployedTime: string;
}

interface DeployTokenProps {
    signer: ethers.Signer | null;
    address: string;
    networkChainId: number;
    networkChainHex: string;
    networkChainName: string;
    networkChainLogoUrls: string;
    networkChainRPCUrls: string;
    networkChainExplorerUrls: string;
    networkChainCurrencySymbol: string;
}

const DeployToken: React.FC<DeployTokenProps> = ({ signer, address, networkChainId, networkChainHex, networkChainName, networkChainLogoUrls, networkChainRPCUrls, networkChainExplorerUrls, networkChainCurrencySymbol }) => {
    const [tokenName, setTokenName] = useState<string>('');
    const [tokenSymbol, setTokenSymbol] = useState<string>('');
    const [tokenDesc, setTokenDesc] = useState<string>('');
    const [creatorFee, setCreatorFee] = useState<string>('');
    const [tokenSupply, setTokenSupply] = useState<string>('');
    const [tokenPrice, setTokenPrice] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [ipfsHash, setIpfsHash] = useState<string>('');
    const [deploying, setDeploying] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile); // Set the file in state
            await uploadFile(selectedFile); // Automatically trigger file upload
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile); // Set the file in state
            await uploadFile(droppedFile); // Automatically trigger file upload
        }
    };

    const handleClick = () => {
        // Trigger the hidden file input when the area is clicked
        document.getElementById('fileInput')?.click();
    };

    // Upload function to handle the file upload logic
    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true); // Set uploading state to true

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setIpfsHash(data.ipfsHash); // Set the IPFS hash on success
                setToast({ message: 'File uploaded successfully', type: 'success' });
            } else {
                setToast({ message: 'Something went wrong', type: 'error' });
            }
        } catch (err) {
            setToast({ message: 'Error uploading file', type: 'error' });
        } finally {
            setUploading(false); // Set uploading state to false
        }
    };

    const deployContract = async () => {
        setDeploying(true);

        try {
            const ethReserve = Number(tokenPrice) * Number(tokenSupply);

            const deployedAddress = await deployTickerContract(tokenName, tokenSymbol, `ipfs://${ipfsHash}`, tokenDesc, creatorFee, ethers.parseEther(String(ethReserve)), ethers.parseUnits(tokenSupply, 18), signer as ethers.Signer);

            const deploymentSheetData: TokenContract = {
                tokenAddress: deployedAddress,
                tokenName: tokenName,
                tokenSymbol: tokenSymbol,
                tokenDescription: tokenDesc,
                tokenLogoUrls: `ipfs://${ipfsHash}`,
                tokenChainName: networkChainName,
                tokenChainId: networkChainId,
                tokenChainHex: networkChainHex,
                tokenChainLogoUrls: networkChainLogoUrls,
                tokenChainCurrency: networkChainCurrencySymbol,
                tokenChainRPCUrls: networkChainRPCUrls,
                tokenChainExplorerUrls: networkChainExplorerUrls,
                deployer: address,
                deployedTime: new Date().toISOString(),
            };

            const deploymentTGData = {
                tokenAddress: deployedAddress,
                tokenChainId: networkChainId,
                deployer: address,
            };

            // Save details to Google Sheets via API route
            await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deploymentSheetData),
            });

            // Send details via Telegram via API route
            await fetch('/api/telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deploymentTGData),
            });

            // Refresh the page after the transaction is confirmed
            window.location.reload();
        } catch (error) {
            console.error('Contract deployment failed:', error);
        } finally {
            setDeploying(false);
        }
    };

    return (
        <div className="fixed sm:flex sm:flex-row sm:gap-4 sm:items-center inset-0 p-4 rounded-t-2xl font-mono text-gray-500 bg-gray-50 dark:text-white dark:bg-[#3c3c3c] top-[12%] overflow-hidden overflow-y-auto custom-scroll z-50">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            {/* Upload token Logo */}
            <div className="w-full flex flex-col">
                {ipfsHash ? (
                    <div className="w-full overflow-hidden">
                        <Image
                            src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                            alt={tokenName}
                            width={500}
                            height={500}
                            priority={true}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                ) : (
                    <form className="w-full">
                        {/* Drag and Drop area */}
                        <div
                            className={`rounded-2xl p-4 cursor-pointer flex flex-col items-center justify-center transition-all ${dragActive ? 'bg-blue-100' : ''
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleClick}
                        >
                            {file ? (
                                <p className="text-center">{file.name}</p>
                            ) : (
                                <div className="flex flex-col p-7 justify-center items-center">
                                    <svg width={200} height={200} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 1C2.355 1 1 2.355 1 4v1h1V4c0-1.11.89-2 2-2h1V1zm2 0v1h4V1zm5 0v1h1c1.11 0 2 .89 2 2v1h1V4c0-1.645-1.355-3-3-3zM6 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1M1 6v4h1V6zm13 0v4h1V6zM9.5 8l-2 2L6 9l-2 2v.5c0 .5.5.5.5.5h7s.473-.035.5-.5v-1zM1 11v1c0 1.645 1.355 3 3 3h1v-1H4c-1.11 0-2-.89-2-2v-1zm13 0v1c0 1.11-.89 2-2 2h-1v1h1c1.645 0 3-1.355 3-3v-1zm-8 3v1h4v-1zm0 0" fill="#2e3434" fillOpacity=".349" />
                                    </svg>
                                    <p className="text-center max-w-60">
                                        Drag and drop your token logo, or <span className="text-blue-500 underline">browse</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        {/* Upload logo */}
                        {uploading && (
                            <p className="text-center mt-4">Uploading logo...</p>
                        )}
                    </form>
                )}
            </div>

            {/* Initialize Token */}
            <div className="w-full">
                <div className="sm:p-4 sm:bg-white sm:dark:bg-[#393939] sm:rounded-2xl">
                    <div className="flex py-2 flex-row gap-2">
                        <div className="w-full">
                            <label className="block mb-2" htmlFor="tokenName">Token Name:</label>
                            <input
                                type="text"
                                id="tokenName"
                                name="tokenName"
                                placeholder="E.g, Pepe Token"
                                value={tokenName}
                                onChange={(e) => setTokenName(e.target.value)}
                                className="bg-gray-100 dark:bg-[#282828] placeholder:opacity-25 focus:outline-none p-2 w-full rounded-xl"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2" htmlFor="tokenSymbol">Token Symbol:</label>
                            <input
                                type="text"
                                id="tokenSymbol"
                                name="tokenSymbol"
                                placeholder="E.g, PEPE"
                                value={tokenSymbol}
                                onChange={(e) => setTokenSymbol(e.target.value)}
                                className="bg-gray-100 dark:bg-[#282828] placeholder:opacity-25 focus:outline-none p-2 w-full rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="w-full py-2">
                        <label className="block mb-2" htmlFor="tokenDesc">Description:</label>
                        <textarea
                            id="tokenDesc"
                            name="tokenDesc"
                            placeholder="E.g, Pepe token is awesome token with great team and tokenomic..."
                            value={tokenDesc}
                            onChange={(e) => setTokenDesc(e.target.value)}
                            className="bg-gray-100 dark:bg-[#282828] placeholder:opacity-25 focus:outline-none p-2 w-full rounded-xl"
                        />
                    </div>

                    <div className="flex py-2 flex-row gap-2">
                        <div className="w-full">
                            <label className="block mb-2" htmlFor="creatorFee">Creator Fee:</label>
                            <input
                                type="text"
                                id="creatorFee"
                                name="creatorFee"
                                placeholder="E.g, 5 (for 5%)"
                                value={creatorFee}
                                onChange={(e) => setCreatorFee(e.target.value)}
                                className="bg-gray-100 dark:bg-[#282828] placeholder:opacity-25 focus:outline-none p-2 w-full rounded-xl"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2" htmlFor="tokenSupply">Total Supply:</label>
                            <input
                                type="text"
                                id="tokenSupply"
                                name="tokenSupply"
                                placeholder="E.g, 1000000"
                                value={tokenSupply}
                                onChange={(e) => setTokenSupply(e.target.value)}
                                className="bg-gray-100 dark:bg-[#282828] placeholder:opacity-25 focus:outline-none p-2 w-full rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="py-2">
                        <label className="block mb-2" htmlFor="tokenPrice">Token Price:</label>
                        <input
                            type="text"
                            id="tokenPrice"
                            name="tokenPrice"
                            placeholder={`E.g, 0.0001 (price in ${networkChainCurrencySymbol})`}
                            value={tokenPrice}
                            onChange={(e) => setTokenPrice(e.target.value)}
                            className="bg-gray-100 dark:bg-[#282828] placeholder:opacity-25 focus:outline-none p-2 w-full rounded-xl"
                        />
                    </div>
                </div>

                <button
                    onClick={deployContract}
                    disabled={deploying || !ipfsHash || !tokenName || !tokenSymbol || !tokenDesc || !creatorFee || !tokenSupply || !tokenPrice}
                    className="w-full mt-4 disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-xl"
                >
                    {deploying ? 'Deploying...' : 'Deploy Contract'}
                </button>

            </div>
        </div>
    );
};

const Deploy: React.FC<DeployTokenProps> = ({ signer, address, networkChainId, networkChainHex, networkChainName, networkChainLogoUrls, networkChainRPCUrls, networkChainExplorerUrls, networkChainCurrencySymbol }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="absolute top-[5.6%] right-20">
            <button onClick={openModal} className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono">Create</button>

            <DeployModal isOpen={isModalOpen} onClose={closeModal}>
                <DeployToken
                    signer={signer}
                    address={address}
                    networkChainId={networkChainId}
                    networkChainHex={networkChainHex}
                    networkChainName={networkChainName}
                    networkChainLogoUrls={networkChainLogoUrls}
                    networkChainRPCUrls={networkChainRPCUrls}
                    networkChainExplorerUrls={networkChainExplorerUrls}
                    networkChainCurrencySymbol={networkChainCurrencySymbol}
                />
            </DeployModal>
        </div>
    );
};

export default Deploy;
