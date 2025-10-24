// lib/types/gallery.ts

export type PhotoCategory = 'Dalışlar' | 'Keşifler' | 'Etkinlikler' | 'Eğitimler' | 'Çevre';
export type VideoCategory = 'Dalışlar' | 'Keşifler' | 'Etkinlikler' | 'Eğitimler' | 'Belgeseller';

export interface PhotoGalleryImage {
  id: number;
  documentId: string;
  title: string;
  category: PhotoCategory;
  image: {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  };
  publishedDate: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface VideoGalleryItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  category: VideoCategory;
  youtubeLink: string;
  thumbnail: {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  } | null;
  publishedDate: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}