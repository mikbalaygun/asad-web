// lib/api/articles.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  pdfUrl?: string | null;
  publishedDate: string;
  isActive: boolean;
  locale: string;
  localizations?: Array<{
    id: number;
    title: string;
    slug: string;
    locale: string;
  }>;
}

export async function getAllArticles(locale: "tr" | "en" = "tr"): Promise<Article[]> {
  try {
    const response = await fetchAPI<Article[]>("/articles", { locale });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string, locale: "tr" | "en" = "tr"): Promise<Article | null> {
  try {
    const response = await fetchAPI<Article[]>("/articles", {
      locale,
      filters: { slug }
    });
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
}

export async function getLatestArticles(limit: number = 5, locale: "tr" | "en" = "tr"): Promise<Article[]> {
  try {
    const response = await fetchAPI<Article[]>("/articles", { locale, limit });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return [];
  }
}

export { getMediaUrl };