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
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Slug'a göre haber getir - DÜZELTİLDİ
export async function getNewsBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<News | null> {
  try {
    // Strapi 5'te slug filtreleme için doğru söz dizimi
    const encodedSlug = encodeURIComponent(slug);
    const response = await fetchAPI<News[]>(
      `/news?filters[slug]=${encodedSlug}&populate[coverImage]=*&populate[localizations]=*`,
      locale
    );
    
    console.log('getNewsBySlug response:', {
      slug,
      locale,
      dataLength: response?.data?.length,
      firstItem: response?.data?.[0]?.slug
    });
    
    return response?.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    
    // Alternatif yöntem: Tüm haberleri çek ve client-side filtrele
    try {
      console.log('Trying alternative method: fetching all news...');
      const allNews = await getAllNews(locale);
      const foundNews = allNews.find((news) => news.slug === slug);
      
      if (foundNews) {
        console.log('Found news via alternative method:', foundNews.slug);
        return foundNews;
      }
      
      console.log('News not found via alternative method either');
      return null;
    } catch (altError) {
      console.error('Alternative method also failed:', altError);
      return null;
    }
  }
}

// Kategoriye göre haberleri getir
export async function getNewsByCategory(
  category: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<News[]> {
  try {
    const encodedCategory = encodeURIComponent(category);
    const response = await fetchAPI<News[]>(
      `/news?filters[category]=${encodedCategory}&sort=publishedTime:desc&populate=coverImage&pagination[pageSize]=100`,
      locale
    );
    return response?.data || [];
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
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
}