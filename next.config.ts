import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Aplică pe toate rutele
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            // Permite browser-ului să încarce media și să facă fetch către live.dottotv.ro
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com https://cdn.onesignal.com https://api.onesignal.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://onesignal.com https://*.onesignal.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob: https://live.dottotv.ro https://dottotv.ro",
              "connect-src 'self' https://live.dottotv.ro https://dottotv.ro https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://onesignal.com https://*.onesignal.com https://api.onesignal.com https://va.vercel-scripts.com",
              "frame-src 'self' https://www.google.com https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://youtube-nocookie.com https://www.facebook.com https://facebook.com https://www.instagram.com https://instagram.com https://www.tiktok.com https://tiktok.com https://www.twitter.com https://twitter.com https://www.x.com https://x.com https://player.vimeo.com https://vimeo.com https://www.dailymotion.com https://dailymotion.com https://player.twitch.tv https://www.twitch.tv https://onesignal.com https://*.onesignal.com https://redirectioneazaimpozit.ro",
              "worker-src 'self' blob: https://cdn.onesignal.com https://api.onesignal.com",
            ].join("; "),
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dottotv.ro", pathname: "/**" },
      { protocol: "https", hostname: "admin.dottotv.ro", pathname: "/**" },
      { protocol: "https", hostname: "secure.gravatar.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
    ],
  },
};

export default nextConfig;
