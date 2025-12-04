'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useT, useLocale } from '@/components/i18n';
import LocaleSwitcher from '@/components/LocaleSwitcher';

interface DropdownItem {
  label: string;
  href: string;
  icon?: string;
}

const DropdownMenu = memo(({ items }: { items: DropdownItem[] }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.15 }}
    className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-ocean-navy/95 backdrop-blur-xl border border-ocean-cyan/20 shadow-glow overflow-hidden"
  >
    {items.map((dropItem) => (
      <Link
        key={dropItem.href}
        href={dropItem.href}
        prefetch
        className="block px-4 py-3 text-sm text-white/80 hover:text-ocean-cyan hover:bg-ocean-cyan/10 transition-all border-b border-white/5 last:border-0"
      >
        {dropItem.label}
      </Link>
    ))}
  </motion.div>
));
DropdownMenu.displayName = 'DropdownMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname() || '/tr';
  const router = useRouter();
  const t = useT();
  const locale = useLocale(); // 'tr' | 'en'

  // prefetch
  useEffect(() => {
    const pagesToPrefetch = [
      `/${locale}`,
      `/${locale}/hakkimizda`,
      `/${locale}/haberler`,
      `/${locale}/duyurular`,
      `/${locale}/makaleler`,
      `/${locale}/galeri`,
      `/${locale}/iletisim`,
      `/${locale}/hizmetler`,
      `/${locale}/projeler`,
      `/${locale}/hakkimizda/denetleme-kurulu`,
      `/${locale}/hakkimizda/yonetim-kurulu`,
      `/${locale}/hakkimizda/baskan`,
      `/${locale}/hakkimizda/temsilci`,
      `/${locale}/hakkimizda/gep-plani`,
      `/${locale}/hakkimizda/sponsorlarimiz`,
      `/${locale}/galeri/foto`,
      `/${locale}/galeri/video`,
    ];
    const id = setTimeout(() => pagesToPrefetch.forEach((p) => router.prefetch(p)), 500);
    return () => clearTimeout(id);
  }, [locale, router]);

  // scroll state
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolled(window.scrollY > 20), 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleMouseEnter = useCallback((label: string) => setActiveDropdown(label), []);
  const handleMouseLeave = useCallback(() => setActiveDropdown(null), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((p) => !p), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // 1) Hakkımızda dropdown
  const aboutDropdown: DropdownItem[] = [
    { label: t('nav.aboutPages.about'), href: `/${locale}/hakkimizda` },
    { label: t('nav.aboutPages.services'), href: `/${locale}/hizmetler` },
    { label: t('nav.aboutPages.projects'), href: `/${locale}/projeler` },
    { label: t('nav.aboutPages.board'), href: `/${locale}/hakkimizda/denetleme-kurulu` },
    { label: t('nav.aboutPages.management'), href: `/${locale}/hakkimizda/yonetim-kurulu` },
    { label: t('nav.aboutPages.president'), href: `/${locale}/hakkimizda/baskan` },
    { label: t('nav.aboutPages.representative'), href: `/${locale}/hakkimizda/temsilci` },
    { label: t('nav.aboutPages.gep'), href: `/${locale}/hakkimizda/gep-plani` },
    { label: t('nav.aboutPages.sponsors'), href: `/${locale}/hakkimizda/sponsorlarimiz` },
  ];

  // 2) Galeri dropdown
  const galleryDropdown: DropdownItem[] = [
    { label: t('nav.galleryPages.photo'), href: `/${locale}/galeri/foto` },
    { label: t('nav.galleryPages.video'), href: `/${locale}/galeri/video` },
  ];


  const navItems = [
    { label: t('nav.home'), href: `/${locale}` },
    { label: t('nav.about'), href: `/${locale}/hakkimizda`, dropdown: aboutDropdown },
    { label: t('nav.news'), href: `/${locale}/haberler` },
    { label: t('nav.announcements'), href: `/${locale}/duyurular` },
    { label: t('nav.articles'), href: `/${locale}/makaleler` },
    { label: t('nav.gallery'), href: `/${locale}/galeri`, dropdown: galleryDropdown },
    { label: t('nav.contact'), href: `/${locale}/iletisim` },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-ocean-deep/95 backdrop-blur-xl shadow-lg border-b border-ocean-cyan/20'
            : 'bg-transparent backdrop-blur-sm'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo */}
            <Link href={`/${locale}`} prefetch className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="relative">
                <Image
                  src="/hero/preloader.png"
                  alt="ASAD Logo"
                  width={48}
                  height={48}
                  priority
                  className="w-12 h-12 object-contain drop-shadow-md"
                />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white group-hover:text-ocean-cyan transition-colors">ASAD</h1>
                <p className="text-xs text-white/60 -mt-1">{t('brand.tagline') ?? 'Sualtı Araştırmaları'}</p>
              </div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      prefetch
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${active ? 'text-ocean-cyan bg-ocean-cyan/10' : 'text-white/85 hover:text-ocean-cyan hover:bg-white/10'
                        }`}
                    >
                      {item.label}
                      {item.dropdown && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>
                    <AnimatePresence>
                      {item.dropdown && activeDropdown === item.label && <DropdownMenu items={item.dropdown} />}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <LocaleSwitcher />
              <motion.a
                href="/uye-basvuru-formu.doc"
                download="ASAD-Uye-Basvuru-Formu.doc"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="hidden md:flex items-center gap-2 px-5 py-2 bg-ocean-cyan text-ocean-deep font-semibold rounded-lg shadow-glow hover:shadow-glow-lg transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
                </svg>
                {t('nav.cta')}
              </motion.a>
              <button
                onClick={() => setIsMobileMenuOpen((p) => !p)}
                className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                aria-label="Menu"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-ocean-deep/98 backdrop-blur-xl border-l border-ocean-cyan/20 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6 pt-24 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.href} className="border-b border-white/10 last:border-0">
                  <Link
                    href={item.href}
                    prefetch
                    onClick={() => !item.dropdown && closeMobileMenu()}
                    className="block py-4 text-lg font-medium text-white/80 hover:text-ocean-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 pb-2">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.href}
                          href={dropItem.href}
                          prefetch
                          onClick={closeMobileMenu}
                          className="block py-2 text-sm text-white/60 hover:text-ocean-cyan transition-colors"
                        >
                          → {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="/uye-basvuru-formu.doc"
                download="ASAD-Uye-Basvuru-Formu.doc"
                className="mt-6 w-full py-3 bg-ocean-cyan text-ocean-deep font-semibold rounded-lg shadow-glow flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
                </svg>
                {t('nav.cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}