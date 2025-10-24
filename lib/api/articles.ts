// lib/api/articles.ts
import { fetchAPI } from '../strapi';
import { Article } from '../types/article';

// Tüm aktif makaleleri getir
export async function getAllArticles(locale: 'tr' | 'en' = 'tr'): Promise<Article[]> {
  try {
    const response = await fetchAPI<Article[]>(
      '/articles?populate=localizations&sort=publishedDate:desc',
      locale
    );
    
    const articles = response.data || [];
    return articles.filter(a => a.isActive !== false);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Slug'a göre makale getir
export async function getArticleBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Article | null> {
  try {
    const response = await fetchAPI<Article[]>(
      `/articles?filters[slug][$eq]=${slug}&populate=localizations`,
      locale
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

// Kategoriye göre makaleler
export async function getArticlesByCategory(
  category: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Article[]> {
  try {
    const response = await fetchAPI<Article[]>(
      `/articles?filters[category][$eq]=${category}&populate=localizations&sort=publishedDate:desc`,
      locale
    );
    return response.data || [];
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

// En son N makale
export async function getLatestArticles(
  limit: number = 6,
  locale: 'tr' | 'en' = 'tr'
): Promise<Article[]> {
  try {
    const response = await fetchAPI<Article[]>(
      `/articles?populate=localizations&sort=publishedDate:desc&pagination[limit]=${limit}`,
      locale
    );
    return response.data || [];
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}