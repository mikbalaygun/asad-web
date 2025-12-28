'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PhotoItem } from '@/lib/api/gallery';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  locale: string;
}

function PhotoCard({ photo, onClick, index }: { photo: PhotoItem; onClick: () => void; index: number }) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-ocean-navy/20 opacity-0 animate-fadeIn"
      style={{
        breakInside: 'avoid',
        marginBottom: '1rem',
        animationDelay: `${index * 50}ms`
      }}
    >
      {/* aspect-[4/3] on desktop, aspect-[16/10] on mobile for larger images */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3]">
        <Image
          src={photo.image}
          alt={photo.alternativeText || photo.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Info Overlay - Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold mb-1">{photo.title}</h3>
          <div className="flex items-center gap-3 text-white/70 text-sm">
            <span className="px-2 py-1 rounded bg-ocean-cyan/80 text-xs">{photo.category}</span>
            <span>{new Date(photo.publishedDate).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>

        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Lightbox Component
function Lightbox({ photo, onClose, onNext, onPrev }: {
  photo: PhotoItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Close"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Previous"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image Container */}
      <div className="flex flex-col items-center max-w-5xl max-h-[90vh] mx-16" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full" style={{ maxHeight: 'calc(90vh - 100px)' }}>
          <img
            src={photo.image}
            alt={photo.alternativeText || photo.title}
            className="max-w-full max-h-[calc(90vh-100px)] object-contain mx-auto rounded-lg"
          />
        </div>

        {/* Info Below Image */}
        <div className="w-full mt-4 px-4 text-center">
          <h3 className="text-white text-xl font-bold mb-2">{photo.title}</h3>
          <div className="flex items-center justify-center gap-3 text-white/70">
            <span className="px-3 py-1 rounded bg-ocean-cyan/80 text-white text-sm">{photo.category}</span>
            <span>{new Date(photo.publishedDate).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
        aria-label="Next"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function PhotoGalleryClient({ photos, locale }: PhotoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const content = {
    tr: {
      breadcrumb: 'Ana Sayfa',
      gallery: 'Galeri',
      title: 'Foto Galeri',
      subtitle: 'Sualtı dünyasından en etkileyici anlar',
      photos: 'Fotoğraflar',
      videos: 'Videolar',
      found: 'fotoğraf bulundu',
      noPhotos: 'Fotoğraf bulunamadı.'
    },
    en: {
      breadcrumb: 'Home',
      gallery: 'Gallery',
      title: 'Photo Gallery',
      subtitle: 'The most impressive moments from the underwater world',
      photos: 'Photos',
      videos: 'Videos',
      found: 'photos found',
      noPhotos: 'No photos found.'
    }
  };

  const t = content[locale as keyof typeof content] || content.tr;

  // Get unique categories from photos
  const categories = ['Tümü', ...Array.from(new Set(photos.map(p => p.category).filter(Boolean)))];

  const filteredPhotos = photos.filter(
    p => activeCategory === 'Tümü' || p.category === activeCategory
  );

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

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
            <span className="text-white/90">{t.photos}</span>
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
                <button className="px-8 py-3 rounded-xl font-medium transition-all bg-ocean-cyan text-white shadow-lg">
                  {t.photos}
                </button>
              </Link>
              <Link href={`/${locale}/galeri/video`}>
                <button className="px-8 py-3 rounded-xl font-medium transition-all text-white/70 hover:text-white">
                  {t.videos}
                </button>
              </Link>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 opacity-0 animate-slideUp" style={{ animationDelay: '300ms' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 ${activeCategory === category
                  ? 'bg-ocean-cyan/80 text-white shadow-lg'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-white/60">
            {filteredPhotos.length} {t.found}
          </div>

          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredPhotos.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={() => setSelectedPhoto(photo)}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">{t.noPhotos}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={handleNext}
          onPrev={handlePrev}
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