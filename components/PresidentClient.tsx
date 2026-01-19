// components/PresidentClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { sanitizeHtml } from '@/lib/sanitize';

interface PresidentData {
  firstName: string;
  lastName: string;
  photo?: string;
  message: string;
  phone: string;
  email: string;
}

interface Props {
  president: PresidentData;
  locale: string;
}

export default function PresidentClient({ president, locale }: Props) {
  const stats = [
    { value: '20+', label: locale === 'tr' ? 'Yıl Deneyim' : 'Years Experience' },
    { value: '500+', label: locale === 'tr' ? 'Dalış' : 'Dives' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/gallery/gallery-2.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/70 to-ocean-deep" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${locale}/hakkimizda`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Hakkımızda' : 'About'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">{locale === 'tr' ? 'Başkan' : 'President'}</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {locale === 'tr' ? 'Başkanımız' : 'Our President'}
            </h1>
            <p className="text-lg text-white/70">
              {locale === 'tr'
                ? 'Sualtı sporları tutkusu ve liderlik vizyonuyla derneğimizi yönlendiren başkanımız'
                : 'Our president leading our association with passion for underwater sports and leadership vision'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden sticky top-24">
                  <div className="relative aspect-[3/4] bg-ocean-navy/20">
                    {president.photo ? (
                      <Image
                        src={president.photo}
                        alt={`${president.firstName} ${president.lastName}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
                        <svg className="w-24 h-24 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {president.firstName} {president.lastName}
                    </h2>
                    <p className="text-ocean-cyan text-sm font-semibold uppercase tracking-wider mb-4">
                      {locale === 'tr' ? 'Başkan' : 'President'}
                    </p>
                    <div className="space-y-3 mb-6">
                      <a href={`mailto:${president.email}`} className="flex items-center gap-3 text-white/60 hover:text-ocean-cyan text-sm transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-ocean-cyan/10 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-xs">{president.email}</span>
                      </a>
                      <a href={`tel:${president.phone}`} className="flex items-center gap-3 text-white/60 hover:text-ocean-cyan text-sm transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-ocean-cyan/10 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <span className="text-xs">{president.phone}</span>
                      </a>
                    </div>


                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-8">
                <div className="backdrop-blur-lg bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 border border-ocean-cyan/20 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-ocean-cyan/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {locale === 'tr' ? 'Başkanın Mesajı' : 'President\'s Message'}
                      </h3>
                      <div
                        className="space-y-4 text-white/70 leading-relaxed president-message"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(president.message) }}
                      />
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {locale === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}
                  </h3>
                  <p className="text-white/60 mb-6 text-sm">
                    {locale === 'tr'
                      ? 'Sorularınız, önerileriniz veya işbirliği teklifleriniz için'
                      : 'For your questions, suggestions or collaboration proposals'
                    }
                  </p>
                  <Link href={`/${locale}/iletisim`}>
                    <button className="px-8 py-3 bg-ocean-cyan text-ocean-deep font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2">
                      <span>{locale === 'tr' ? 'İletişim Formu' : 'Contact Form'}</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .president-message p {
          margin-bottom: 1rem;
        }
        .president-message strong {
          color: rgb(74, 155, 142);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}