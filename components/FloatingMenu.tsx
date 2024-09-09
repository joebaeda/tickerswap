"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Swap from "./Swap";
import { useWallet } from "@/context/WalletContextProvider";
import Discover from "./Discover";
import Transaction from "./Transaction";
import Lottery from "./Lottery";
import Disclaimer from "./Disclaimer";
import { yourToken } from "@/contracts/YourToken";

const FloatingMenu = () => {
    const [modalContent, setModalContent] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { signer, address, balances } = useWallet();
    const tokenAddress = yourToken;

    const handleMenuClick = (content: string) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const renderModalContent = () => {
        if (modalContent === "S") {
            // You can pass necessary props to Swap component here
            return <Swap signer={signer} tokenAddress={tokenAddress} addressConnected={address} addressBalances={balances} />;
        } else if (modalContent === "D") {
            return <Discover tokenAddress={tokenAddress} />
        } else if (modalContent === "T") {
            return <Transaction tokenAddress={tokenAddress} />
        } else if (modalContent === "L") {
            return <Lottery />
        } else if (modalContent === "P") {
            return <Disclaimer />
        }
        return <p>{modalContent}</p>;
    };

    return (
        <div className="fixed bottom-0 w-full">
            <div className="grid h-full w-full gap-4 grid-cols-5 mx-auto bg-[#4f351f] bg-opacity-50">
                <button onClick={() => handleMenuClick("P")} className="text-3xl inline-flex flex-col items-center justify-center p-4 hover:bg-[#935018]">
                    <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m21.406 5.086-9-4a1 1 0 0 0-.812 0l-9 4A1 1 0 0 0 2 6v.7a18.51 18.51 0 0 0 9.515 16.17 1 1 0 0 0 .97 0A18.51 18.51 0 0 0 22 6.7V6a1 1 0 0 0-.594-.914M20 6.7a16.51 16.51 0 0 1-8 14.141A16.51 16.51 0 0 1 4 6.7v-.05l8-3.556 8 3.556ZM11 10h2v8h-2Zm0-4h2v2h-2Z" />
                    </svg>
                </button>
                <button onClick={() => handleMenuClick("D")} className="text-3xl inline-flex flex-col items-center justify-center p-4 hover:bg-[#935018]">
                    <svg width="32" height="32" fill="#fff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0m0 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2m1.3 18.5v2.6h-2.6v-2.6zM16 9a4 4 0 0 1 1 7.874V19h-2v-4h1a2 2 0 1 0-1.995-2.15L14 13h-2a4 4 0 0 1 4-4" />
                    </svg>
                </button>
                <button onClick={() => handleMenuClick("S")} className="text-3xl inline-flex flex-col items-center justify-center p-4 hover:bg-[#935018]">
                    <svg width="32" height="32" fill="#fff" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h16v16H0z" />
                        <path d="M0 11h11.2l-2.6 2.6L10 15l6-6H0zm4.8-6 2.6-2.6L6 1 0 7h16V5z" />
                    </svg>
                </button>
                <button onClick={() => handleMenuClick("T")} className="text-3xl inline-flex flex-col items-center justify-center p-4 hover:bg-[#935018]">
                    <svg width="32" height="32" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M904 747H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M165.7 621.8l39.7 39.5c3.1 3.1 8.2 3.1 11.3 0l234.7-233.9 97.6 97.3a32.11 32.11 0 0 0 45.2 0l264.2-263.2c3.1-3.1 3.1-8.2 0-11.3l-39.7-39.6a8.03 8.03 0 0 0-11.3 0l-235.7 235-97.7-97.3a32.11 32.11 0 0 0-45.2 0L165.7 610.5a7.94 7.94 0 0 0 0 11.3" />
                    </svg>
                </button>
                <button onClick={() => handleMenuClick("L")} className="text-3xl inline-flex flex-col items-center justify-center p-4 hover:bg-[#935018]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.13 11.34a2.206 2.206 0 0 0-2.68-2.68c-.77.19-1.4.82-1.59 1.59a2.206 2.206 0 0 0 2.68 2.68c.78-.19 1.41-.82 1.59-1.59" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.01 17.19a8.73 8.73 0 0 0 2.78-6.4 8.79 8.79 0 1 0-17.58 0c0 2.54 1.08 4.83 2.81 6.43" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 14.55c-.92-.98-1.49-2.3-1.49-3.76C6.51 7.76 8.97 5.3 12 5.3s5.49 2.46 5.49 5.49c0 1.46-.57 2.77-1.49 3.76m-5.7 2.11-1.44 1.79c-1.14 1.43-.13 3.54 1.7 3.54h2.87c1.83 0 2.85-2.12 1.7-3.54l-1.44-1.79c-.86-1.09-2.52-1.09-3.39 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent || ''}>
                {renderModalContent()}
            </Modal>
        </div>
    );
};

export default FloatingMenu;