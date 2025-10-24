// components/NewsSectionHome.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
}

interface AnnouncementItem {
  id: number;
  slug: string;
  title: string;
  content: string;
  priority: string;
  startDate: string;
}

interface Props {
  news: NewsItem[];
  announcements: AnnouncementItem[];
  locale: string;
}

function NewsCard({ item, locale }: { item: NewsItem; locale: string }) {
  return (
    <Link href={`/${locale}/haberler/${item.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group relative h-full"
      >
        <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-ocean-cyan/30 transition-all h-full flex flex-col">
          
          {/* Image */}
          {item.image ? (
            <div className="relative w-full h-48 overflow-hidden bg-ocean-navy/20">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-ocean-cyan/90 backdrop-blur-sm text-white text-xs font-semibold">
                  {item.category}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-48 bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-ocean-cyan/20 text-ocean-cyan text-xs font-semibold">
                  {item.category}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time>{item.date}</time>
            </div>

            <h3 className="text-xl font-bold text-white/95 mb-3 group-hover:text-ocean-cyan transition-colors line-clamp-2">
              {item.title}
            </h3>

            <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {item.excerpt}
            </p>

            <div className="flex items-center gap-2 text-ocean-cyan text-sm font-medium">
              <span>{locale === 'tr' ? 'Devamını Oku' : 'Read More'}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function AnnouncementCard({ item, locale }: { item: AnnouncementItem; locale: string }) {
  const priorityColors = {
    urgent: 'bg-red-500/20 border-red-500/30 text-red-400',
    high: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
    medium: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
    low: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  };

  return (
    <Link href={`/${locale}/duyurular/${item.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group"
      >
        <div className={`backdrop-blur-lg ${priorityColors[item.priority as keyof typeof priorityColors]} border rounded-2xl p-6 hover:shadow-xl transition-all`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold">{item.priority.toUpperCase()}</span>
            <span className="text-white/50 text-sm">{item.startDate}</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-ocean-cyan transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-white/70 text-sm line-clamp-2">
            {item.content}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}

export default function NewsSectionHome({ news, announcements, locale }: Props) {
  const [activeTab, setActiveTab] = useState<'news' | 'announcements'>('news');

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-mid to-ocean-deep" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-ocean-cyan/10 border border-ocean-cyan/20 text-ocean-cyan text-sm font-semibold mb-4">
            {locale === 'tr' ? 'Güncel Gelişmeler' : 'Latest Updates'}
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {locale === 'tr' ? 'Son Haberler ve' : 'Latest News and'}
            <span className="block mt-2 text-ocean-cyan">{locale === 'tr' ? 'Duyurular' : 'Announcements'}</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === 'news' 
                  ? 'bg-ocean-cyan text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {locale === 'tr' ? 'Haberler' : 'News'} ({news.length})
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === 'announcements' 
                  ? 'bg-ocean-cyan text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {locale === 'tr' ? 'Duyurular' : 'Announcements'} ({announcements.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activeTab === 'news' 
            ? news.map((item) => <NewsCard key={item.id} item={item} locale={locale} />)
            : announcements.map((item) => <AnnouncementCard key={item.id} item={item} locale={locale} />)
          }
        </div>

        {/* View All */}
        <div className="text-center">
          <Link href={`/${locale}/${activeTab === 'news' ? 'haberler' : 'duyurular'}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-ocean-cyan text-white font-semibold rounded-xl hover:shadow-xl transition-all"
            >
              {locale === 'tr' ? 'Tümünü Görüntüle' : 'View All'}
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}