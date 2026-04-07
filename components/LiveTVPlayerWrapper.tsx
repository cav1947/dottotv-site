"use client";

import dynamic from "next/dynamic";

const LiveTVPlayer = dynamic(() => import("./LiveTVPlayer"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3">📺</div>
        <p className="text-gray-400 text-sm">Se încarcă player-ul...</p>
      </div>
    </div>
  ),
});

export default function LiveTVPlayerWrapper({ streamUrl }: { streamUrl?: string }) {
  return <LiveTVPlayer streamUrl={streamUrl} />;
}
