// components/Hero.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

interface Props {
  locale: string;
}

export default function Hero({ locale }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden bg-ocean-deep"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{ scale, willChange: 'transform' }}
      >
        <Image
          src="/hero/hero-diver.webp"
          alt="Diver in deep water"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={90}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/40 via-transparent to-ocean-deep" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ opacity }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center text-white max-w-5xl mx-auto"
          >
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block drop-shadow-2xl">
                {locale === 'tr' ? 'Derinliklerde Bilim,' : 'Science in the Depths,'}
              </span>
              <span className="block mt-2 text-ocean-cyan drop-shadow-[0_0_40px_rgba(46,196,182,0.8)]">
                {locale === 'tr' ? 'Yüzeyde Paylaşım' : 'Sharing on the Surface'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-lg leading-relaxed">
              {locale === 'tr'
                ? 'Anadolu sularının kültürel ve doğal mirasını araştırıyor, koruyor ve paylaşıyoruz'
                : 'We research, protect and share the cultural and natural heritage of Anatolian waters'
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link href={`/${locale}/hakkimizda`}>
                <motion.button
                  className="group relative px-5 py-3 sm:px-8 sm:py-4 bg-ocean-cyan text-ocean-deep font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(46,196,182,0.8)] w-full sm:w-auto text-sm sm:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {locale === 'tr' ? 'Hakkımızda' : 'About Us'}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.button>
              </Link>

              <Link href={`/${locale}/hizmetler`}>
                <motion.button
                  className="px-5 py-3 sm:px-8 sm:py-4 border-2 border-ocean-cyan text-white font-semibold rounded-xl hover:bg-ocean-cyan/10 transition-all duration-300 backdrop-blur-sm bg-ocean-deep/40 w-full sm:w-auto text-sm sm:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {locale === 'tr' ? 'Hizmetler' : 'Services'}
                </motion.button>
              </Link>

              <Link href={`/${locale}/iletisim`}>
                <motion.button
                  className="px-5 py-3 sm:px-8 sm:py-4 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white hover:text-ocean-deep transition-all duration-300 backdrop-blur-sm bg-ocean-deep/40 w-full sm:w-auto text-sm sm:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {locale === 'tr' ? 'İletişim' : 'Contact'}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <span className="text-xs text-white/60 uppercase tracking-wider group-hover:text-ocean-cyan transition-colors">
            {locale === 'tr' ? 'Keşfet' : 'Explore'}
          </span>
          <div className="w-6 h-10 border-2 border-ocean-cyan rounded-full flex justify-center shadow-[0_0_20px_rgba(46,196,182,0.4)]">
            <motion.div
              className="w-1.5 h-1.5 bg-ocean-cyan rounded-full mt-2"
              animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}