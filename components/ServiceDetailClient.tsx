// components/ServiceDetailClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sanitizeHtml } from '@/lib/sanitize';

interface ServiceData {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image?: string;
  localizations?: Array<{
    id: number;
    documentId: string;
    title: string;
    slug: string;
    locale: string;
  }>;
}

interface RelatedService {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  image?: string;
}

interface Props {
  service: ServiceData;
  relatedServices: RelatedService[];
  locale: string;
}

const iconMap: Record<string, string> = {
  diving: '🤿',
  education: '📚',
  research: '🔬',
  conservation: '🌊',
  training: '🎓',
  equipment: '⚙️',
  tour: '🗺️',
  safety: '🛡️',
};

export default function ServiceDetailClient({ service, relatedServices, locale }: Props) {
  const [copied, setCopied] = useState(false);
  const emoji = iconMap[service.icon] || '🌊';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero - Static Background */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-4.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/70 to-ocean-deep" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/80 mb-8">
            <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${locale}/hizmetler`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Hizmetler' : 'Services'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{locale === 'tr' ? 'Detay' : 'Detail'}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {service.title}
          </h1>

          {/* Short Description */}
          <p className="text-xl text-white/80 max-w-3xl">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Share Sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="lg:sticky lg:top-24 flex justify-center lg:block mb-8 lg:mb-0">
                  <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-ocean-cyan/20 border border-white/10 hover:border-ocean-cyan/30 flex items-center justify-center text-white/60 hover:text-ocean-cyan transition-all"
                    title={locale === 'tr' ? 'Linki Kopyala' : 'Copy Link'}
                  >
                    {copied ? (
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-11 order-1 lg:order-2">
                {/* Service Image */}
                {service.image && (
                  <div className="relative w-full aspect-[4/3] md:aspect-[16/9] mb-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      priority
                      quality={75}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Description */}
                <article className="prose prose-invert prose-lg max-w-none mb-12">
                  <div
                    className="service-content text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.description) }}
                  />
                </article>

                {/* Language Switcher */}
                {service.localizations && service.localizations.length > 0 && (
                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-white/60 text-sm mb-3">
                      {locale === 'tr'
                        ? 'Bu hizmet başka dillerde de mevcut:'
                        : 'This service is also available in:'}
                    </p>
                    <div className="flex gap-3">
                      {service.localizations.map((loc) => (
                        <Link
                          key={loc.id}
                          href={`/${loc.locale}/hizmetler/${loc.slug}`}
                          className="px-4 py-2 bg-ocean-cyan/20 hover:bg-ocean-cyan/30 border border-ocean-cyan/30 rounded-lg text-ocean-cyan font-medium transition-all"
                        >
                          {loc.locale === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-mid to-deep" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {locale === 'tr' ? 'Diğer Hizmetler' : 'Other Services'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
              {relatedServices.map((item) => {
                const itemEmoji = iconMap[item.icon] || '🌊';
                return (
                  <Link key={item.id} href={`/${locale}/hizmetler/${item.slug}`}>
                    <div className="group backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-ocean-cyan/30 transition-all h-full">
                      <div className="relative w-full h-48">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
                            <span className="text-6xl">{itemEmoji}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white/95 mb-2 group-hover:text-ocean-cyan transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2">
                          {item.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/hizmetler`}>
                <button className="px-8 py-4 bg-gradient-to-r from-ocean-cyan/80 to-ocean-navy/80 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {locale === 'tr' ? 'Tüm Hizmetlere Dön' : 'Back to All Services'}
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        .service-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .service-content p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .service-content ul, .service-content ol {
          color: rgba(255, 255, 255, 0.8);
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .service-content li {
          margin-bottom: 0.5rem;
        }
        .service-content strong {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}