"use client";

import { useRef, useLayoutEffect } from "react";

/**
 * Mid-homepage parallax banner.
 *
 * Parallax: the background layer moves at ~40% of the scroll speed relative to
 * the container, creating a natural depth effect. The background div is taller
 * than the container (±30%) so there's always enough image to fill the frame
 * regardless of the parallax offset.
 *
 * Perf: direct DOM mutation + rAF — no React state, no re-renders.
 *       useLayoutEffect runs synchronously before first paint.
 */
export default function ParallaxBanner() {
  const outerRef = useRef<HTMLDivElement>(null);
  const bgRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const bg    = bgRef.current;
    if (!outer || !bg) return;

    function update() {
      const rect      = outer!.getBoundingClientRect();
      const viewH     = window.innerHeight;
      // Distance between banner centre and viewport centre.
      // When banner is centred in view → offset 0.
      // When banner is below/above → bg shifts opposite direction at 40% speed.
      const bannerCentreY = rect.top + rect.height / 2;
      const offset        = (bannerCentreY - viewH / 2) * 0.4;
      bg!.style.transform = `translateY(${offset.toFixed(2)}px)`;
    }

    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };

    update(); // sync before first paint
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update,   { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    /* Outer: overflow:hidden clips the oversized parallax background */
    <div
      ref={outerRef}
      className="relative min-h-[400px] overflow-hidden rounded-2xl"
      data-ad-slot="homepage-mid"
    >
      {/* ── Parallax background layer (30% taller on each side) ── */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: "-30%",
          bottom: "-30%",
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #0f0c29 100%)",
          willChange: "transform",
        }}
      >
        {/* Radial colour blobs */}
        <div className="absolute inset-0">
          <div
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
          />
          <div
            className="absolute -right-12 -top-12 w-64 h-64 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }}
          />
          <div
            className="absolute right-1/3 -bottom-8 w-48 h-48 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
          />
        </div>

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Content (sits above parallax background) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center
                      min-h-[400px] py-10 px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6
                        bg-white/10 border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 text-[11px] font-semibold uppercase tracking-widest">
            Ofertă specială · Publicitate
          </span>
        </div>

        {/* Brand */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center
                       border border-white/20 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
          >
            <span className="text-white font-black text-base">DM</span>
          </div>
          <span className="text-white font-black text-xl tracking-tight">DigitMax</span>
        </div>

        {/* Headline */}
        <h2
          className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 max-w-2xl"
          style={{ textShadow: "0 2px 40px rgba(99,102,241,0.5)" }}
        >
          <span className="text-white">Marketing digital care</span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #818cf8, #ec4899, #06b6d4)",
            }}
          >
            aduce rezultate reale
          </span>
        </h2>

        {/* Sub */}
        <p className="text-white/60 text-sm md:text-base mb-8 max-w-lg leading-relaxed">
          SEO · Google Ads · Social Media · Web Design
          <br className="hidden sm:block" />
          Creștem branduri românești cu strategii dovedite
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            className="w-full sm:w-auto font-black text-sm px-8 py-3.5 rounded-full
                       shadow-xl transition-transform hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
          >
            <span className="text-white">Consultație gratuită →</span>
          </button>
          <span className="text-white/40 text-xs sm:text-sm">
            Fără contract · Fără risc
          </span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-2 mt-6">
          <div className="flex">
            {[0, 1, 2, 3, 4].map(i => (
              <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-white/50 text-xs">4.9 · 200+ clienți mulțumiți</span>
        </div>
      </div>
    </div>
  );
}
