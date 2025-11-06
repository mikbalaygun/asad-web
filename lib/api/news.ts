// lib/api/news.ts
import { fetchAPI } from '../strapi';
import { News } from '../types/news';

function mapLocaleForStrapi(l: 'tr' | 'en') {
  return l === 'tr' ? 'tr-TR' : 'en';
}

// Tüm haberler
export async function getAllNews(locale: 'tr' | 'en' = 'tr'): Promise<News[]> {
  try {
    // publishedTime alanın yoksa publishedAt kullan
    const url =
      `/news?sort=${encodeURIComponent('publishedAt:desc')}` +
      `&populate=coverImage` +
      `&pagination[pageSize]=100` +
      `&publicationState=live` +
      `&locale=${encodeURIComponent(mapLocaleForStrapi(locale))}`;

    const response = await fetchAPI<News[]>(url);
    return response.data ?? [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Slug'a göre tek haber
export async function getNewsBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<News | null> {
  try {
    const url =
      `/news?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      `&populate=coverImage,localizations` +
      `&publicationState=live` +
      `&locale=${encodeURIComponent(mapLocaleForStrapi(locale))}`;

    const response = await fetchAPI<News[]>(url);
    return response.data?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
}

// En son N haber
export async function getLatestNews(
  limit: number = 3,
  locale: 'tr' | 'en' = 'tr'
): Promise<News[]> {
  try {
    const url =
      `/news?sort=${encodeURIComponent('publishedAt:desc')}` + // gerekirse publishedTime:desc
      `&populate=coverImage` +
      `&pagination[limit]=${encodeURIComponent(String(limit))}` +
      `&publicationState=live` +
      `&locale=${encodeURIComponent(mapLocaleForStrapi(locale))}`;

    const response = await fetchAPI<News[]>(url);
    return response.data ?? [];
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
}
