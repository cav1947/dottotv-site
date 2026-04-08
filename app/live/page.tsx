import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getLatestPosts } from "@/lib/wordpress";
import AdBanner from "@/components/AdBanner";
import IndigoPlayer from "@/components/IndigoPlayer";

export const metadata: Metadata = {
  title: "LIVE TV - DottoTV",
  description: "Urmărește DottoTV LIVE. Știri în direct din Constanța și România.",
  openGraph: {
    title: "LIVE TV | DottoTV",
    description: "Urmărește DottoTV LIVE. Știri în direct.",
  },
};

export const revalidate = 60;

// ── Program TV ────────────────────────────────────────────────────────────────
const SCHEDULE = [
  { time: "06:00", show: "Bună dimineața, Constanța!" },
  { time: "08:00", show: "Știri DottoTV" },
  { time: "09:00", show: "Dobrogea Azi" },
  { time: "10:00", show: "Oameni și Locuri" },
  { time: "12:00", show: "Știri de Prânz" },
  { time: "13:00", show: "Județul Constanța" },
  { time: "15:00", show: "Interviuri Exclusive" },
  { time: "17:00", show: "Știri de Seară" },
  { time: "19:00", show: "Principalul Jurnal" },
  { time: "20:00", show: "DottoTV Special" },
  { time: "21:00", show: "Dezbatere Publică" },
  { time: "23:00", show: "Ultimele Știri" },
];

function getCurrentShow(): { show: string; time: string; nextTime: string } {
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  let idx = 0;
  for (let i = 0; i < SCHEDULE.length; i++) {
    const [h, m] = SCHEDULE[i].time.split(":").map(Number);
    if (h * 60 + m <= cur) idx = i;
  }
  return {
    ...SCHEDULE[idx],
    nextTime: SCHEDULE[(idx + 1) % SCHEDULE.length].time,
  };
}

function timeAgo(dateString: string): string {
  const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (diff < 3600) return `acum ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `acum ${Math.floor(diff / 3600)} ore`;
  return new Date(dateString).toLocaleDateString("ro-RO", { day: "numeric", month: "short" });
}

export default async function LivePage() {
  const [latestPosts] = await Promise.all([
    getLatestPosts(5).catch(() => []),
  ]);

  const current = getCurrentShow();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ═══════════════════════════════════════
          HERO — dark full width
      ═══════════════════════════════════════ */}
      <section className="bg-gray-950">
        <div className="container mx-auto px-4 max-w-[1200px] py-6">

          {/* Titlu + LIVE badge */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg shadow-red-600/30">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              <span className="font-bold text-sm tracking-wide">LIVE</span>
            </div>
            <h1 className="font-playfair font-bold text-2xl md:text-3xl text-white">
              DottoTV în Direct
            </h1>
          </div>

          {/* Player */}
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <IndigoPlayer />
          </div>

          {/* Emisiunea curentă */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-1">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-base leading-none">
                  {current.show}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Până la {current.nextTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Transmisie 24/7
              </span>
              <span>📍 Constanța, România</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONȚINUT — program + știri
      ═══════════════════════════════════════ */}
      <div className="container mx-auto px-4 max-w-[1200px] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* ── PROGRAM TV ── */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-brand-blue rounded-full" />
              <h2 className="font-playfair font-bold text-xl text-gray-900 dark:text-white">
                Program TV — Astăzi
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
              {SCHEDULE.map((item, i) => {
                const isCurrent = item.time === current.time;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors ${
                      isCurrent
                        ? "bg-brand-blue text-white"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {/* Ora */}
                    <span
                      className={`font-mono font-bold text-sm w-12 flex-shrink-0 ${
                        isCurrent ? "text-white" : "text-brand-blue dark:text-brand-blue-light"
                      }`}
                    >
                      {item.time}
                    </span>

                    {/* Linie separator */}
                    <div
                      className={`w-px h-8 flex-shrink-0 ${
                        isCurrent ? "bg-white/30" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />

                    {/* Emisiune */}
                    <span
                      className={`font-medium text-sm flex-1 ${
                        isCurrent
                          ? "text-white"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {item.show}
                    </span>

                    {/* Badge ACUM */}
                    {isCurrent && (
                      <span className="flex items-center gap-1.5 text-white text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full flex-shrink-0">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        ACUM
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Ad */}
            <div className="mt-6">
              <AdBanner slot="live-page-mid" width={728} height={90} />
            </div>
          </section>

          {/* ── SIDEBAR — Ultimele știri ── */}
          <aside>
            <div className="sticky top-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-red-500 rounded-full" />
                <h2 className="font-playfair font-bold text-xl text-gray-900 dark:text-white">
                  Ultimele știri
                </h2>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
                {latestPosts.map((post) => {
                  const imageUrl = post.featuredImage?.node?.sourceUrl;
                  const category = post.categories?.nodes?.[0];
                  return (
                    <article key={post.id} className="flex gap-3 p-4 group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                      {imageUrl && (
                        <Link href={`/articol/${post.slug}`} className="flex-shrink-0">
                          <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={post.featuredImage?.node?.altText || post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="96px"
                            />
                          </div>
                        </Link>
                      )}
                      <div className="flex-1 min-w-0">
                        {category && (
                          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wide">
                            {category.name}
                          </span>
                        )}
                        <Link href={`/articol/${post.slug}`}>
                          <h3
                            className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 leading-snug mt-0.5 transition-colors"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                          />
                        </Link>
                        <p className="text-[11px] text-gray-400 mt-1.5">
                          {timeAgo(post.date)}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 mt-4 w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-semibold transition-colors"
              >
                Toate știrile →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
