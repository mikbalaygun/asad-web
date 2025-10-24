// components/RepresentativeClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

interface RepresentativeData {
  firstName: string;
  lastName: string;
  photo?: string;
}

interface Props {
  representative: RepresentativeData;
  locale: string;
}

export default function RepresentativeClient({ representative, locale }: Props) {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-1.png"
            alt="Temsilci"
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
            <Link href={`/${locale}/hakkimizda`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Hakkımızda' : 'About'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">{locale === 'tr' ? 'Temsilci' : 'Representative'}</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {locale === 'tr' ? 'Temsilcimiz' : 'Our Representative'}
            </h1>
          </div>
        </div>
      </section>

      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4] bg-ocean-navy/20">
                {representative.photo ? (
                  <Image
                    src={representative.photo}
                    alt={`${representative.firstName} ${representative.lastName}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
                    <svg className="w-32 h-32 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {representative.firstName} {representative.lastName}
                </h2>
                <p className="text-ocean-cyan text-lg font-semibold">
                  {locale === 'tr' ? 'Temsilci' : 'Representative'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}