// components/NewsDetailClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  image?: string;
  tags: string[];
  localizations?: Array<{
    id: number;
    locale: string;
    slug: string;
  }>;
}

interface RelatedNews {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  image?: string;
}

interface Props {
  news: NewsData;
  relatedNews: RelatedNews[];
  locale: string;
}

export default function NewsDetailClient({ news, relatedNews, locale }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = news.title;

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title} ${url}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section (Arka Plan) */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-1.png"
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
            <Link href={`/${locale}/haberler`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Haberler' : 'News'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{locale === 'tr' ? 'Detay' : 'Detail'}</span>
          </div>

          {/* Category Badge */}
          <span className="inline-block px-4 py-2 rounded-full bg-ocean-cyan/90 backdrop-blur-sm text-white text-sm font-semibold mb-6 shadow-lg">
            {news.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {news.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{news.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time>{news.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{news.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Social Share Sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="lg:sticky lg:top-24 flex flex-row lg:flex-col gap-3 justify-center lg:justify-start mb-8 lg:mb-0">
                  <div className="text-white/60 text-sm mb-4 hidden lg:block font-medium">
                    {locale === 'tr' ? 'Paylaş' : 'Share'}
                  </div>

                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 flex items-center justify-center text-white/60 hover:text-blue-400 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/30 flex items-center justify-center text-white/60 hover:text-sky-400 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 flex items-center justify-center text-white/60 hover:text-green-400 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-ocean-cyan/20 border border-white/10 hover:border-ocean-cyan/30 flex items-center justify-center text-white/60 hover:text-ocean-cyan transition-all"
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
              <div className="lg:col-span-11 lg:col-start-2 order-1 lg:order-2">

                {/* HABER GÖRSELİ */}
                {news.image && (
                  <div className="relative w-full aspect-[4/3] md:aspect-[16/9] mb-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      unoptimized
                      priority
                      quality={75}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Article Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                  <div
                    className="news-content-body"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                </article>

                {/* Tags */}
                {news.tags && news.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
                    <span className="text-white/60 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {locale === 'tr' ? 'Etiketler:' : 'Tags:'}
                    </span>
                    {news.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-ocean-cyan/10 hover:border-ocean-cyan/30 hover:text-ocean-cyan transition-all cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Language Switcher */}
                {news.localizations && news.localizations.length > 0 && (
                  <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-white/60 text-sm mb-3">
                      {locale === 'tr'
                        ? 'Bu içerik başka dillerde de mevcut:'
                        : 'This content is also available in:'}
                    </p>
                    <div className="flex gap-3">
                      {news.localizations.map((loc) => (
                        <Link
                          key={loc.id}
                          href={`/${loc.locale}/haberler/${loc.slug}`}
                          className="px-4 py-2 bg-ocean-cyan/10 hover:bg-ocean-cyan/20 border border-ocean-cyan/30 rounded-lg text-ocean-cyan font-medium transition-all flex items-center gap-2"
                        >
                          <span>{loc.locale === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}</span>
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

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-mid to-deep" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {locale === 'tr' ? 'İlgili Haberler' : 'Related News'}
              </h2>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((item) => (
                <Link key={item.id} href={`/${locale}/haberler/${item.slug}`} className="group h-full">
                  <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-ocean-cyan/30 transition-all h-full flex flex-col hover:shadow-lg hover:shadow-ocean-cyan/10">
                    {item.image && (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-transparent to-transparent opacity-60" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-ocean-cyan/10 text-ocean-cyan text-xs font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white/95 mb-3 group-hover:text-ocean-cyan transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-2 text-white/50 text-sm pt-4 border-t border-white/5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time>{item.date}</time>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/haberler`}>
                <button className="px-8 py-4 bg-gradient-to-r from-ocean-cyan/80 to-ocean-navy/80 text-white font-semibold rounded-xl shadow-lg hover:shadow-ocean-cyan/20 transition-all inline-flex items-center gap-2 hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {locale === 'tr' ? 'Tüm Haberlere Dön' : 'Back to All News'}
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Global Styles for Dynamic Content */}
      <style jsx global>{`
        .news-content-body {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .news-content-body h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .news-content-body h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        /* İçerik içindeki resimlerin optimizasyonu */
        .news-content-body img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2.5rem 0;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          object-fit: cover;
        }

        .news-content-body p {
          margin-bottom: 1.5rem;
        }

        .news-content-body ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .news-content-body li {
          margin-bottom: 0.5rem;
        }

        .news-content-body blockquote {
          border-left: 4px solid #06b6d4;
          padding-left: 2rem;
          margin: 2.5rem 0;
          font-style: italic;
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          background: linear-gradient(to right, rgba(6, 182, 212, 0.1), transparent);
          padding: 1.5rem 2rem;
          border-radius: 0 1rem 1rem 0;
        }

        .news-content-body a {
          color: #06b6d4;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: all 0.2s;
        }
        .news-content-body a:hover {
          color: #22d3ee;
        }
      `}</style>
    </div>
  );
}