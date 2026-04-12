import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SocialLinksGrid from "@/components/SocialLinksGrid";
import { SITE_URL, localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactați redacția DottoTV. Adresă: Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța. Telefon: 0752 230 060. Email: redactie@dottotv.ro.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    siteName: "DOTTO TV",
    title: "Contact | DOTTO TV",
    description: "Contactați redacția DottoTV. Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța. Telefon: 0752 230 060. Email: redactie@dottotv.ro.",
    url: `${SITE_URL}/contact`,
    type: "website",
    locale: "ro_RO",
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: "Contact DOTTO TV" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dottotv",
    title: "Contact | DOTTO TV",
    description: "Contactați redacția DottoTV. Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
};

const ACCENT = "#1565C0";

const contactInfo = [
  {
    label: "Adresă",
    value: "Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    link: "https://maps.google.com/?q=Bd.+Aurel+Vlaicu+144+Constanta",
  },
  {
    label: "Telefon / WhatsApp",
    value: "0752 230 060",
    sublabel: "Disponibil și pe WhatsApp",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    link: "tel:0752230060",
  },
  {
    label: "Email",
    value: "redactie@dottotv.ro",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    link: "mailto:redactie@dottotv.ro",
  },
  {
    label: "Program",
    value: "Luni – Vineri, 09:00 – 18:00",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative container mx-auto px-4 py-14 text-center">
          <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-3">DottoTV</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">Contact</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            Suntem la dispoziția dvs. pentru orice întrebare, sesizare sau propunere de colaborare.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: ACCENT }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                    {item.label}
                  </p>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-gray-900 dark:text-white font-medium text-sm leading-snug hover:underline decoration-blue-600"
                      {...(item.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium text-sm leading-snug">{item.value}</p>
                  )}
                  {"sublabel" in item && item.sublabel && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" style={{ color: "#25D366" }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {item.sublabel}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Main grid: Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="mb-6">
                <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Trimite-ne un mesaj
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completați formularul și vă vom răspunde în maxim 24 de ore.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
              <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Unde ne găsiți
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța
                </p>
              </div>
              <div className="flex-1">
                <iframe
                  title="DottoTV pe Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2912.6820461820696!2d28.61802!3d44.18022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40bae2f57a7e7e0b%3A0x0!2sBulevardul+Aurel+Vlaicu+144%2C+Constan%C8%9Ba!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro"
                  width="100%"
                  height="420"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="mb-7 text-center">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-1">Social Media</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Urmăriți-ne pe rețelele sociale pentru cele mai recente știri.
              </p>
            </div>
            <SocialLinksGrid />
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
