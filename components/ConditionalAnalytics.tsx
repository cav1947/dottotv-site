"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

const ALLOWED_HOSTS = new Set(["dottotv.ro", "www.dottotv.ro"]);

export default function ConditionalAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(ALLOWED_HOSTS.has(window.location.hostname));
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}
