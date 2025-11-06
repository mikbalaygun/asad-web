// lib/api/news.ts
import { fetchAPI } from '../strapi';
import { News } from '../types/news';

// Hepsi (görsel lazım olduğu için populate var)
export async function getAllNews(locale: 'tr' | 'en' = 'tr'): Promise<News[]> {
  try {
    const url =
      '/news' +
      '?sort=publishedTime:desc' +               // şemanızda publishedTime var
      '&populate=coverImage,localizations' +     // client bunları bekliyor
      '&publicationState=live' +                 // taslakları alma
      '&pagination[pageSize]=100';

    const response = await fetchAPI<News[]>(url, locale);
    return response.data ?? [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Slug
export async function getNewsBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<News | null> {
  try {
    const url =
      '/news' +
      `?filters[slug][$eq]=${encodeURIComponent(slug)}` + // slug güvenli
      '&populate=coverImage,localizations' +
      '&publicationState=live';

    const response = await fetchAPI<News[]>(url, locale);
    return response.data?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
}

// En son N
export async function getLatestNews(
  limit: number = 3,
  locale: 'tr' | 'en' = 'tr'
): Promise<News[]> {
  try {
    const url =
      '/news' +
      '?sort=publishedTime:desc' +               // listedeki sıralama
      '&populate=coverImage,localizations' +
      '&publicationState=live' +
      `&pagination[limit]=${encodeURIComponent(String(limit))}`;

    const response = await fetchAPI<News[]>(url, locale);
    return response.data ?? [];
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
}
