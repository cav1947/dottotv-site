import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/wordpress";

interface Props {
  categories: Category[];
}

export default function Footer({ categories }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/Sigla-DOTTO-TV---alb.png"
                alt="DottoTV"
                height={120}
                width={480}
                className="h-24 md:h-[120px]"
                style={{ width: "auto" }}
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Știri de actualitate din Constanța și din toată România. Informații corecte, rapide și verificate.
            </p>
            <Link
              href="/live"
              className="inline-flex items-center gap-2 mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE TV
            </Link>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categorii
            </h3>
            <ul className="space-y-2">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-brand-blue transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Pagini
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/despre-noi", label: "Despre noi" },
                { href: "/contact", label: "Contact" },
                { href: "/publicitate", label: "Publicitate" },
                { href: "/politica-de-confidentialitate", label: "Politică confidențialitate" },
                { href: "/termeni-si-conditii", label: "Termeni și condiții" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-brand-blue transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Social Media
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { icon: "📘", label: "Facebook", href: "https://facebook.com/dottotv" },
                { icon: "📸", label: "Instagram", href: "https://instagram.com/dottotv" },
                { icon: "📺", label: "YouTube", href: "https://youtube.com/@dottotv" },
                { icon: "🐦", label: "Twitter/X", href: "https://x.com/dottotv" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span>{social.icon}</span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} DottoTV. Toate drepturile rezervate.
          </p>
          <p className="text-xs text-gray-600">
            Constanța, România • ISSN 0000-0000
          </p>
        </div>
      </div>
    </footer>
  );
}
