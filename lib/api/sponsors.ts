// lib/api/sponsors.ts
import { fetchAPI } from '../strapi';
import { Sponsor } from '../types/sponsor';

/**
 * Tüm aktif sponsorları getir
 */
export async function getAllSponsors(locale: 'tr' | 'en' = 'tr'): Promise<Sponsor[]> {
  try {
    const response = await fetchAPI<Sponsor[]>(
      '/sponsors?filters[isActive][$eq]=true&populate=*',
      locale
    );
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return [];
  }
}