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
        <div className="flex flex-col rounded-2xl gap-5 sm:m-4 p-4 bg-gray-100 sm:flex-row text-gray-500 items-center justify-center font-mono">
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
                            className={`border-2 border-dashed rounded-lg p-4 cursor-pointer flex flex-col items-center justify-center transition-all ${dragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleClick}
                        >
                            {file ? (
                                <p className="text-center">{file.name}</p>
                            ) : (
                                <p className="text-center">
                                    Drag & drop your your token logo here, or <span className="text-blue-500 underline">click to select</span>
                                </p>
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
                            <p className="text-center mt-4 text-gray-500">Uploading logo...</p>
                        )}
                    </form>
                )}
            </div>

            {/* Initialize Token */}
            <div className="w-full bg-gray-50 rounded-2xl">
                <div className="flex px-4 py-2 flex-row gap-2">
                    <div className="w-full">
                        <label className="block mb-2 text-gray-500" htmlFor="tokenName">Token Name:</label>
                        <input
                            type="text"
                            id="tokenName"
                            name="tokenName"
                            placeholder="E.g, Pepe Token"
                            value={tokenName}
                            onChange={(e) => setTokenName(e.target.value)}
                            className="border placeholder:opacity-25 focus:outline-none p-2 w-full text-gray-500 rounded-xl"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block mb-2 text-gray-500" htmlFor="tokenSymbol">Token Symbol:</label>
                        <input
                            type="text"
                            id="tokenSymbol"
                            name="tokenSymbol"
                            placeholder="E.g, PEPE"
                            value={tokenSymbol}
                            onChange={(e) => setTokenSymbol(e.target.value)}
                            className="border placeholder:opacity-25 focus:outline-none p-2 w-full text-gray-500 rounded-xl"
                        />
                    </div>
                </div>

                <div className="w-full px-4 py-2">
                    <label className="block mb-2 text-gray-500" htmlFor="tokenDesc">Description:</label>
                    <textarea
                        id="tokenDesc"
                        name="tokenDesc"
                        placeholder="E.g, Pepe token is awesome token with great team and tokenomic..."
                        value={tokenDesc}
                        onChange={(e) => setTokenDesc(e.target.value)}
                        className="border placeholder:opacity-25 focus:outline-none p-2 w-full text-gray-500 rounded-xl"
                    />
                </div>

                <div className="flex px-4 py-2 flex-row gap-2">
                    <div className="w-full">
                        <label className="block mb-2 text-gray-500" htmlFor="creatorFee">Creator Fee:</label>
                        <input
                            type="text"
                            id="creatorFee"
                            name="creatorFee"
                            placeholder="E.g, 5 (for 5%)"
                            value={creatorFee}
                            onChange={(e) => setCreatorFee(e.target.value)}
                            className="border placeholder:opacity-25 focus:outline-none p-2 w-full text-gray-500 rounded-xl"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block mb-2 text-gray-500" htmlFor="tokenSupply">Total Supply:</label>
                        <input
                            type="text"
                            id="tokenSupply"
                            name="tokenSupply"
                            placeholder="E.g, 1000000"
                            value={tokenSupply}
                            onChange={(e) => setTokenSupply(e.target.value)}
                            className="border placeholder:opacity-25 focus:outline-none p-2 w-full text-gray-500 rounded-xl"
                        />
                    </div>
                </div>

                <div className="px-4 py-2">
                    <label className="block mb-2 text-gray-500" htmlFor="tokenPrice">Token Price:</label>
                    <input
                        type="text"
                        id="tokenPrice"
                        name="tokenPrice"
                        placeholder={`E.g, 0.0001 (price in ${networkChainCurrencySymbol})`}
                        value={tokenPrice}
                        onChange={(e) => setTokenPrice(e.target.value)}
                        className="border placeholder:opacity-25 focus:outline-none p-2 w-full text-gray-500 rounded-xl"
                    />
                </div>

                <div className="p-4">
                    <button
                        onClick={deployContract}
                        disabled={deploying || !ipfsHash || !tokenName || !tokenSymbol || !tokenDesc || !creatorFee || !tokenSupply || !tokenPrice}
                        className="w-full disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-xl"
                    >
                        {deploying ? 'Deploying...' : 'Deploy Contract'}
                    </button>
                </div>

            </div>
        </div>
    );
};

const Deploy: React.FC<DeployTokenProps> = ({ signer, address, networkChainId, networkChainHex, networkChainName, networkChainLogoUrls, networkChainRPCUrls, networkChainExplorerUrls, networkChainCurrencySymbol }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={openModal} className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl">Create</button>

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
