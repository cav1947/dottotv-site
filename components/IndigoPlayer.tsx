"use client";

import Script from "next/script";
import { useRef, useEffect, useCallback } from "react";

const STREAM_URL = "https://live.dottotv.ro/index.m3u8";

export default function IndigoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const initPlayer = useCallback(() => {
    if (initialized.current || !containerRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IG = (window as any).IndigoPlayer;
    if (!IG) return;
    initialized.current = true;
    IG.init(containerRef.current, {
      sources: [{ type: "hls", src: STREAM_URL }],
      autoplay: true,
      ui: { pip: true },
    });
  }, []);

  // Dacă scriptul era deja în cache și onLoad nu mai pornește
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).IndigoPlayer) initPlayer();
  }, [initPlayer]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/indigo-player@1/lib/indigo-player.js"
        strategy="afterInteractive"
        onLoad={initPlayer}
      />
      {/* Placeholder vizibil până se inițializează playerul */}
      <div className="relative w-full aspect-video bg-black">
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />
        {/* Spinner de loading peste player */}
        <div
          id="player-loading"
          className="absolute inset-0 flex flex-col items-center justify-center bg-black pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-500 rounded-full animate-spin mb-4" />
          <p className="text-white/60 text-sm">Se conectează la stream...</p>
        </div>
      </div>
    </>
  );
}
