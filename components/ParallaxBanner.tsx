import Link from "next/link";
import Image from "next/image";

export default function ParallaxBanner() {
  return (
    <div
      className="relative min-h-[400px] overflow-hidden rounded-2xl"
      data-ad-slot="homepage-mid"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #0f0c29 100%)",
      }}
    >
      {/* Radial colour blobs — statice */}
      <div className="absolute inset-0 pointer-events-none">
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
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] py-10 px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-2 bg-white/10 border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 text-[11px] font-semibold uppercase tracking-widest">
            Ofertă specială · Publicitate
          </span>
        </div>

        {/* Logo DottoTV */}
        <div className="mb-2">
          <Image
            src="/Sigla-DOTTO-TV---alb.png"
            alt="DOTTO TV"
            width={900}
            height={225}
            className="h-[180px] w-auto mx-auto"
          />
        </div>

        {/* Headline */}
        <h2 className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 max-w-2xl">
          <span className="text-white">Brandul tău, văzut de toată Constanța</span>
        </h2>

        <p className="text-white/60 text-sm md:text-base mb-8 max-w-lg leading-relaxed">
          TV, online și social media — într-un singur pachet
        </p>

        {/* CTA */}
        <Link
          href="/publicitate"
          className="font-black text-sm px-8 py-3.5 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
        >
          <span className="text-white">Solicită ofertă</span>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-2 mt-6">
          <div className="flex">
            {[0, 1, 2, 3, 4].map(i => (
              <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-white/50 text-xs">4.9 · 100+ clienți mulțumiți</span>
        </div>
      </div>
    </div>
  );
}
