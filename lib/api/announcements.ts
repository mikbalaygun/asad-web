// lib/api/announcements.ts
import { fetchAPI } from '../strapi';
import { Announcement } from '../types/announcement';

// Tüm aktif duyuruları getir
export async function getAllAnnouncements(locale: 'tr' | 'en' = 'tr'): Promise<Announcement[]> {
  try {
    const response = await fetchAPI<Announcement[]>(
      '/announcements?filters[isActive][$eq]=true&sort=startDate:desc',
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
}

// Slug'a göre duyuru getir
export async function getAnnouncementBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Announcement | null> {
  try {
    const response = await fetchAPI<Announcement[]>(
      `/announcements?filters[slug][$eq]=${slug}`,
      locale
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching announcement by slug:', error);
    return null;
  }
}

// Önceliğe göre duyuruları getir
export async function getAnnouncementsByPriority(
  priority: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Announcement[]> {
  try {
    const response = await fetchAPI<Announcement[]>(
      `/announcements?filters[priority][$eq]=${priority}&filters[isActive][$eq]=true&sort=startDate:desc`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements by priority:', error);
    return [];
  }
}

// En son N duyuru
export async function getLatestAnnouncements(
  limit: number = 3,
  locale: 'tr' | 'en' = 'tr'
): Promise<Announcement[]> {
  try {
    const response = await fetchAPI<Announcement[]>(
      `/announcements?filters[isActive][$eq]=true&sort=startDate:desc&pagination[limit]=${limit}`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching latest announcements:', error);
    return [];
  }
}

// Tarihe göre aktif duyuruları filtrele (client-side helper)
export function filterActiveAnnouncements(announcements: Announcement[]): Announcement[] {
  const now = new Date();
  
  return announcements.filter((announcement) => {
    if (!announcement.isActive) return false;
    
    const startDate = new Date(announcement.startDate);
    const endDate = new Date(announcement.endDate);
    
    return now >= startDate && now <= endDate;
  });
}