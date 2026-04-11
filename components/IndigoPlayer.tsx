"use client";

import { useRef, useEffect, useState } from "react";

const STREAM_URL = process.env.NEXT_PUBLIC_LIVE_STREAM_URL ?? "https://live.dottotv.ro/index.m3u8";

export default function HLSPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari și browsere cu suport HLS nativ
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = STREAM_URL;
      video.play().catch(() => {});
      setLoading(false);
      return;
    }

    // Dynamic import — rulează doar pe client, niciodată pe server
    import("hls.js").then(({ default: Hls }) => {
      if (!Hls.isSupported()) {
        setError(true);
        setLoading(false);
        return;
      }

      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hlsRef.current = hls;

      hls.loadSource(STREAM_URL);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        setError(false);
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_: unknown, data: { fatal: boolean; type: string }) => {
        if (data.fatal) {
          setError(true);
          setLoading(false);
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad();
          } else {
            hls.destroy();
          }
        }
      });
    });

    return () => {
      hlsRef.current?.destroy();
    };
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay
        playsInline
        crossOrigin="anonymous"
        style={{ display: "block" }}
      />

      {/* Spinner loading */}
      {loading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black pointer-events-none">
          <div className="w-12 h-12 border-4 border-white/20 border-t-red-500 rounded-full animate-spin mb-4" />
          <p className="text-white/60 text-sm">Se conectează la stream...</p>
        </div>
      )}

      {/* Eroare */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 pointer-events-none">
          <svg className="w-10 h-10 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
              d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.98L13.75 4a2 2 0 00-3.5 0l-6.25 11.02A2 2 0 005.07 19z" />
          </svg>
          <p className="text-white/80 text-sm font-medium">Eroare la conectarea stream-ului</p>
          <p className="text-white/40 text-xs mt-1">Verificați conexiunea și reîncărcați pagina</p>
        </div>
      )}
    </div>
  );
}
