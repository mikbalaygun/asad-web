// lib/api/projects.ts
import { fetchAPI } from '../strapi';
import { Project } from '../types/project';

/**
 * Tüm projeleri getir (yayınlanma tarihine göre sıralı)
 */
export async function getAllProjects(locale: 'tr' | 'en' = 'tr'): Promise<Project[]> {
  try {
    const response = await fetchAPI<Project[]>(
      '/projects?sort=publishedTime:desc&populate=*',
      locale
    );
    return response?.data || [];
  } catch (error) {
    console.error('[getAllProjects] Error fetching projects:', error);
    return [];
  }
}

/**
 * Slug'a göre tek bir proje getir
 */
export async function getProjectBySlug(
  slug: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Project | null> {
  try {
    const response = await fetchAPI<Project[]>(
      `/projects?filters[slug][$eq]=${slug}&populate=*`,
      locale
    );
    return response?.data?.[0] || null;
  } catch (error) {
    console.error('[getProjectBySlug] Error fetching project by slug:', error);
    return null;
  }
}

/**
 * En son projeleri getir (limit ile)
 */
export async function getLatestProjects(
  limit: number = 3,
  locale: 'tr' | 'en' = 'tr'
): Promise<Project[]> {
  try {
    const response = await fetchAPI<Project[]>(
      `/projects?sort=publishedTime:desc&pagination[limit]=${limit}&populate=*`,
      locale
    );
    return response?.data || [];
  } catch (error) {
    console.error('[getLatestProjects] Error fetching latest projects:', error);
    return [];
  }
}

/**
 * Öne çıkan projeleri getir
 */
export async function getFeaturedProjects(
  locale: 'tr' | 'en' = 'tr'
): Promise<Project[]> {
  try {
    const response = await fetchAPI<Project[]>(
      `/projects?filters[featured][$eq]=true&sort=publishedTime:desc&populate=*`,
      locale
    );
    return response?.data || [];
  } catch (error) {
    console.error('[getFeaturedProjects] Error fetching featured projects:', error);
    return [];
  }
}

/**
 * Kategoriye göre projeleri getir
 */
export async function getProjectsByCategory(
  category: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Project[]> {
  try {
    const response = await fetchAPI<Project[]>(
      `/projects?filters[category][$eq]=${category}&sort=publishedTime:desc&populate=*`,
      locale
    );
    return response?.data || [];
  } catch (error) {
    console.error('[getProjectsByCategory] Error fetching projects by category:', error);
    return [];
  }
}

/**
 * Duruma göre projeleri getir (Devam Ediyor, Tamamlandı, Planlanan)
 */
export async function getProjectsByStatus(
  status: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Project[]> {
  try {
    const response = await fetchAPI<Project[]>(
      `/projects?filters[status][$eq]=${status}&sort=publishedTime:desc&populate=*`,
      locale
    );
    return response?.data || [];
  } catch (error) {
    console.error('[getProjectsByStatus] Error fetching projects by status:', error);
    return [];
  }
}