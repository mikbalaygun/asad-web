'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}

function TabButton({ label, isActive, onClick, count }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-8 py-4 font-semibold text-lg transition-all duration-300 ${
        isActive 
          ? 'text-ocean-cyan' 
          : 'text-white/60 hover:text-white/80'
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {label}
        <span className={`text-xs px-2 py-1 rounded-full ${
          isActive 
            ? 'bg-ocean-cyan/20 text-ocean-cyan' 
            : 'bg-white/5 text-white/40'
        }`}>
          {count}
        </span>
      </span>
      
      {/* Active Indicator */}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ocean-cyan to-transparent"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
      
      {/* Glow Effect */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-ocean-cyan/5 rounded-lg -z-10"
        />
      )}
    </button>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <div className="relative backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col">
        
        {/* Image Container */}
        {item.image ? (
          <div className="relative w-full h-48 overflow-hidden bg-ocean-navy/20">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-ocean-cyan/90 backdrop-blur-sm text-white text-xs font-semibold">
                {item.category}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-48 bg-gradient-to-br from-ocean-cyan/10 to-ocean-navy/10 flex items-center justify-center">
            <svg className="w-16 h-16 text-ocean-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-ocean-cyan/20 backdrop-blur-sm text-ocean-cyan text-xs font-semibold">
                {item.category}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Date */}
          <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time>{item.date}</time>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white/95 mb-3 group-hover:text-ocean-cyan/90 transition-colors line-clamp-2">
            {item.title}
          </h3>

          {/* Excerpt */}
          <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {item.excerpt}
          </p>

          {/* Read More Link */}
          <motion.div
            className="flex items-center gap-2 text-ocean-cyan/80 text-sm font-medium"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span>Devamını Oku</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>

        {/* Bioluminescence Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered 
              ? 'radial-gradient(circle at 50% 50%, rgba(74, 155, 142, 0.1) 0%, transparent 70%)'
              : 'transparent'
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Bottom Glow */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ocean-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>
    </motion.article>
  );
}

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<'news' | 'announcements'>('news');

  // Mock data - Strapi'den gelecek
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Karadeniz'de Yeni Batık Gemi Keşfedildi",
      excerpt: "Ekibimiz Karadeniz'in 65 metre derinliğinde tarihi bir ticaret gemisinin kalıntılarını keşfetti. İlk incelemeler geminin 18. yüzyıla ait olduğunu gösteriyor.",
      date: "15 Ocak 2025",
      category: "Keşif",
      image: "/news/shipwreck.jpg" // Placeholder
    },
    {
      id: 2,
      title: "Yeni Dalış Sezonu Eğitimleri Başlıyor",
      excerpt: "2025 bahar sezonu dalış eğitimlerimiz Mart ayında başlayacak. PADI ve SSI sertifika programları için kayıtlar açıldı.",
      date: "10 Ocak 2025",
      category: "Eğitim",
    },
    {
      id: 3,
      title: "Deniz Temizliği Etkinliği Büyük İlgi Gördü",
      excerpt: "Marmara'da düzenlediğimiz sualtı temizlik etkinliğine 80'den fazla gönüllü dalgıç katıldı. 2 ton atık toplandı.",
      date: "5 Ocak 2025",
      category: "Etkinlik",
    }
  ];

  const announcements: NewsItem[] = [
    {
      id: 4,
      title: "Üyelik Ücretlerinde Güncelleme",
      excerpt: "2025 yılı üyelik ücretleri ve yeni üye avantajları hakkında detaylı bilgi için duyuru sayfamızı ziyaret edebilirsiniz.",
      date: "20 Ocak 2025",
      category: "Duyuru",
    },
    {
      id: 5,
      title: "Yeni Ekipman Kiralama Hizmeti",
      excerpt: "Üyelerimiz için profesyonel dalış ekipmanı kiralama hizmeti başladı. Uygun fiyatlarla en son teknoloji ekipmanlara erişin.",
      date: "18 Ocak 2025",
      category: "Hizmet",
    },
    {
      id: 6,
      title: "Genel Kurul Toplantısı - 15 Şubat",
      excerpt: "Derneğimizin yıllık olağan genel kurul toplantısı 15 Şubat 2025 tarihinde gerçekleştirilecektir. Tüm üyelerimizi bekliyoruz.",
      date: "12 Ocak 2025",
      category: "Toplantı",
    }
  ];

  const currentItems = activeTab === 'news' ? newsItems : announcements;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient Background - Derin Su */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-abyss-light to-abyss" />
      
      {/* Bioluminescent Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-biolum/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(91, 163, 156, 0.6)',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-biolum/10 border border-biolum/20 text-biolum text-sm font-semibold backdrop-blur-sm">
              Güncel Gelişmeler
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white/95 mb-6">
            Son Haberler ve
            <span className="block mt-2 text-biolum/90">Duyurular</span>
          </h2>
          
          <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            Sualtı dünyasından en son haberleri ve dernek duyurularını takip edin
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-1">
            <TabButton
              label="Haberler"
              isActive={activeTab === 'news'}
              onClick={() => setActiveTab('news')}
              count={newsItems.length}
            />
            <TabButton
              label="Duyurular"
              isActive={activeTab === 'announcements'}
              onClick={() => setActiveTab('announcements')}
              count={announcements.length}
            />
          </div>
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12"
          >
            {currentItems.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-biolum/20 to-ocean-cyan/20 border border-biolum/30 text-white font-semibold rounded-xl overflow-hidden backdrop-blur-sm transition-all hover:border-biolum/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Tümünü Görüntüle
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-biolum/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}