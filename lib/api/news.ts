// lib/api/news.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  publishedTime: string;
  isActive: boolean;
  locale: string;
  parentId: number | null;
  createdAt: string;
  localizations?: News[];
}

// Tüm haberleri getir
export async function getAllNews(locale: "tr" | "en" = "tr", limit?: number): Promise<News[]> {
  try {
    const params: Record<string, string | number> = {};
    if (limit) params.limit = limit;
    const response = await fetchAPI<News[]>("/news", { locale, ...params });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Slug'a göre haber getir
export async function getNewsBySlug(slug: string, locale: "tr" | "en" = "tr"): Promise<News | null> {
  try {
    const response = await fetchAPI<News[]>(`/news?slug=${slug}`, { locale });
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }
}

// ID'ye göre haber getir
export async function getNewsById(id: number): Promise<News | null> {
  try {
    const response = await fetchAPI<News>(`/news/${id}`);
    return response.data || null;
  } catch (error) {
    console.error("Error fetching news by id:", error);
    return null;
  }
}

// Son haberler
export async function getLatestNews(limit: number = 5, locale: "tr" | "en" = "tr"): Promise<News[]> {
  return getAllNews(locale, limit);
}

export { getMediaUrl };