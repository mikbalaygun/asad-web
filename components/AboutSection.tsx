'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef, useMemo } from 'react';

interface AboutSectionProps {
  locale: string;
}

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function AboutCard({ title, description, icon, delay }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      {/* Glass Card - Daha Soft */}
      <div className="relative backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 shadow-xl overflow-hidden transition-all duration-500 hover:border-ocean-cyan/30">

        {/* Background Glow - Çok Daha Subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon Container - Pastel Tonlar */}
        <motion.div
          className="relative mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-ocean-cyan/60 to-ocean-navy/60 flex items-center justify-center shadow-lg"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
          <div className="absolute inset-0 rounded-xl bg-ocean-cyan/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Content */}
        <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-ocean-cyan transition-colors">
          {title}
        </h3>
        <p className="relative text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
          {description}
        </p>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ocean-cyan/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Bottom Shine */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ocean-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export default function AboutSection({ locale }: AboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Sabit pozisyonlar - her render'da aynı kalacak
  const particlePositions = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      left: (i * 13 + 10) % 95,
      top: (i * 17 + 15) % 90,
      delay: i * 0.3,
      xOffset: Math.sin(i) * 20
    })),
    []
  );

  const content = {
    tr: {
      badge: "Biz Kimiz?",
      title: "Derinliklerde",
      titleHighlight: "Anlam Arıyoruz",
      subtitle: "Anadolu Sualtı Araştırmaları ve Sporları Derneği olarak, denizlerimizin zenginliklerini keşfediyor ve koruyoruz.",
      cta: "Daha Fazla Bilgi",
      cards: [
        {
          title: "Misyonumuz",
          description: "Anadolu sularının kültürel ve doğal mirasını bilimsel yöntemlerle araştırmak, belgelemek ve gelecek nesillere aktarmak."
        },
        {
          title: "Vizyonumuz",
          description: "Dünya çapında tanınan, öncü sualtı araştırma ve eğitim merkezi olmak; denizlerimizin korunmasında lider rol üstlenmek."
        },
        {
          title: "Değerlerimiz",
          description: "Bilimsellik, çevre duyarlılığı, ekip çalışması ve sürekli öğrenme ilkelerine bağlı kalarak hareket ediyoruz."
        }
      ]
    },
    en: {
      badge: "Who We Are?",
      title: "Seeking Meaning",
      titleHighlight: "In the Depths",
      subtitle: "As the Anatolian Underwater Research and Sports Association, we discover and protect the riches of our seas.",
      cta: "Learn More",
      cards: [
        {
          title: "Our Mission",
          description: "To research, document and pass on the cultural and natural heritage of Anatolian waters to future generations using scientific methods."
        },
        {
          title: "Our Vision",
          description: "To become a world-renowned, pioneering underwater research and education center; to take a leading role in protecting our seas."
        },
        {
          title: "Our Values",
          description: "We act in accordance with the principles of scientific approach, environmental awareness, teamwork and continuous learning."
        }
      ]
    }
  };

  const t = content[locale as keyof typeof content] || content.tr;

  const icons = [
    <svg key="mission" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg key="vision" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>,
    <svg key="values" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Gradient Background - Sığ Su Derinliği */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-shallow to-mid" />

      {/* Animated Water Caustics */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 40% at 30% 40%, rgba(46, 196, 182, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 70% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `,
            y
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-ocean-cyan/30 rounded-full blur-sm"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-ocean-cyan/10 border border-ocean-cyan/30 text-ocean-cyan text-sm font-semibold backdrop-blur-sm">
              {t.badge}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.title}
            <span className="block mt-2 text-ocean-cyan">{t.titleHighlight}</span>
          </h2>

          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {t.cards.map((card, index) => (
            <AboutCard
              key={index}
              title={card.title}
              description={card.description}
              icon={icons[index]}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link href={`/${locale}/hakkimizda`}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-ocean-cyan to-ocean-navy text-white font-semibold rounded-xl overflow-hidden shadow-glow hover:shadow-glow-lg transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.cta}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}