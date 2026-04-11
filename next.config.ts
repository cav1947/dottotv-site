import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.68.107", "10.111.0.10"],
  async rewrites() {
    return [
      { source: "/wp-admin", destination: "http://85.120.25.136/wp-admin" },
      { source: "/wp-admin/:path*", destination: "http://85.120.25.136/wp-admin/:path*" },
      { source: "/wp-login.php", destination: "http://85.120.25.136/wp-login.php" },
      { source: "/wp-content/:path*", destination: "http://85.120.25.136/wp-content/:path*" },
      { source: "/wp-includes/:path*", destination: "http://85.120.25.136/wp-includes/:path*" },
    ];
  },
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob: https://live.dottotv.ro https://dottotv.ro",
              "connect-src 'self' https://live.dottotv.ro https://dottotv.ro https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
              "frame-src 'self' https://www.google.com https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://youtube-nocookie.com https://www.facebook.com https://facebook.com https://www.instagram.com https://instagram.com https://www.tiktok.com https://tiktok.com https://www.twitter.com https://twitter.com https://www.x.com https://x.com https://player.vimeo.com https://vimeo.com https://www.dailymotion.com https://dailymotion.com https://player.twitch.tv https://www.twitch.tv",
              "worker-src 'self' blob:",
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
      { protocol: "https", hostname: "secure.gravatar.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
    ],
  },
};

export default nextConfig;
