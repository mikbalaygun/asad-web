// components/AnnouncementDetailClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AnnouncementData {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  priority: string;
  date: string;
  isActive: boolean;
  localizations?: Array<{
    id: number;
    title: string;
    slug: string;
    locale: string;
  }>;
}

interface RelatedAnnouncement {
  id: number;
  slug: string;
  title: string;
  priority: string;
  date: string;
}

interface Props {
  announcement: AnnouncementData;
  relatedAnnouncements: RelatedAnnouncement[];
  locale: string;
}

const priorityConfig = {
  high: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    text: 'text-red-400',
    label: { tr: 'Yüksek', en: 'High' },
    icon: '🔴'
  },
  medium: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    label: { tr: 'Orta', en: 'Medium' },
    icon: '🟡'
  },
  low: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    text: 'text-green-400',
    label: { tr: 'Düşük', en: 'Low' },
    icon: '🟢'
  }
};

export default function AnnouncementDetailClient({ announcement, relatedAnnouncements, locale }: Props) {
  const [copied, setCopied] = useState(false);
  const config = priorityConfig[announcement.priority as keyof typeof priorityConfig] || priorityConfig.medium;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-4.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 via-ocean-deep/80 to-ocean-deep" />
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
            <Link href={`/${locale}/duyurular`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Duyurular' : 'Announcements'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{locale === 'tr' ? 'Detay' : 'Detail'}</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} border ${config.border} ${config.text} text-sm font-semibold`}>
              <span>{config.icon}</span>
              <span>{config.label[locale as 'tr' | 'en']}</span>
            </span>

            {!announcement.isActive && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-400 text-sm font-semibold">
                {locale === 'tr' ? '⏸️ Pasif' : '⏸️ Inactive'}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {announcement.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{announcement.date}</span>
            </div>
          </div>
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
                <article className={`prose prose-invert prose-lg max-w-none p-8 rounded-2xl backdrop-blur-lg ${config.bg} border ${config.border}`}>
                  <div
                    className="announcement-content"
                    dangerouslySetInnerHTML={{ __html: announcement.content }}
                  />
                </article>

                {/* Language Switcher */}
                {announcement.localizations && announcement.localizations.length > 0 && (
                  <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-white/60 text-sm mb-3">
                      {locale === 'tr'
                        ? 'Bu duyuru başka dillerde de mevcut:'
                        : 'This announcement is also available in:'}
                    </p>
                    <div className="flex gap-3">
                      {announcement.localizations.map((loc) => (
                        <Link
                          key={loc.id}
                          href={`/${loc.locale}/duyurular/${loc.slug}`}
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

      {/* Related Announcements */}
      {relatedAnnouncements.length > 0 && (
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-mid to-deep" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {locale === 'tr' ? 'Diğer Duyurular' : 'Other Announcements'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
              {relatedAnnouncements.map((item) => {
                const itemConfig = priorityConfig[item.priority as keyof typeof priorityConfig] || priorityConfig.medium;
                return (
                  <Link key={item.id} href={`/${locale}/duyurular/${item.slug}`}>
                    <div className={`group backdrop-blur-lg ${itemConfig.bg} border ${itemConfig.border} rounded-2xl p-6 hover:shadow-xl transition-all h-full`}>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${itemConfig.bg} border ${itemConfig.border} ${itemConfig.text} text-xs font-semibold mb-3`}>
                        <span>{itemConfig.icon}</span>
                        <span>{itemConfig.label[locale as 'tr' | 'en']}</span>
                      </span>
                      <h3 className="text-lg font-bold text-white/95 mb-3 group-hover:text-ocean-cyan transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time>{item.date}</time>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/duyurular`}>
                <button className="px-8 py-4 bg-gradient-to-r from-ocean-cyan/80 to-ocean-navy/80 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {locale === 'tr' ? 'Tüm Duyurulara Dön' : 'Back to All Announcements'}
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        .announcement-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .announcement-content p {
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .announcement-content ul, .announcement-content ol {
          color: rgba(255, 255, 255, 0.85);
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .announcement-content li {
          margin-bottom: 0.5rem;
        }
        .announcement-content strong {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}