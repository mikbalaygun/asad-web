import { fetchAPI } from '../strapi';
import { News } from '../types/news';

export async function getAllNews(locale: 'tr' | 'en' = 'tr'): Promise<News[]> {
  try {
    const response = await fetchAPI<News[]>(
      '/news?sort=publishedTime:desc',
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<News | null> {
  try {
    const response = await fetchAPI<News[]>(
      `/news?filters[slug][$eq]=${slug}`,
      locale
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
}

export async function getLatestNews(
  limit: number = 3,
  locale: 'tr' | 'en' = 'tr'
): Promise<News[]> {
  try {
    const response = await fetchAPI<News[]>(
      `/news?sort=publishedTime:desc&pagination[limit]=${limit}`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
}