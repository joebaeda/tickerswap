import React from 'react';

const Metamask: React.FC = () => {
    const isMetamask = typeof window.ethereum !== 'undefined';

    if (isMetamask) {
        return null; // Don't render anything if the wallet is installed
    }

    return (
        <div className="fixed -bottom-4">
            <a
                href="https://metamask.io/download.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl"
            >
                <svg width="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="rgb(249 115 22)" d="m503.467 110.933-85.333-64a21.33 21.33 0 0 0-12.8-4.267h-128V21.333C277.333 9.551 267.782 0 256 0s-21.333 9.551-21.333 21.333v21.333h-128c-11.782 0-21.333 9.551-21.333 21.333v128c0 11.782 9.551 21.333 21.333 21.333h128v21.333h-128a21.33 21.33 0 0 0-12.8 4.267l-85.333 64c-11.378 8.533-11.378 25.6 0 34.133l85.333 64a21.33 21.33 0 0 0 12.8 4.267h128v85.333c0 11.782 9.551 21.333 21.333 21.333s21.333-9.551 21.333-21.333v-85.333h128c11.782 0 21.333-9.551 21.333-21.333V256c0-11.782-9.551-21.333-21.333-21.333h-128v-21.333h128c4.616 0 9.107-1.497 12.8-4.267l85.333-64c11.378-8.534 11.378-25.6.001-34.134" />
                    <path fill="#472a1b" stroke="#fff" strokeWidth="8" d="M 409 385 H 104 l -84 -66 l 83 -63 h 306 z m -7 -195 H 104 V 62 h 296 l 94 68 z" />
                    <text x="56%" y="25%" dominantBaseline="middle" fontFamily="monospace" textAnchor="middle" fontSize="29" fontWeight="bold" fill="#fff">Please Install Wallet</text>
                    <text x="44%" y="63%" dominantBaseline="middle" fontFamily="monospace" textAnchor="middle" fontSize="29" fontWeight="bold" fill="#fff">Please Install Wallet</text>
                </svg>

            </a>
        </div>

    );
};

export default Metamask;
