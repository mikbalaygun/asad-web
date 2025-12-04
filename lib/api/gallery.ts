// lib/api/gallery.ts
import { fetchAPI } from '../strapi';
import { PhotoGalleryImage, VideoGalleryItem } from '../types/gallery';

// ========== PHOTO GALLERY ==========

// Tüm aktif fotoğrafları getir (En yeniden eskiye)
export async function getAllPhotos(locale: 'tr' | 'en' = 'tr'): Promise<PhotoGalleryImage[]> {
  try {
    const response = await fetchAPI<PhotoGalleryImage[]>(
      '/photo-galleries?filters[isActive][$eq]=true&sort=publishedDate:desc&populate=image',
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

// Kategoriye göre fotoğrafları getir (En yeniden eskiye)
export async function getPhotosByCategory(
  category: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<PhotoGalleryImage[]> {
  try {
    const response = await fetchAPI<PhotoGalleryImage[]>(
      `/photo-galleries?filters[category][$eq]=${category}&filters[isActive][$eq]=true&sort=publishedDate:desc&populate=image`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching photos by category:', error);
    return [];
  }
}

// En son N fotoğraf
export async function getLatestPhotos(
  limit: number = 6,
  locale: 'tr' | 'en' = 'tr'
): Promise<PhotoGalleryImage[]> {
  try {
    const response = await fetchAPI<PhotoGalleryImage[]>(
      `/photo-galleries?filters[isActive][$eq]=true&sort=publishedDate:desc&pagination[limit]=${limit}&populate=image`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching latest photos:', error);
    return [];
  }
}

// ========== VIDEO GALLERY ==========

// Tüm aktif videoları getir (En yeniden eskiye)
export async function getAllVideos(locale: 'tr' | 'en' = 'tr'): Promise<VideoGalleryItem[]> {
  try {
    const response = await fetchAPI<VideoGalleryItem[]>(
      '/video-galleries?filters[isActive][$eq]=true&sort=publishedDate:desc&populate=thumbnail',
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

// Kategoriye göre videoları getir (En yeniden eskiye)
export async function getVideosByCategory(
  category: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<VideoGalleryItem[]> {
  try {
    const response = await fetchAPI<VideoGalleryItem[]>(
      `/video-galleries?filters[category][$eq]=${category}&filters[isActive][$eq]=true&sort=publishedDate:desc&populate=thumbnail`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    return [];
  }
}

// En son N video
export async function getLatestVideos(
  limit: number = 6,
  locale: 'tr' | 'en' = 'tr'
): Promise<VideoGalleryItem[]> {
  try {
    const response = await fetchAPI<VideoGalleryItem[]>(
      `/video-galleries?filters[isActive][$eq]=true&sort=publishedDate:desc&pagination[limit]=${limit}&populate=thumbnail`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching latest videos:', error);
    return [];
  }
}

// YouTube URL'den video ID çıkar
export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// YouTube thumbnail URL'i oluştur
export function getYouTubeThumbnail(url: string, quality: 'default' | 'hq' | 'maxres' = 'maxres'): string {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return '/placeholder.jpg';
  
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    maxres: 'maxresdefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

// YouTube embed URL'i oluştur
export function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}`;
}