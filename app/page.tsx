"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useWallet } from "@/context/Providers";
import Metamask from "@/components/Metamask";
import Token from "@/components/Token";
import Network from "@/components/Network";
import { networks } from "../lib/networks";
import Deploy from "@/components/Deploy";
import Creator from "@/components/Creator";
import Disclaimer from "@/components/Disclaimer";

export default function Home() {
  const { signer, address, network, isWrongNetwork, isNoWallet, isConnected, connectWallet } = useWallet();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Toggle audio play and pause
  const handleAudioPlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Audio play error:", err));
    }

    setIsPlaying(!isPlaying);
  };

  const handleUserInteract = () => {
    const audio = audioRef.current;
    const video = videoRef.current;

    if (audio) {
      audio.play().catch((err) => console.error("Audio play error:", err));
      setIsPlaying(true);
    }

    if (video) {
      video.play().catch((err) => console.error("Video play error:", err));
    }

    setShowOverlay(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video && document.visibilityState === "visible") {
      video.play().catch((err) => console.error("Video play error:", err));
    }
  }, []);

  const handleClose = () => {
    history.back();
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50 overflow-auto">
      {/* Background Video */}
      <video
        className="w-full h-full absolute inset-0 object-cover"
        ref={videoRef}
        muted
        playsInline
        loop
        preload="auto"
      >
        <source
          src="/video/survival.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Background Music */}
      <audio loop ref={audioRef}>
        <source
          src="/audio/thankyou.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Logo at Top-Left */}
      <div className="absolute top-4 left-4 max-w-20">
        <Image src="/poop.webp" width={401} height={551} alt="Ticker Tool" priority={true} />
      </div>

      {/* Deploy New Token */}
      <div className="absolute top-[3.5%] right-20">
        <Deploy signer={signer} address={address} networkChainId={network?.chainIdNumber as number} networkChainHex={network?.chainIdHex as string} networkChainName={network?.networkName as string} networkChainLogoUrls={network?.networkLogo as string} networkChainRPCUrls={network?.rpcUrl as string} networkChainExplorerUrls={network?.explorer as string} networkChainCurrencySymbol={network?.nativeCurrency as string} />
      </div>

      {/* Creator */}
      <Creator address={address} signer={signer} rpcUrl={network?.rpcUrl as string} />

      {/* Play/Pause Button at Top-Left */}
      <button
        onClick={handleAudioPlayPause}
        className="absolute top-[4.8%] right-3"
      >
        {isPlaying ? (
          <svg width="60" height="60" fill="#daa520" viewBox="-0.5 0 25 25" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6.42a3 3 0 0 0-6 0v12a3 3 0 1 0 6 0zm10 0a3 3 0 1 0-6 0v12a3 3 0 1 0 6 0z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="60" height="60" fill="#daa520" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.658 9.286c1.44.9 2.16 1.35 2.407 1.926a2 2 0 0 1 0 1.576c-.247.576-.967 1.026-2.407 1.926L9.896 18.94c-1.598.999-2.397 1.498-3.056 1.445a2 2 0 0 1-1.446-.801C5 19.053 5 18.111 5 16.226V7.774c0-1.885 0-2.827.394-3.358a2 2 0 0 1 1.446-.801c.66-.053 1.458.446 3.056 1.445z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Main */}
      {isNoWallet ? (
        showOverlay ? (
          <div className="absolute inset-0 mx-auto backdrop-blur-md flex flex-col items-center justify-center z-10">
            <Disclaimer>
              <div className="flex flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleClose}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={handleUserInteract}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                >
                  Open
                </button>
              </div>
            </Disclaimer>
          </div>
        ) : (<Metamask />)
      ) : isWrongNetwork ? showOverlay ? (
        <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-10">
          <Disclaimer>
          <div className="flex flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleClose}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={handleUserInteract}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                >
                  Open
                </button>
              </div>
          </Disclaimer>
        </div>
      ) : (
        <Network networks={networks} />
      ) : !isConnected ? showOverlay ? (
        <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-10">
          <Disclaimer>
          <div className="flex flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleClose}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={handleUserInteract}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                >
                  Open
                </button>
              </div>
          </Disclaimer>
        </div>
      ) : (
        <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center z-10">
          <button
            onClick={connectWallet}
          >
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" fill="none">
              <path stroke="goldenrod" d="M5.9 24c-1.6 0-3.1-.6-4.2-1.7S0 19.7 0 18.1s.6-3.1 1.7-4.2l3.8-3.8 2 2 2.8-2.8 1.4 1.4-2.8 2.8 1.6 1.6 2.8-2.8 1.4 1.4-2.8 2.8 2 2-3.7 3.8C9 23.3 7.5 24 5.9 24m-.4-11.1-2.3 2.3C2.4 16 2 17 2 18s.4 2 1.2 2.8c1.5 1.5 4.1 1.5 5.6 0l2.3-2.4zm13 1-8.4-8.4 3.7-3.8C14.9.6 16.5 0 18 0s3 .6 4.2 1.7S24 4.3 24 5.9s-.6 3.1-1.7 4.2zM13 5.5l5.5 5.5 2.3-2.3C21.6 7.9 22 7 22 5.9c0-1-.4-2-1.2-2.8-1.5-1.5-4-1.5-5.6 0z" />
            </svg>
          </button>
        </div>
      ) : (
        signer && showOverlay ? (
          <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-10">
            <Disclaimer>
            <div className="flex flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleClose}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={handleUserInteract}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 font-mono font-semibold text-white p-3 rounded-xl"
                >
                  Open
                </button>
              </div>
            </Disclaimer>
          </div>
        ) : (
          <div className="absolute top-[3.5%] right-44">
            <Token />
          </div>
        )
      )}
    </div>
  );
}
