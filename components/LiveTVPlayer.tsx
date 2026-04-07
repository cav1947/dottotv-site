"use client";

import { useEffect, useRef } from "react";

interface Props {
  streamUrl?: string;
}

export default function LiveTVPlayer({ streamUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const url = streamUrl || process.env.NEXT_PUBLIC_LIVE_STREAM_URL;
    if (!url || !videoRef.current) return;

    // HLS.js pentru stream-uri HLS (M3U8)
    // Se încarcă dinamic pentru SSR compatibility
    import("hls.js").then((Hls) => {
      const HlsClass = Hls.default;
      if (HlsClass.isSupported() && videoRef.current) {
        const hls = new HlsClass({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
        return () => hls.destroy();
      } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari nativ HLS
        videoRef.current.src = url;
      }
    }).catch(() => {
      // HLS.js nu e instalat, încearcă nativ
      if (videoRef.current) {
        videoRef.current.src = url || "";
      }
    });
  }, [streamUrl]);

  return (
    <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl aspect-video">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        playsInline
        className="w-full h-full"
        poster="/images/live-poster.jpg"
      >
        <p className="absolute inset-0 flex items-center justify-center text-white text-sm p-4">
          Browserul tău nu suportă redarea video. Actualizează browserul.
        </p>
      </video>

      {/* Live badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        LIVE
      </div>

      {/* Overlay mesaj dacă nu există stream */}
      {!streamUrl && !process.env.NEXT_PUBLIC_LIVE_STREAM_URL && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-white text-xl font-bold font-playfair mb-2">
              LIVE TV DottoTV
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Transmisiunea va fi disponibilă în curând. Revino mai târziu.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
