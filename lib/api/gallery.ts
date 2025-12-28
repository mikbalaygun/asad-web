// lib/api/gallery.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface PhotoItem {
  id: number;
  title: string;
  category: string;
  image: string; // Changed from imageUrl
  alternativeText: string | null;
  publishedDate: string;
  isActive: boolean;
  locale: string;
}

export interface VideoItem {
  id: number;
  title: string;
  description: string | null;
  category: string;
  youtubeLink: string;
  thumbnail: string | null;
  publishedDate: string;
  isActive: boolean;
  locale: string;
}

export async function getAllPhotos(locale: "tr" | "en" = "tr"): Promise<PhotoItem[]> {
  try {
    const response = await fetchAPI<PhotoItem[]>("/photo-gallery", { locale });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}

export async function getPhotosByCategory(category: string, locale: "tr" | "en" = "tr"): Promise<PhotoItem[]> {
  try {
    const response = await fetchAPI<PhotoItem[]>("/photo-gallery", { locale, filters: { category } });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching photos by category:", error);
    return [];
  }
}

export async function getAllVideos(locale: "tr" | "en" = "tr"): Promise<VideoItem[]> {
  try {
    const response = await fetchAPI<VideoItem[]>("/video-gallery", { locale });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export function getYouTubeThumbnail(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : "";
}

export function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : "";
}

export { getMediaUrl };