// components/SponsorsPageClient.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface SponsorItem {
  id: number;
  name: string;
  logo: string | null;
}

interface Props {
  sponsors: SponsorItem[];
  locale: string;
}

function SponsorCard({ item }: { item: SponsorItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-ocean-cyan/30 hover:bg-white/10 transition-all duration-300 h-full flex flex-col items-center justify-center">
        {/* Logo */}
        {item.logo ? (
          <div className="relative w-full h-32 mb-4 flex items-center justify-center">
            <Image
              src={item.logo}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-32 mb-4 bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 rounded-lg flex items-center justify-center">
            <svg className="w-16 h-16 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}

        {/* Name */}
        <h3 className="text-lg font-bold text-white text-center group-hover:text-ocean-cyan transition-colors">
          {item.name}
        </h3>
      </div>
    </motion.div>
  );
}

export default function SponsorsPageClient({ sponsors, locale }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean-navy to-ocean-deep" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-ocean-cyan rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">
              {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">{locale === 'tr' ? 'Sponsorlarımız' : 'Our Sponsors'}</span>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-ocean-cyan/10 border border-ocean-cyan/20 text-ocean-cyan text-sm font-semibold mb-4">
              {locale === 'tr' ? 'Destekçilerimiz' : 'Our Supporters'}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {locale === 'tr' ? 'Sponsorlarımız' : 'Our Sponsors'}
            </h1>
            
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {locale === 'tr'
                ? 'ASAD\'ın çalışmalarını destekleyen değerli kurumlar ve iş ortaklarımız'
                : 'Valued institutions and partners supporting ASAD\'s work'
              }
            </p>

            {/* Stats */}
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl px-6 py-4 inline-flex items-center gap-4">
              <div className="text-3xl font-bold text-ocean-cyan">{sponsors.length}</div>
              <div className="text-white/60">
                {locale === 'tr' ? 'Aktif Sponsor' : 'Active Sponsors'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} item={sponsor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                {locale === 'tr' ? 'Henüz sponsor bulunmamaktadır.' : 'No sponsors yet.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-mid to-ocean-deep" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {locale === 'tr' ? 'Sponsor Olmak İster Misiniz?' : 'Want to Become a Sponsor?'}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {locale === 'tr'
                ? 'ASAD\'ın çalışmalarını destekleyerek sualtı araştırmalarına katkıda bulunabilirsiniz.'
                : 'Support ASAD\'s work and contribute to underwater research.'
              }
            </p>
            <Link href={`/${locale}/iletisim`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-ocean-cyan text-white font-semibold rounded-xl hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <span>{locale === 'tr' ? 'İletişime Geçin' : 'Contact Us'}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}