// lib/api/representatives.ts
import { fetchAPI } from '../strapi';
import { Representative } from '../types/representative';

// Temsilci bilgisini getir (Single Type)
export async function getRepresentative(): Promise<Representative | null> {
  try {
    const response = await fetchAPI<Representative>(
      '/representative?populate=photo',
      'tr'
    );
    return response.data || null;
  } catch (error) {
    console.error('Error fetching representative:', error);
    return null;
  }
}