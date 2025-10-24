// components/AnnouncementsListClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AnnouncementItem {
  id: number;
  slug: string;
  title: string;
  content: string;
  priority: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface Props {
  announcements: AnnouncementItem[];
  locale: string;
}

const priorityConfig = {
  urgent: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    text: 'text-red-400',
    label: { tr: 'Acil', en: 'Urgent' },
    icon: '🚨'
  },
  high: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    label: { tr: 'Yüksek', en: 'High' },
    icon: '⚠️'
  },
  medium: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    label: { tr: 'Orta', en: 'Medium' },
    icon: 'ℹ️'
  },
  low: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    label: { tr: 'Düşük', en: 'Low' },
    icon: '📌'
  }
};

function AnnouncementCard({ item, locale }: { item: AnnouncementItem; locale: string }) {
  const config = priorityConfig[item.priority as keyof typeof priorityConfig] || priorityConfig.medium;
  
  return (
    <article className="group">
      <Link href={`/${locale}/duyurular/${item.slug}`}>
        <div className={`relative backdrop-blur-lg ${config.bg} border ${config.border} rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}>
          {/* Priority Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} border ${config.border} ${config.text} text-sm font-semibold`}>
              <span>{config.icon}</span>
              <span>{config.label[locale as 'tr' | 'en']}</span>
            </span>
            
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time>{item.startDate}</time>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ocean-cyan transition-colors">
            {item.title}
          </h3>

          {/* Content Preview */}
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-4">
            {item.content}
          </p>

          {/* End Date */}
          <div className="flex items-center gap-2 text-white/50 text-sm pt-4 border-t border-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {locale === 'tr' ? 'Geçerlilik:' : 'Valid until:'} {item.endDate}
            </span>
          </div>

          {/* Read More Arrow */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function AnnouncementsListClient({ announcements, locale }: Props) {
  const [activePriority, setActivePriority] = useState('Tümü');

  const priorities = [
    { key: 'Tümü', label: { tr: 'Tümü', en: 'All' } },
    { key: 'urgent', label: { tr: 'Acil', en: 'Urgent' } },
    { key: 'high', label: { tr: 'Yüksek', en: 'High' } },
    { key: 'medium', label: { tr: 'Orta', en: 'Medium' } },
    { key: 'low', label: { tr: 'Düşük', en: 'Low' } }
  ];

  const filteredAnnouncements = announcements.filter(
    item => activePriority === 'Tümü' || item.priority === activePriority
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-4.png"
            alt="Duyurular"
            fill
            priority
            className="object-cover"
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
            <span className="text-white/90">{locale === 'tr' ? 'Duyurular' : 'Announcements'}</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {locale === 'tr' ? 'Duyurular' : 'Announcements'}
            </h1>
            <p className="text-lg text-white/70 mb-6">
              {locale === 'tr' 
                ? 'Güncel duyurular ve önemli bildirimler'
                : 'Current announcements and important notifications'
              }
            </p>

            {/* Priority Filters */}
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <button
                  key={priority.key}
                  onClick={() => setActivePriority(priority.key)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                    activePriority === priority.key 
                      ? 'bg-ocean-cyan text-white shadow-lg' 
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {priority.label[locale as 'tr' | 'en']}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-white/60 text-sm">
            {filteredAnnouncements.length} {locale === 'tr' ? 'duyuru bulundu' : 'announcements found'}
          </div>

          {filteredAnnouncements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnnouncements.map((item) => (
                <AnnouncementCard key={item.id} item={item} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                {locale === 'tr' ? 'Duyuru bulunamadı.' : 'No announcements found.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}