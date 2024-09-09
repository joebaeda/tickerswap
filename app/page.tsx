"use client";

import FloatingMenu from "@/components/FloatingMenu";
import NoWalletDetected from "@/components/NoWalletDetected";
import WrongNetwork from "@/components/WrongNetwork";
import { useWallet, WalletButton } from "@/context/WalletContextProvider";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { signer, isNoWallet, isConnected, isCorrectNetwork } = useWallet();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => console.error("Video play error:", err));
    }
  }, []);


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

      {/* Play/Pause Button at Top-Left */}
      <button
        onClick={handleAudioPlayPause}
        className="absolute top-4 right-4"
      >
        {isPlaying ? <svg width="40" height="40" viewBox="-0.5 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6.42a3 3 0 0 0-6 0v12a3 3 0 1 0 6 0zm10 0a3 3 0 1 0-6 0v12a3 3 0 1 0 6 0z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg> : <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.658 9.286c1.44.9 2.16 1.35 2.407 1.926a2 2 0 0 1 0 1.576c-.247.576-.967 1.026-2.407 1.926L9.896 18.94c-1.598.999-2.397 1.498-3.056 1.445a2 2 0 0 1-1.446-.801C5 19.053 5 18.111 5 16.226V7.774c0-1.885 0-2.827.394-3.358a2 2 0 0 1 1.446-.801c.66-.053 1.458.446 3.056 1.445z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
        </svg>}
      </button>

      {/* Wallet and Floating Menu */}
      {isNoWallet ? (
        <NoWalletDetected />
      ) : !isCorrectNetwork ? (
        <WrongNetwork />
      ) : !isConnected ? (
        <WalletButton />
      ) : (
        signer && <FloatingMenu />
      )}
    </div>
  );
}
