// components/NewsListingClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  readTime: string;
}

interface Props {
  news: NewsItem[];
  locale: string;
}

function NewsCard({ item, locale }: { item: NewsItem; locale: string }) {
  return (
    <article className="group h-full">
      <Link href={`/${locale}/haberler/${item.slug}`} className="block h-full">
        <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-ocean-cyan/30 transition-all duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative w-full h-64 overflow-hidden bg-ocean-navy/20">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
                <svg className="w-20 h-20 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-ocean-cyan/90 backdrop-blur-sm text-white text-xs font-semibold">
                {item.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-4 text-white/50 text-sm mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time>{item.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{item.readTime}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white/95 mb-3 group-hover:text-ocean-cyan/90 transition-colors line-clamp-2">
              {item.title}
            </h3>

            <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {item.excerpt}
            </p>

            <div className="flex items-center gap-2 text-ocean-cyan/80 text-sm font-medium pt-4 border-t border-white/5 group-hover:gap-3 transition-all">
              <span>{locale === 'tr' ? 'Devamını Oku' : 'Read More'}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function PaginationButton({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-lg font-medium transition-all hover:scale-105 ${
        isActive ? 'bg-ocean-cyan text-white shadow-lg' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      {page}
    </button>
  );
}

export default function NewsListingClient({ news, locale }: Props) {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const allCategories = Array.from(new Set(news.map(item => item.category)));
  const categories = ['Tümü', ...allCategories];

  const filteredNews = news.filter((item) => {
    const matchesCategory = activeCategory === 'Tümü' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen">
      {/* Hero - Arka plan sabit */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-2.png"
            alt="Haberler"
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
            <span className="text-white/90">{locale === 'tr' ? 'Haberler' : 'News'}</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {locale === 'tr' ? 'Haberler' : 'News'}
            </h1>
            <p className="text-lg text-white/70 mb-6">
              {locale === 'tr' 
                ? 'Sualtı dünyasından en son gelişmeler, keşifler ve etkinlikler'
                : 'Latest developments, discoveries and events from underwater world'
              }
            </p>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1 md:max-w-sm">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={locale === 'tr' ? 'Ara...' : 'Search...'}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-ocean-cyan/50 transition-colors"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-2 rounded-lg font-medium text-xs transition-all hover:scale-105 ${
                        activeCategory === category 
                          ? 'bg-ocean-cyan text-white shadow-lg' 
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/60 text-sm">
              {filteredNews.length} {locale === 'tr' ? 'haber bulundu' : 'news found'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-ocean-cyan hover:text-ocean-cyan/80 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {locale === 'tr' ? 'Aramayı Temizle' : 'Clear Search'}
              </button>
            )}
          </div>

          {paginatedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedNews.map((item) => (
                <NewsCard key={item.id} item={item} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                {locale === 'tr' ? 'Haber bulunamadı.' : 'No news found.'}
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1} 
                className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationButton 
                  key={page} 
                  page={page} 
                  isActive={currentPage === page} 
                  onClick={() => setCurrentPage(page)} 
                />
              ))}

              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
                disabled={currentPage === totalPages} 
                className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}