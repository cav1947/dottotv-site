"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: { widgets?: { load: (el?: Element | null) => void } };
    instgrm?: { Embeds?: { process: () => void } };
  }
}

const PROVIDERS = {
  twitter: {
    selector: "blockquote.twitter-tweet",
    src: "https://platform.twitter.com/widgets.js",
    id: "dotto-twitter-widgets",
  },
  instagram: {
    selector: "blockquote.instagram-media",
    src: "https://www.instagram.com/embed.js",
    id: "dotto-instagram-embed",
  },
  tiktok: {
    selector: "blockquote.tiktok-embed",
    src: "https://www.tiktok.com/embed.js",
    id: "dotto-tiktok-embed",
  },
} as const;

function injectScript(src: string, id: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

export default function SocialEmbeds() {
  useEffect(() => {
    const root = document.getElementById("article-body") ?? document.body;

    const hasTwitter = !!root.querySelector(PROVIDERS.twitter.selector);
    const hasInstagram = !!root.querySelector(PROVIDERS.instagram.selector);
    const hasTikTok = !!root.querySelector(PROVIDERS.tiktok.selector);

    if (!hasTwitter && !hasInstagram && !hasTikTok) return;

    let cancelled = false;

    (async () => {
      const tasks: Promise<void>[] = [];

      if (hasTwitter) {
        if (window.twttr?.widgets) {
          window.twttr.widgets.load(root);
        } else {
          tasks.push(injectScript(PROVIDERS.twitter.src, PROVIDERS.twitter.id));
        }
      }

      if (hasInstagram) {
        if (window.instgrm?.Embeds) {
          window.instgrm.Embeds.process();
        } else {
          tasks.push(injectScript(PROVIDERS.instagram.src, PROVIDERS.instagram.id));
        }
      }

      // TikTok embed.js procesează blockquote-urile doar la load. La navigare
      // client-side scoatem scriptul existent ca să-l forțăm să se re-execute.
      if (hasTikTok) {
        const existing = document.getElementById(PROVIDERS.tiktok.id);
        if (existing) existing.remove();
        tasks.push(injectScript(PROVIDERS.tiktok.src, PROVIDERS.tiktok.id));
      }

      await Promise.all(tasks);
      if (cancelled) return;

      if (hasInstagram) window.instgrm?.Embeds?.process();
      if (hasTwitter) window.twttr?.widgets?.load(root);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
