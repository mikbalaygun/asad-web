'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { VideoGalleryItem } from '@/lib/types/gallery';
import { getStrapiMedia } from '@/lib/strapi';
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/api/gallery';

interface VideoGalleryProps {
  videos: VideoGalleryItem[];
  locale: string;
}

function VideoCard({ video, onClick, index }: { video: VideoGalleryItem; onClick: () => void; index: number }) {
  // Thumbnail: Strapi'den varsa onu kullan, yoksa YouTube'dan al
  const thumbnailUrl = video.thumbnail 
    ? getStrapiMedia(video.thumbnail.url)
    : getYouTubeThumbnail(video.youtubeLink);

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-ocean-navy/20 backdrop-blur-lg border border-white/10 hover:border-ocean-cyan/30 transition-all duration-300 opacity-0 animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-ocean-cyan/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>

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
        {video.description && (
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {video.description}
          </p>
        )}
        <div className="flex items-center justify-between text-white/50 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time>{new Date(video.publishedDate).toLocaleDateString('tr-TR')}</time>
          </div>
        </div>
      </div>
    </div>
  );
}

// YouTube Video Modal
function VideoModal({ video, onClose }: { video: VideoGalleryItem | null; onClose: () => void }) {
  if (!video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.youtubeLink);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Close"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
        {/* YouTube iframe */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        
        {/* Video Info */}
        <div className="mt-6 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-white text-2xl font-bold mb-2">{video.title}</h3>
              {video.description && (
                <p className="text-white/70">{video.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time>{new Date(video.publishedDate).toLocaleDateString('tr-TR')}</time>
            </div>
            <span className="px-3 py-1 rounded-full bg-ocean-cyan/20 text-ocean-cyan text-xs font-semibold">
              {video.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoGalleryClient({ videos, locale }: VideoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [selectedVideo, setSelectedVideo] = useState<VideoGalleryItem | null>(null);

  const content = {
    tr: {
      breadcrumb: 'Ana Sayfa',
      gallery: 'Galeri',
      title: 'Video Galeri',
      subtitle: 'Sualtı maceralarından videolar ve belgeseller',
      photos: 'Fotoğraflar',
      videos: 'Videolar',
      photosTab: 'Fotoğraflar',
      videosTab: 'Videolar',
      found: 'video bulundu',
      categories: {
        all: 'Tümü',
        dives: 'Dalışlar',
        discoveries: 'Keşifler',
        events: 'Etkinlikler',
        training: 'Eğitimler',
        documentaries: 'Belgeseller'
      }
    },
    en: {
      breadcrumb: 'Home',
      gallery: 'Gallery',
      title: 'Video Gallery',
      subtitle: 'Videos and documentaries from underwater adventures',
      photos: 'Photos',
      videos: 'Videos',
      photosTab: 'Photos',
      videosTab: 'Videos',
      found: 'videos found',
      categories: {
        all: 'All',
        dives: 'Dives',
        discoveries: 'Discoveries',
        events: 'Events',
        training: 'Training',
        documentaries: 'Documentaries'
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.tr;

  // Kategori mapping
  const categoryMap: Record<string, string> = {
    'Tümü': 'all',
    'Dalışlar': 'dives',
    'Keşifler': 'discoveries',
    'Etkinlikler': 'events',
    'Eğitimler': 'training',
    'Belgeseller': 'documentaries'
  };

  const categories = ['Tümü', 'Dalışlar', 'Keşifler', 'Etkinlikler', 'Eğitimler', 'Belgeseller'];

  const filteredVideos = videos.filter(
    v => activeCategory === 'Tümü' || v.category === activeCategory
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/news/news-4.png" alt="Background" fill className="object-cover" priority quality={75} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-deep/85 to-ocean-deep" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6 opacity-0 animate-fadeIn">
            <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">{t.breadcrumb}</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${locale}/galeri`} className="hover:text-ocean-cyan transition-colors">{t.gallery}</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/90">{t.videos}</span>
          </div>

          {/* Title */}
          <div className="mb-12 opacity-0 animate-slideUp" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{t.title}</h1>
            <p className="text-xl text-white/70 max-w-3xl">{t.subtitle}</p>
          </div>

          {/* Photo/Video Toggle */}
          <div className="flex justify-center mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '200ms' }}>
            <div className="inline-flex backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-1">
              <Link href={`/${locale}/galeri/foto`}>
                <button className="px-8 py-3 rounded-xl font-medium transition-all text-white/70 hover:text-white">
                  {t.photosTab}
                </button>
              </Link>
              <Link href={`/${locale}/galeri/video`}>
                <button className="px-8 py-3 rounded-xl font-medium transition-all bg-ocean-cyan text-white shadow-lg">
                  {t.videosTab}
                </button>
              </Link>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 opacity-0 animate-slideUp" style={{ animationDelay: '300ms' }}>
            {categories.map((category) => {
              const translatedCategory = t.categories[categoryMap[category] as keyof typeof t.categories] || category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 ${
                    activeCategory === category
                      ? 'bg-ocean-cyan/80 text-white shadow-lg'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {translatedCategory}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-white/60">
            {filteredVideos.length} {t.found}
          </div>

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">
                {locale === 'tr' ? 'Video bulunamadı.' : 'No videos found.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
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
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}