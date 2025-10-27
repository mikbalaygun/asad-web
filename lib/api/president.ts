// lib/api/president.ts
import { fetchAPI } from '../strapi';
import { President } from '../types/president';

// Başkan bilgisini getir (Single Type)
export async function getPresident(locale: 'tr' | 'en' = 'tr'): Promise<President | null> {
  try {
    const response = await fetchAPI<President>(
      '/president?populate=photo',  // 👈 populate'i query string olarak ekle
      locale                         // 👈 locale ikinci parametre
    );
    return response.data || null;
  } catch (error) {
    console.error('Error fetching president:', error);
    return null;
  }
}