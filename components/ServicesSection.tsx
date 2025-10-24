'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  image?: string;
}

interface Props {
  services: Service[];
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

function ServiceCard({ service, index, locale }: { service: Service; index: number; locale: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const emoji = iconMap[service.icon] || '🌊';

  return (
    <div
      className="group relative h-full opacity-0 animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/${locale}/hizmetler/${service.slug}`}>
        <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-ocean-cyan/40 hover:shadow-2xl hover:shadow-ocean-cyan/20 hover:-translate-y-1">
          {/* Image Section */}
          <div className="relative h-56 overflow-hidden">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ocean-cyan/20 to-ocean-navy/20 flex items-center justify-center">
                <span className="text-8xl opacity-50">{emoji}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/60 to-transparent" />
            
            {/* Icon Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="w-14 h-14 rounded-xl bg-ocean-cyan/90 backdrop-blur-sm flex items-center justify-center shadow-xl text-3xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {emoji}
              </div>
            </div>

            {/* Number Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="text-white font-bold">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-ocean-cyan/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          {/* Content Section */}
          <div className="p-6 relative z-10">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ocean-cyan transition-colors line-clamp-2">
              {service.title}
            </h3>
            
            <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-3">
              {service.shortDescription}
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-2 text-ocean-cyan text-sm font-semibold group-hover:gap-3 transition-all">
              <span>{locale === 'tr' ? 'Detayları Gör' : 'View Details'}</span>
              <svg 
                className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ServicesSection({ services, locale }: Props) {
  const content = {
    tr: {
      badge: 'Hizmetlerimiz',
      title: 'Profesyonel',
      titleHighlight: 'Dalış Hizmetleri',
      subtitle: 'Deneyimli ekibimiz ve modern ekipmanlarımızla güvenli ve unutulmaz sualtı deneyimleri sunuyoruz',
      ctaTitle: 'Tüm Hizmetlerimizi Keşfedin',
      ctaSubtitle: 'Size özel dalış programları ve eğitimler için detaylı bilgi alın',
      ctaButton: 'Tüm Hizmetler',
      noServices: 'Henüz hizmet bulunmuyor'
    },
    en: {
      badge: 'Our Services',
      title: 'Professional',
      titleHighlight: 'Diving Services',
      subtitle: 'We offer safe and unforgettable underwater experiences with our experienced team and modern equipment',
      ctaTitle: 'Discover All Our Services',
      ctaSubtitle: 'Get detailed information about custom diving programs and training',
      ctaButton: 'All Services',
      noServices: 'No services available yet'
    }
  };

  const t = content[locale as keyof typeof content] || content.tr;

  // Güvenli kontrol - services undefined olabilir
  if (!services || !Array.isArray(services) || services.length === 0) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-mid to-deep" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 animate-slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean-cyan/10 border border-ocean-cyan/20 text-ocean-cyan text-sm font-semibold mb-6 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              {t.badge}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.title}
              <span className="block mt-2 bg-gradient-to-r from-ocean-cyan via-ocean-cyan to-ocean-navy bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
            </h2>
          </div>

          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 mb-6">
              <svg className="w-12 h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-white/60 text-lg">{t.noServices}</p>
          </div>
        </div>

        <style jsx global>{`
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(30px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-slideUp {
            animation: slideUp 0.8s ease-out forwards;
          }
        `}</style>
      </section>
    );
  }

  // İlk 4 hizmeti göster (ana sayfada)
  const displayedServices = services.slice(0, 4);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-mid to-deep" />
        
        {/* Animated Fish */}
        <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
          {/* Fish 1 - Large slow fish */}
          <div className="fish fish-1">
            <svg viewBox="0 0 100 60" className="w-24 h-14">
              <path d="M10,30 Q30,20 50,30 Q30,40 10,30 M50,30 L60,25 L65,30 L60,35 Z M25,28 C25,27 26,27 26,28 C26,29 25,29 25,28" 
                    fill="currentColor" 
                    className="text-ocean-cyan/60" />
            </svg>
          </div>

          {/* Fish 2 - Medium fish */}
          <div className="fish fish-2">
            <svg viewBox="0 0 100 60" className="w-20 h-12">
              <path d="M10,30 Q30,22 50,30 Q30,38 10,30 M50,30 L58,26 L62,30 L58,34 Z M27,29 C27,28 28,28 28,29 C28,30 27,30 27,29" 
                    fill="currentColor" 
                    className="text-ocean-cyan/50" />
            </svg>
          </div>

          {/* Fish 3 - Small fast fish */}
          <div className="fish fish-3">
            <svg viewBox="0 0 100 60" className="w-16 h-10">
              <path d="M10,30 Q30,24 50,30 Q30,36 10,30 M50,30 L56,27 L59,30 L56,33 Z M28,29 C28,28.5 28.5,28.5 28.5,29 C28.5,29.5 28,29.5 28,29" 
                    fill="currentColor" 
                    className="text-teal-400/60" />
            </svg>
          </div>

          {/* Fish 4 - Another medium fish */}
          <div className="fish fish-4">
            <svg viewBox="0 0 100 60" className="w-20 h-12">
              <path d="M10,30 Q30,22 50,30 Q30,38 10,30 M50,30 L58,26 L62,30 L58,34 Z M27,29 C27,28 28,28 28,29 C28,30 27,30 27,29" 
                    fill="currentColor" 
                    className="text-cyan-400/40" />
            </svg>
          </div>

          {/* Fish 5 - Small fish bottom */}
          <div className="fish fish-5">
            <svg viewBox="0 0 100 60" className="w-14 h-9">
              <path d="M10,30 Q30,25 50,30 Q30,35 10,30 M50,30 L55,28 L58,30 L55,32 Z M29,29.5 C29,29 29.5,29 29.5,29.5 C29.5,30 29,30 29,29.5" 
                    fill="currentColor" 
                    className="text-teal-300/50" />
            </svg>
          </div>

          {/* Fish 6 - Opposite direction */}
          <div className="fish fish-6">
            <svg viewBox="0 0 100 60" className="w-18 h-11" style={{ transform: 'scaleX(-1)' }}>
              <path d="M10,30 Q30,23 50,30 Q30,37 10,30 M50,30 L57,27 L61,30 L57,33 Z M28,29 C28,28 29,28 29,29 C29,30 28,30 28,29" 
                    fill="currentColor" 
                    className="text-ocean-cyan/45" />
            </svg>
          </div>

          {/* Bubbles */}
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-slideUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean-cyan/10 border border-ocean-cyan/20 text-ocean-cyan text-sm font-semibold mb-6 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            {t.badge}
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.title}
            <span className="block mt-2 bg-gradient-to-r from-ocean-cyan via-ocean-cyan to-ocean-navy bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        {displayedServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {displayedServices.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index}
                  locale={locale}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="max-w-5xl mx-auto opacity-0 animate-fadeIn" style={{ animationDelay: '500ms' }}>
              <div className="relative backdrop-blur-xl bg-gradient-to-r from-ocean-cyan/10 via-ocean-navy/10 to-ocean-cyan/10 border border-ocean-cyan/20 rounded-3xl p-8 md:p-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }} />
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {t.ctaTitle}
                    </h3>
                    <p className="text-white/70 text-lg">
                      {t.ctaSubtitle}
                    </p>
                  </div>
                  
                  <Link href={`/${locale}/hizmetler`}>
                    <button className="group px-8 py-4 bg-gradient-to-r from-ocean-cyan to-ocean-navy text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-ocean-cyan/30 transition-all flex items-center gap-3 whitespace-nowrap hover:scale-105">
                      <span>{t.ctaButton}</span>
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 mb-6">
              <svg className="w-12 h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-white/60 text-lg">{t.noServices}</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Fish animations */
        .fish {
          position: absolute;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .fish-1 {
          top: 15%;
          animation: swim1 25s infinite;
        }

        .fish-2 {
          top: 35%;
          animation: swim2 20s infinite;
        }

        .fish-3 {
          top: 55%;
          animation: swim3 15s infinite;
        }

        .fish-4 {
          top: 70%;
          animation: swim4 22s infinite;
        }

        .fish-5 {
          top: 85%;
          animation: swim5 18s infinite;
        }

        .fish-6 {
          top: 45%;
          animation: swim6 24s infinite;
        }

        @keyframes swim1 {
          0% {
            left: -10%;
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            left: 110%;
            transform: translateY(0);
          }
        }

        @keyframes swim2 {
          0% {
            left: -10%;
            transform: translateY(0);
          }
          50% {
            transform: translateY(15px);
          }
          100% {
            left: 110%;
            transform: translateY(0);
          }
        }

        @keyframes swim3 {
          0% {
            left: -10%;
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            left: 110%;
            transform: translateY(0);
          }
        }

        @keyframes swim4 {
          0% {
            left: -10%;
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
          100% {
            left: 110%;
            transform: translateY(0);
          }
        }

        @keyframes swim5 {
          0% {
            left: -10%;
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            left: 110%;
            transform: translateY(0);
          }
        }

        @keyframes swim6 {
          0% {
            right: -10%;
            transform: translateY(0) scaleX(-1);
          }
          50% {
            transform: translateY(15px) scaleX(-1);
          }
          100% {
            right: 110%;
            transform: translateY(0) scaleX(-1);
          }
        }

        /* Bubble animations */
        .bubble {
          position: absolute;
          bottom: -20px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(74, 155, 142, 0.4) 0%, rgba(74, 155, 142, 0.1) 70%);
          border-radius: 50%;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .bubble-1 {
          left: 15%;
          animation: bubble-rise 8s infinite;
          animation-delay: 0s;
        }

        .bubble-2 {
          left: 35%;
          width: 6px;
          height: 6px;
          animation: bubble-rise 10s infinite;
          animation-delay: 2s;
        }

        .bubble-3 {
          left: 55%;
          width: 10px;
          height: 10px;
          animation: bubble-rise 12s infinite;
          animation-delay: 4s;
        }

        .bubble-4 {
          left: 75%;
          width: 7px;
          height: 7px;
          animation: bubble-rise 9s infinite;
          animation-delay: 1s;
        }

        .bubble-5 {
          left: 90%;
          width: 9px;
          height: 9px;
          animation: bubble-rise 11s infinite;
          animation-delay: 3s;
        }

        @keyframes bubble-rise {
          0% {
            bottom: -20px;
            opacity: 0;
            transform: translateX(0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            bottom: 110%;
            opacity: 0;
            transform: translateX(30px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}