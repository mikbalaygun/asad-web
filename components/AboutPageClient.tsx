'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ContactInfo } from '@/lib/types/contact';

interface AboutPageProps {
  locale: string;
  contactInfo: ContactInfo | null;
}

// Value Card
function ValueCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  return (
    <div
      className="group opacity-0 animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 h-full shadow-lg hover:border-ocean-cyan/30 transition-all hover:-translate-y-1">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-ocean-cyan/20 to-ocean-navy/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <div className="text-ocean-cyan">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-white/95 mb-3">{title}</h3>
        <p className="text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function AboutPageClient({ locale, contactInfo }: AboutPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const content = {
    tr: {
      badge: "Hakkımızda",
      heroTitle: "Derinliklerin",
      heroTitleHighlight: "Hikayesi",
      heroSubtitle: "2021 yılından bu yana Anadolu sularının kültürel ve doğal mirasını araştırıyor, belgeliyor ve koruyoruz.",
      mission: "Misyonumuz",
      missionText: "Anadolu sularının zengin kültürel ve doğal mirasını bilimsel yöntemlerle araştırmak, belgelemek ve gelecek nesillere aktarmak.",
      vision: "Vizyonumuz",
      visionText: "Dünya çapında tanınan, öncü bir sualtı araştırma ve eğitim merkezi olmak.",
      aboutTitle: "Derneğimiz Hakkında",
      aboutText: "Derneğimiz ülkemizin su altı zenginliklerini araştırmak, bilimsel yayınlarla ülkemize ve dünyaya tanıtmak, bu zenginlikleri korumak ve gelecek nesillere aktarmak üzere kamu-sivil toplum ortaklığında projeler yapmak üzere Türkiye'nin çeşitli üniversitelerinde görev yapan alanında yetkin bilim adamları ve derneğimizin çalışma alanlarında uzmanların bir araya geldiği kamu yararını gözeten bir dernektir. Ayrıca gençlerimizi su sporlarına yönlendirmeyi, bu doğrultuda eğitim programları ile başarılı sporcular yetiştirmeyi hedef almakla birlikte su sporlarına amatörce gönül vermiş yurttaşlarımıza da destek olmayı amaç edinmiştir.",
      valuesTitle: "Değerlerimiz",
      valuesSubtitle: "Çalışmalarımızı yönlendiren temel ilkeler",
      locationTitle: "Bizi Ziyaret Edin",
      locationSubtitle: "Ofisimize uğrayın veya iletişime geçin",
      address: "Adres",
      phone: "Telefon",
      email: "E-posta",
      socialTitle: "Sosyal Medyada Bizi Takip Edin",
      socialSubtitle: "Son haberler ve etkinlikler için sosyal medya hesaplarımızdan bizi takip edin",
      ctaTitle: "Ekibimizle Tanışın",
      ctaSubtitle: "Deneyimli yönetim kadromuz ve dalgıç ekibimiz hakkında daha fazla bilgi edinin",
      managementBoard: "Yönetim Kurulu",
      auditBoard: "Denetleme Kurulu",
      values: [
        { title: 'Bilimsellik', description: 'Bilimsel yöntem ve akademik işbirliği ile çalışıyoruz.' },
        { title: 'Sürdürülebilirlik', description: 'Deniz ekosistemlerinin korunması önceliğimiz.' },
        { title: 'İşbirliği', description: 'Ulusal ve uluslararası kurumlarla birlikte çalışıyoruz.' },
        { title: 'Eğitim', description: 'Sürekli öğrenme ve farkındalık.' },
      ]
    },
    en: {
      badge: "About Us",
      heroTitle: "The Story of",
      heroTitleHighlight: "The Depths",
      heroSubtitle: "Since 2021, we have been researching, documenting and protecting the cultural and natural heritage of Anatolian waters.",
      mission: "Our Mission",
      missionText: "To research, document and pass on the rich cultural and natural heritage of Anatolian waters to future generations using scientific methods.",
      vision: "Our Vision",
      visionText: "To become a world-renowned, pioneering underwater research and education center.",
      aboutTitle: "About Our Association",
      aboutText: "Our association is a public benefit organization that brings together competent scientists working at various universities in Turkey and experts in our association's fields of work, in order to research the underwater riches of our country, introduce them to our country and the world through scientific publications, protect these riches and carry out projects in public-civil society partnership to pass them on to future generations. In addition, it aims to direct our youth to water sports, to train successful athletes through training programs in this direction, and to support our citizens who are amateur enthusiasts of water sports.",
      valuesTitle: "Our Values",
      valuesSubtitle: "Core principles guiding our work",
      locationTitle: "Visit Us",
      locationSubtitle: "Stop by our office or get in touch",
      address: "Address",
      phone: "Phone",
      email: "Email",
      socialTitle: "Follow Us on Social Media",
      socialSubtitle: "Follow us on our social media accounts for the latest news and events",
      ctaTitle: "Meet Our Team",
      ctaSubtitle: "Learn more about our experienced management staff and dive team",
      managementBoard: "Management Board",
      auditBoard: "Audit Board",
      values: [
        { title: 'Scientific Approach', description: 'We work with scientific methods and academic cooperation.' },
        { title: 'Sustainability', description: 'Protection of marine ecosystems is our priority.' },
        { title: 'Collaboration', description: 'We work together with national and international institutions.' },
        { title: 'Education', description: 'Continuous learning and awareness.' },
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.tr;

  const valueIcons = [
    <svg key="science" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    <svg key="sustainability" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="collaboration" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    <svg key="education" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ];

  // Sosyal medya platformları - Threads (Next Social) eklendi
  const socialPlatforms = [
    { 
      name: 'Instagram', 
      url: contactInfo?.instagram, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'from-purple-600 to-pink-600'
    },
    { 
      name: 'Facebook', 
      url: contactInfo?.facebook, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'from-blue-600 to-blue-700'
    },
    { 
      name: 'Next Social', 
      url: contactInfo?.nextSocial, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.54-7-9V8.3l7-3.5 7 3.5V11c0 3.46-3.13 8.04-7 9zm-1-7h2v2h-2v-2zm0-6h2v4h-2V7z"/>
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Twitter', 
      url: contactInfo?.twitter, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: 'from-gray-800 to-black'
    },
    { 
      name: 'YouTube', 
      url: contactInfo?.youtube, 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: 'from-red-600 to-red-700'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero with background image */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/news/news-1.png"
            alt="Hakkımızda arka plan"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-shallow/40 to-mid" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="opacity-0 animate-slideUp">
              <span className="inline-block px-4 py-2 rounded-full bg-ocean-cyan/10 border border-ocean-cyan/30 text-ocean-cyan text-sm font-semibold mb-6">
                {t.badge}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {t.heroTitle}
                <span className="block mt-2 text-ocean-cyan">{t.heroTitleHighlight}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo + About Description */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mid to-deep" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl opacity-0 animate-fadeIn">
              {/* Logo */}
              <div className="flex justify-center mb-12">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <Image
                    src="/hero/logo-1.png"
                    alt="ASAD Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                {t.aboutTitle}
              </h2>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed text-center max-w-4xl mx-auto">
                {t.aboutText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep to-abyss-light" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl opacity-0 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-cyan/30 to-ocean-navy/30 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{t.mission}</h2>
              <p className="text-white/70 leading-relaxed text-lg">
                {t.missionText}
              </p>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl opacity-0 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-cyan/30 to-ocean-navy/30 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{t.vision}</h2>
              <p className="text-white/70 leading-relaxed text-lg">
                {t.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-abyss-light to-black" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.valuesTitle}</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">{t.valuesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {t.values.map((v, i) => <ValueCard key={i} {...v} icon={valueIcons[i]} index={i} />)}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      {contactInfo && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-ocean-deep" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 opacity-0 animate-slideUp">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.locationTitle}</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">{t.locationSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Contact Info */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl opacity-0 animate-fadeIn">
                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ocean-cyan/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{t.address}</h3>
                      <p className="text-white/70 leading-relaxed">{contactInfo.addressTR}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ocean-cyan/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{t.phone}</h3>
                      <a href={`tel:${contactInfo.phoneNumber}`} className="text-ocean-cyan hover:text-ocean-cyan/80 transition-colors">
                        {contactInfo.phoneNumber}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ocean-cyan/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-ocean-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{t.email}</h3>
                      <div className="space-y-1">
                        <a href={`mailto:${contactInfo.primaryEmail}`} className="block text-ocean-cyan hover:text-ocean-cyan/80 transition-colors">
                          {contactInfo.primaryEmail}
                        </a>
                        {contactInfo.secondaryEmail && (
                          <a href={`mailto:${contactInfo.secondaryEmail}`} className="block text-ocean-cyan hover:text-ocean-cyan/80 transition-colors">
                            {contactInfo.secondaryEmail}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl opacity-0 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                {contactInfo.googleMapsUrl ? (
                  <iframe
                    src={contactInfo.googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ minHeight: '450px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-3xl"
                  />
                ) : (
                  <div className="h-full min-h-[450px] flex items-center justify-center text-white/50">
                    <p>{locale === 'tr' ? 'Harita yükleniyor...' : 'Loading map...'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Social Media */}
      {contactInfo && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-abyss" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 opacity-0 animate-slideUp">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.socialTitle}</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">{t.socialSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {socialPlatforms.map((platform, index) => (
                platform.url && (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group opacity-0 animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 shadow-xl hover:border-ocean-cyan/30 transition-all hover:scale-105 hover:-translate-y-2">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
                        {platform.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-ocean-cyan transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                        @anadolusad
                      </p>
                    </div>
                  </a>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-abyss to-black" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-lg bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 border border-ocean-cyan/20 rounded-3xl p-12 opacity-0 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.ctaTitle}</h2>
            <p className="text-lg text-white/70 mb-8">{t.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/hakkimizda/yonetim-kurulu`}>
                <button className="px-8 py-4 bg-ocean-cyan/80 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  {t.managementBoard}
                </button>
              </Link>
              <Link href={`/${locale}/hakkimizda/denetleme-kurulu`}>
                <button className="px-8 py-4 border-2 border-ocean-cyan text-white font-semibold rounded-xl hover:bg-ocean-cyan/10 transition-all hover:scale-105">
                  {t.auditBoard}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}