"use client";

import dynamic from "next/dynamic";

const HLSPlayer = dynamic(() => import("@/components/IndigoPlayer"), { ssr: false });

export default function HLSPlayerWrapper() {
  return <HLSPlayer />;
}
