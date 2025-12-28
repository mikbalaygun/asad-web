// components/ArticleDetailClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  pdfUrl?: string | null;
  localizations?: Array<{
    id: number;
    title: string;
    slug: string;
    locale: string;
  }>;
}

interface RelatedArticle {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
}

interface Props {
  article: ArticleData;
  relatedArticles: RelatedArticle[];
  locale: string;
}

export default function ArticleDetailClient({ article, relatedArticles, locale }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
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

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${locale}/makaleler`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Makaleler' : 'Articles'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{locale === 'tr' ? 'Detay' : 'Detail'}</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 rounded-full bg-ocean-cyan/90 backdrop-blur-sm text-white text-sm font-semibold mb-4">
              {article.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-white/80 mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time>{article.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{article.readTime}</span>
              </div>
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
                {/* PDF Download Section */}
                {article.pdfUrl && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-ocean-cyan/20 to-blue-500/20 border border-ocean-cyan/30 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-ocean-cyan/20 border border-ocean-cyan/30 flex items-center justify-center">
                        <svg className="w-7 h-7 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">
                          {locale === 'tr' ? '📄 PDF Doküman Mevcut' : '📄 PDF Document Available'}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {locale === 'tr'
                            ? 'Bu makaleyi PDF olarak görüntüleyebilir veya indirebilirsiniz.'
                            : 'You can view or download this article as PDF.'
                          }
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <a
                          href={article.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {locale === 'tr' ? 'Görüntüle' : 'View'}
                        </a>
                        <a
                          href={article.pdfUrl}
                          download
                          className="px-4 py-2 bg-ocean-cyan hover:bg-ocean-cyan/80 rounded-lg text-white font-medium transition-all flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {locale === 'tr' ? 'İndir' : 'Download'}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <article className="prose prose-invert prose-lg max-w-none">
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </article>

                {/* Language Switcher */}
                {article.localizations && article.localizations.length > 0 && (
                  <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-white/60 text-sm mb-3">
                      {locale === 'tr'
                        ? 'Bu makale başka dillerde de mevcut:'
                        : 'This article is also available in:'}
                    </p>
                    <div className="flex gap-3">
                      {article.localizations.map((loc) => (
                        <Link
                          key={loc.id}
                          href={`/${loc.locale}/makaleler/${loc.slug}`}
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

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-mid to-deep" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {locale === 'tr' ? 'İlgili Makaleler' : 'Related Articles'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
              {relatedArticles.map((item) => (
                <Link key={item.id} href={`/${locale}/makaleler/${item.slug}`}>
                  <div className="group backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-ocean-cyan/30 transition-all h-full">
                    <span className="inline-block px-3 py-1 rounded-full bg-ocean-cyan/10 text-ocean-cyan text-xs font-semibold mb-3">
                      {item.category}
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
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/makaleler`}>
                <button className="px-8 py-4 bg-gradient-to-r from-ocean-cyan/80 to-ocean-navy/80 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {locale === 'tr' ? 'Tüm Makalelere Dön' : 'Back to All Articles'}
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .article-content blockquote {
          border-left: 4px solid rgb(74, 155, 142);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
          background: rgba(74, 155, 142, 0.05);
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        .article-content ul, .article-content ol {
          color: rgba(255, 255, 255, 0.75);
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .article-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}