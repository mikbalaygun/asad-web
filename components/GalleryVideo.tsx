'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/components/i18n';

interface GalleryVideo {
  id: number;
  thumbnail: string;
  videoUrl: string;
  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
  views?: string;
}

function VideoCard({ video, onClick, index }: { video: GalleryVideo; onClick: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-ocean-navy/20 backdrop-blur-lg border border-white/10 hover:border-ocean-cyan/30 transition-all duration-500"
    >
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 rounded-full bg-ocean-cyan/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
          >
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </motion.div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-white text-sm font-semibold">
          {video.duration}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-ocean-cyan/90 backdrop-blur-sm text-white text-xs font-semibold">
            {video.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-white text-lg font-bold mb-2 line-clamp-2 group-hover:text-ocean-cyan transition-colors">
          {video.title}
        </h3>
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-white/50 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time>{video.date}</time>
          </div>
          {video.views && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{video.views}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function VideoModal({ video, onClose }: { video: GalleryVideo | null; onClose: () => void }) {
  if (!video) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Player */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-6xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
            {/* Placeholder for video player - YouTube, Vimeo veya custom player buraya gelecek */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ocean-cyan/20 to-ocean-navy/20">
              <div className="text-center">
                <svg className="w-24 h-24 text-white/50 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white/70 text-lg">Video Oynatıcı</p>
                <p className="text-white/50 text-sm mt-2">{video.videoUrl}</p>
              </div>
            </div>
          </div>
          
          {/* Video Info */}
          <div className="mt-6 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-2">{video.title}</h3>
                <p className="text-white/70">{video.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time>{video.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{video.duration}</span>
              </div>
              {video.views && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{video.views} görüntülenme</span>
                </div>
              )}
              <span className="px-3 py-1 rounded-full bg-ocean-cyan/20 text-ocean-cyan text-xs font-semibold">
                {video.category}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function VideoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);
  const locale = useLocale();

  const categories = ['Tümü', 'Dalışlar', 'Keşifler', 'Etkinlikler', 'Eğitimler', 'Belgeseller'];

  // Mock data - Videos
  const videos: GalleryVideo[] = [
    { 
      id: 1, 
      thumbnail: '/news/news-1.png', 
      videoUrl: 'https://youtube.com/watch?v=example1',
      title: 'Karadeniz Batık Gemi Belgeseli', 
      description: 'Karadeniz\'in derinliklerinde keşfedilen tarihi ticaret gemisinin detaylı incelemesi',
      category: 'Belgeseller', 
      date: '15 Ocak 2025', 
      duration: '12:45',
      views: '2.5K'
    },
    { 
      id: 2, 
      thumbnail: '/news/news-2.png', 
      videoUrl: 'https://youtube.com/watch?v=example2',
      title: 'Serbest Dalış Teknikleri', 
      description: 'Profesyonel eğitmenlerimizden freediving tekniklerini öğrenin',
      category: 'Eğitimler', 
      date: '10 Ocak 2025', 
      duration: '8:30',
      views: '1.8K'
    },
    { 
      id: 3, 
      thumbnail: '/hero/hero-diver.webp', 
      videoUrl: 'https://youtube.com/watch?v=example3',
      title: 'Gece Dalışı Deneyimi', 
      description: 'Karanlığın büyüsüyle sualtı dünyasını keşfedin',
      category: 'Dalışlar', 
      date: '5 Ocak 2025', 
      duration: '15:20',
      views: '3.2K'
    },
    { 
      id: 4, 
      thumbnail: '/news/news-1.png', 
      videoUrl: 'https://youtube.com/watch?v=example4',
      title: 'Mercan Resifleri ve Deniz Yaşamı', 
      description: 'Akdeniz\'in zengin mercan ekosistemine yakından bakış',
      category: 'Keşifler', 
      date: '2 Ocak 2025', 
      duration: '10:15',
      views: '1.5K'
    },
    { 
      id: 5, 
      thumbnail: '/news/news-2.png', 
      videoUrl: 'https://youtube.com/watch?v=example5',
      title: 'Deniz Temizliği Etkinliği 2024', 
      description: 'Gönüllü dalgıçlarımızla gerçekleştirdiğimiz temizlik çalışması',
      category: 'Etkinlikler', 
      date: '28 Aralık 2024', 
      duration: '7:45',
      views: '980'
    },
    { 
      id: 6, 
      thumbnail: '/hero/hero-diver.webp', 
      videoUrl: 'https://youtube.com/watch?v=example6',
      title: 'Teknik Dalış Eğitimi', 
      description: 'İleri seviye teknik dalış eğitimimizden görüntüler',
      category: 'Eğitimler', 
      date: '20 Aralık 2024', 
      duration: '18:30',
      views: '2.1K'
    },
  ];

  const filteredVideos = videos.filter(v => activeCategory === 'Tümü' || v.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero/hero-diver.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/85 to-ocean-deep" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">
              Ana Sayfa
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${locale}/galeri`} className="hover:text-ocean-cyan transition-colors">
              Galeri
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">Videolar</span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Video Galeri</h1>
            <p className="text-xl text-white/70 max-w-3xl">Sualtı maceralarından videolar ve belgeseller</p>
          </motion.div>

          {/* Gallery Type Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-1">
              <Link href={`/${locale}/galeri/foto`}>
                <button className="px-8 py-3 rounded-xl font-medium transition-all text-white/70 hover:text-white">
                  Fotoğraflar
                </button>
              </Link>
              <Link href={`/${locale}/galeri/video`}>
                <button className="px-8 py-3 rounded-xl font-medium transition-all bg-ocean-cyan text-white shadow-lg">
                  Videolar
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeCategory === category
                    ? 'bg-ocean-cyan/80 text-white shadow-lg'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-white/60"
          >
            {filteredVideos.length} video bulundu
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setSelectedVideo(video)}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}