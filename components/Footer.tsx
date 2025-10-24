'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  locale: string;
  contactInfo?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  } | null;
}

export default function Footer({ locale, contactInfo }: FooterProps) {
  const content = {
    tr: {
      about: 'Anadolu sularının kültürel ve doğal mirasını araştırıyor, koruyoruz ve paylaşıyoruz.',
      corporate: 'Kurumsal',
      services: 'Hizmetler',
      resources: 'Kaynaklar',
      followUs: 'Bizi Takip Edin',
      copyright: 'Tüm hakları saklıdır.',
      links: {
        corporate: [
          { label: 'Hakkımızda', href: `/${locale}/hakkimizda` },
          { label: 'Hizmetler', href: `/${locale}/hakkimizda/hizmetler` },
          { label: 'Projeler', href: `/${locale}/hakkimizda/projeler` },
          { label: 'Yönetim Kurulu', href: `/${locale}/hakkimizda/yonetim-kurulu` },
          { label: 'Denetleme Kurulu', href: `/${locale}/hakkimizda/denetleme-kurulu` },
          
        ],
        services: [
          { label: 'Tüm Hizmetler', href: `/${locale}/hizmetler` },
          { label: 'Haberler', href: `/${locale}/haberler` },
          { label: 'Duyurular', href: `/${locale}/duyurular` },
          { label: 'Makaleler', href: `/${locale}/makaleler` },
        ],
        resources: [
          { label: 'Foto Galeri', href: `/${locale}/galeri/foto` },
          { label: 'Video Galeri', href: `/${locale}/galeri/video` },
          { label: 'İletişim', href: `/${locale}/iletisim` },
        ],
      }
    },
    en: {
      about: 'We research, protect and share the cultural and natural heritage of Anatolian waters.',
      corporate: 'Corporate',
      services: 'Services',
      resources: 'Resources',
      followUs: 'Follow Us',
      copyright: 'All rights reserved.',
      links: {
        corporate: [
          { label: 'About Us', href: `/${locale}/hakkimizda` },
          { label: 'Services', href: `/${locale}/hakkimizda/hizmetler` },
          { label: 'Projects', href: `/${locale}/hakkimizda/projeler` },
          { label: 'Management Board', href: `/${locale}/hakkimizda/yonetim-kurulu` },
          { label: 'Audit Board', href: `/${locale}/hakkimizda/denetleme-kurulu` },
          { label: 'President', href: `/${locale}/hakkimizda/baskan` },
          { label: 'Representative', href: `/${locale}/hakkimizda/temsilci` },
          { label: 'Our Sponsors', href: `/${locale}/hakkimizda/sponsorlarimiz` },
        ],
        services: [
          { label: 'All Services', href: `/${locale}/hizmetler` },
          { label: 'News', href: `/${locale}/haberler` },
          { label: 'Announcements', href: `/${locale}/duyurular` },
          { label: 'Articles', href: `/${locale}/makaleler` },
        ],
        resources: [
          { label: 'Photo Gallery', href: `/${locale}/galeri/foto` },
          { label: 'Video Gallery', href: `/${locale}/galeri/video` },
          { label: 'Contact', href: `/${locale}/iletisim` },
        ],
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.tr;

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: contactInfo?.instagram,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      url: contactInfo?.facebook,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'Twitter/X', 
      url: contactInfo?.twitter,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      url: contactInfo?.youtube,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
  ];

  // Sadece URL'si olan sosyal medyaları filtrele
  const activeSocialLinks = socialLinks.filter(social => social.url);

  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-ocean-cyan/20 to-transparent blur-xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Column 1: Logo & About */}
          <div className="lg:col-span-4">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-cyan/80 to-ocean-navy/80 flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/hero/preloader.png"
                  alt="ASAD Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-ocean-cyan transition-colors">ASAD</h3>
                <p className="text-xs text-white/50">
                  {locale === 'tr' ? 'Sualtı Araştırmaları ve Sporları' : 'Underwater Researchs und Sports'}
                </p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t.about}
            </p>
            
            {/* Social Links */}
            {activeSocialLinks.length > 0 && (
              <>
                <h4 className="text-white/80 text-sm font-semibold mb-3">{t.followUs}</h4>
                <div className="flex flex-wrap gap-3">
                  {activeSocialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-ocean-cyan/20 border border-white/10 hover:border-ocean-cyan/30 flex items-center justify-center text-white/60 hover:text-ocean-cyan transition-all"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Column 2: Corporate */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4">{t.corporate}</h4>
            <ul className="space-y-3">
              {t.links.corporate.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-ocean-cyan text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-ocean-cyan/50 rounded-full group-hover:w-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">{t.services}</h4>
            <ul className="space-y-3">
              {t.links.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-ocean-cyan text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-ocean-cyan/50 rounded-full group-hover:w-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4">{t.resources}</h4>
            <ul className="space-y-3">
              {t.links.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-ocean-cyan text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-ocean-cyan/50 rounded-full group-hover:w-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/40 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ASAD. {t.copyright}
            </p>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-white/40 hover:text-ocean-cyan text-sm transition-colors"
            >
              <span>{locale === 'tr' ? 'Başa Dön' : 'Back to Top'}</span>
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Ambient Light */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocean-cyan/10 to-transparent" />
    </footer>
  );
}