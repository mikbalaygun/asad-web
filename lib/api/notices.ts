// lib/api/notices.ts
import { fetchAPI } from '../strapi';
import { Notice } from '../types/notice';

// Tüm aktif bildirimleri getir
export async function getAllNotices(locale: 'tr' | 'en' = 'tr'): Promise<Notice[]> {
  try {
    const response = await fetchAPI<Notice[]>(
      '/notices?filters[isActive][$eq]=true&sort=startDate:desc&populate=localizations',
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
}

// Slug'a göre bildirim getir (localizations dahil)
export async function getNoticeBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Notice | null> {
  try {
    const response = await fetchAPI<Notice[]>(
      `/notices?filters[slug][$eq]=${slug}&populate=localizations`,
      locale
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching notice by slug:', error);
    return null;
  }
}

// Önceliğe göre bildirimleri getir
export async function getNoticesByPriority(
  priority: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Notice[]> {
  try {
    const response = await fetchAPI<Notice[]>(
      `/notices?filters[priority][$eq]=${priority}&filters[isActive][$eq]=true&sort=startDate:desc&populate=localizations`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching notices by priority:', error);
    return [];
  }
}

// En son N bildirim
export async function getLatestNotices(
  limit: number = 3,
  locale: 'tr' | 'en' = 'tr'
): Promise<Notice[]> {
  try {
    const response = await fetchAPI<Notice[]>(
      `/notices?filters[isActive][$eq]=true&sort=startDate:desc&pagination[limit]=${limit}&populate=localizations`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching latest notices:', error);
    return [];
  }
}

// Tarihe göre aktif bildirimleri filtrele (client-side helper)
export function filterActiveNotices(notices: Notice[]): Notice[] {
  const now = new Date();
  
  return notices.filter((notice) => {
    if (!notice.isActive) return false;
    
    const startDate = new Date(notice.startDate);
    const endDate = new Date(notice.endDate);
    
    return now >= startDate && now <= endDate;
  });
}