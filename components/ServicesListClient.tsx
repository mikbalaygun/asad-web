// components/ServicesListClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  image?: string;
}

interface Props {
  services: ServiceItem[];
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

function ServiceCard({ item, locale }: { item: ServiceItem; locale: string }) {
  const emoji = iconMap[item.icon] || '🌊';

  return (
    <article className="group h-full">
      <Link href={`/${locale}/hizmetler/${item.slug}`} className="block h-full">
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
                <span className="text-8xl">{emoji}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
            
            {/* Icon Badge */}
            <div className="absolute top-4 left-4">
              <div className="w-14 h-14 rounded-xl bg-ocean-cyan/90 backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg">
                {emoji}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold text-white/95 mb-3 group-hover:text-ocean-cyan/90 transition-colors">
              {item.title}
            </h3>

            <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
              {item.shortDescription}
            </p>

            <div className="flex items-center gap-2 text-ocean-cyan/80 text-sm font-medium pt-4 border-t border-white/5 group-hover:gap-3 transition-all">
              <span>{locale === 'tr' ? 'Detayları Gör' : 'View Details'}</span>
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

export default function ServicesListClient({ services, locale }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-4.png"
            alt="Hizmetler"
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
            <span className="text-white/90">{locale === 'tr' ? 'Hizmetler' : 'Services'}</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {locale === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
            </h1>
            <p className="text-lg text-white/70 mb-6">
              {locale === 'tr' 
                ? 'Sualtı sporları ve deniz bilimleri alanında sunduğumuz profesyonel hizmetler'
                : 'Professional services we offer in underwater sports and marine sciences'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <ServiceCard key={item.id} item={item} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                {locale === 'tr' ? 'Hizmet bulunamadı.' : 'No services found.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}