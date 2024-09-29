"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useWallet } from "@/context/Providers";
import Metamask from "@/components/Metamask";
import Token from "@/components/Token";
import Network from "@/components/Network";
import { supportedNetworks } from "@/lib/supportedNetworks";
import Deploy from "@/components/Deploy";
import Creator from "@/components/Creator";
import Disclaimer from "@/components/Disclaimer";
import Contact from "@/components/Contact";
import DarkModeToggle from "@/components/DarkMode";

export default function Home() {
  const { signer, address, network, isWrongNetwork, isNoWallet, isConnected, connectWallet } = useWallet();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch media file and convert it into a Blob URL
    async function loadMedia(type: 'video' | 'audio', fileName: string) {
      try {
        // Check if Blob URL is already stored in localStorage
        const storedBlobUrl = localStorage.getItem(type === 'video' ? 'blobVideoUrl' : 'blobAudioUrl');
        if (storedBlobUrl) {
          // Set the Blob URL from localStorage to state
          if (type === 'video') setVideoUrl(storedBlobUrl);
          if (type === 'audio') setAudioUrl(storedBlobUrl);
          return;
        }

        // Fetch media file from API
        const response = await fetch(`/api/media?type=${type}&file=${fileName}`);

        if (!response.ok) {
          throw new Error(`Failed to load ${type} file`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Store Blob URL in localStorage and set state
        if (type === 'video') {
          localStorage.setItem('blobVideoUrl', url);
          setVideoUrl(url);
        } else if (type === 'audio') {
          localStorage.setItem('blobAudioUrl', url);
          setAudioUrl(url);
        }
      } catch (error) {
        console.log(`Error loading ${type}:`, error);
      }
    }

    // Load both video and audio media
    loadMedia('video', 'shitcoin-room.mp4');
    loadMedia('audio', 'shitcoin-song.mp3');

    // Clean up Blob URLs on unmount
    return () => {
      const blobVideo = localStorage.getItem('blobVideoUrl');
      const blobAudio = localStorage.getItem('blobAudioUrl');
      if (blobVideo) {
        URL.revokeObjectURL(blobVideo);
        localStorage.removeItem('blobVideoUrl');
      }
      if (blobAudio) {
        URL.revokeObjectURL(blobAudio);
        localStorage.removeItem('blobAudioUrl');
      }
    };
  }, []);

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

  const handleOpen = () => {
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

  const handleClose = () => {
    history.back();
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video && document.visibilityState === "visible") {
      video.play().catch((err) => console.error("Video play error:", err));
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-yellow-100 dark:bg-[#282828] overflow-auto">

      {/* Background Video */}
      {isNoWallet ? <video
        className="w-full h-full absolute inset-0 object-cover"
        ref={videoRef}
        muted
        playsInline
        loop
        preload="auto"
        src="/video/shitcoin-loading.mp4"
        controls={false}
        onContextMenu={(e) => e.preventDefault()}
      >
        Your browser does not support the video tag.
      </video> : videoUrl ?
        <video
          className="w-full h-full absolute inset-0 object-cover"
          ref={videoRef}
          muted
          playsInline
          loop
          preload="auto"
          src={videoUrl}
          controls={false}
          onContextMenu={(e) => e.preventDefault()}
        >
          Your browser does not support the video tag.
        </video> : null}

      {/* Background Music */}
      {isNoWallet ? <audio
        loop
        ref={audioRef}
        src="/audio/shitcoin-loading.mp3"
        controls={false}
        onContextMenu={(e) => e.preventDefault()}
      >
        Your browser does not support the audio element.
      </audio> : audioUrl ?
        <audio
          loop
          ref={audioRef}
          src={audioUrl}
          controls={false}
          onContextMenu={(e) => e.preventDefault()}
        >
          Your browser does not support the audio element.
        </audio> : null}

      {/* Logo at Top-Left */}
      <div className="absolute top-4 left-3 max-w-20">
        <Image src="/poop.webp" width={401} height={551} alt="Ticker Tool" priority={true} />
      </div>

      {/* Dark mode */}
      <DarkModeToggle />

      {/* Main */}
      {isNoWallet ? (
        showOverlay ? (
          <div className="absolute inset-0 mx-auto backdrop-blur-md flex flex-col items-center justify-center z-10">
            <Disclaimer>
              <div className="text-white flex flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleClose}
                  className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono"
                >
                  Close
                </button>
                <button
                  onClick={handleOpen}
                  className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono"
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
            <div className="text-white flex flex-row gap-4 items-center justify-center">
              <button
                onClick={handleClose}
                className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono"
              >
                Close
              </button>
              <button
                onClick={handleOpen}
                className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono"
              >
                Open
              </button>
            </div>
          </Disclaimer>
        </div>
      ) : (
        <Network networks={supportedNetworks} />
      ) : !isConnected ? showOverlay ? (
        <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-10">
          <Disclaimer>
            <div className="text-white flex flex-row gap-4 items-center justify-center">
              <button
                onClick={handleClose}
                className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono"
              >
                Close
              </button>
              <button
                onClick={handleOpen}
                className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono"
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
              <path stroke="rgb(249 115 22)" d="M5.9 24c-1.6 0-3.1-.6-4.2-1.7S0 19.7 0 18.1s.6-3.1 1.7-4.2l3.8-3.8 2 2 2.8-2.8 1.4 1.4-2.8 2.8 1.6 1.6 2.8-2.8 1.4 1.4-2.8 2.8 2 2-3.7 3.8C9 23.3 7.5 24 5.9 24m-.4-11.1-2.3 2.3C2.4 16 2 17 2 18s.4 2 1.2 2.8c1.5 1.5 4.1 1.5 5.6 0l2.3-2.4zm13 1-8.4-8.4 3.7-3.8C14.9.6 16.5 0 18 0s3 .6 4.2 1.7S24 4.3 24 5.9s-.6 3.1-1.7 4.2zM13 5.5l5.5 5.5 2.3-2.3C21.6 7.9 22 7 22 5.9c0-1-.4-2-1.2-2.8-1.5-1.5-4-1.5-5.6 0z" />
            </svg>
          </button>
        </div>
      ) : (
        signer && showOverlay ? (
          <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-10">
            <Disclaimer>
              <div className="text-white flex flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleClose}
                  className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono"
                >
                  Close
                </button>
                <button
                  onClick={handleOpen}
                  className="w-full p-3 bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500 rounded-lg font-mono"
                >
                  Open
                </button>
              </div>
            </Disclaimer>
          </div>
        ) : (
          <>

            {/* Play/Pause Button */}
            <button
              onClick={handleAudioPlayPause}
              className="absolute bottom-[14%] right-3 p-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-800 hover:from-pink-800 hover:to-orange-500"
            >
              {isPlaying ? (
                <svg width="35" height="35" fill="none" viewBox="-0.5 0 25 25" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6.42a3 3 0 0 0-6 0v12a3 3 0 1 0 6 0zm10 0a3 3 0 1 0-6 0v12a3 3 0 1 0 6 0z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="35" height="35" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.658 9.286c1.44.9 2.16 1.35 2.407 1.926a2 2 0 0 1 0 1.576c-.247.576-.967 1.026-2.407 1.926L9.896 18.94c-1.598.999-2.397 1.498-3.056 1.445a2 2 0 0 1-1.446-.801C5 19.053 5 18.111 5 16.226V7.774c0-1.885 0-2.827.394-3.358a2 2 0 0 1 1.446-.801c.66-.053 1.458.446 3.056 1.445z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* Deploy */}
            <Deploy signer={signer} address={address} networkChainId={network?.chainIdNumber as number} networkChainHex={network?.chainIdHex as string} networkChainName={network?.networkName as string} networkChainLogoUrls={network?.networkLogo as string} networkChainRPCUrls={network?.rpcUrl as string} networkChainExplorerUrls={network?.explorer as string} networkChainCurrencySymbol={network?.nativeCurrency as string} />

            {/* Swap */}
            <Token />

            {/* Contact */}
            <Contact />

            {/* Creator */}
            <Creator address={address} signer={signer} rpcUrl={network?.rpcUrl as string} />
          </>
        )
      )}
    </div>
  );
}
