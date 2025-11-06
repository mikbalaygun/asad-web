// lib/api/news.ts
import { fetchAPI } from '../strapi';
import { News } from '../types/news';

// Tüm haberleri getir (pagination yok)
export async function getAllNews(locale: 'tr' | 'en' = 'tr'): Promise<News[]> {
  try {
    const response = await fetchAPI<News[]>(
      '/news?sort=publishedTime:desc&populate=coverImage&pagination[pageSize]=100',
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Slug'a göre haber getir
export async function getNewsBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<News | null> {
  try {
    const response = await fetchAPI<News[]>(
      `/news?filters[slug][$eq]=${slug}&populate=coverImage,localizations`,
      locale
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
}

// Kategoriye göre haberleri getir
export async function getNewsByCategory(
  category: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<News[]> {
  try {
    const response = await fetchAPI<News[]>(
      `/news?filters[category][$eq]=${category}&sort=publishedTime:desc&populate=coverImage&pagination[pageSize]=100`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news by category:', error);
    return [];
  }
}

// En son N haber
export async function getLatestNews(
  limit: number = 3,
  locale: 'tr' | 'en' = 'tr'
): Promise<News[]> {
  try {
    const response = await fetchAPI<News[]>(
      `/news?sort=publishedTime:desc&populate=coverImage&pagination[limit]=${limit}`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
}