// lib/api/services.ts
import { fetchAPI } from '../strapi';
import { Service } from '../types/service';

// Tüm aktif hizmetleri getir (sıralı)
export async function getAllServices(locale: 'tr' | 'en' = 'tr'): Promise<Service[]> {
  try {
    const response = await fetchAPI<Service[]>(
      '/services?filters[isActive][$eq]=true&sort=order:asc&populate=*',
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Slug'a göre hizmet getir
export async function getServiceBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Service | null> {
  try {
    const response = await fetchAPI<Service[]>(
      `/services?filters[slug][$eq]=${slug}&populate=*`,
      locale
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    return null;
  }
}

// Belirli sayıda hizmet getir
export async function getFeaturedServices(
  limit: number = 3,
  locale: 'tr' | 'en' = 'tr'
): Promise<Service[]> {
  try {
    const response = await fetchAPI<Service[]>(
      `/services?filters[isActive][$eq]=true&sort=order:asc&pagination[limit]=${limit}&populate=*`,
      locale
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching featured services:', error);
    return [];
  }
}