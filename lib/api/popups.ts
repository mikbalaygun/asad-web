// lib/api/popups.ts
import { fetchAPI } from '../strapi';
import { Popup } from '../types/popup';

/**
 * Aktif pop-upları getir (tarih aralığı ve priority'ye göre)
 */
export async function getActivePopups(locale: 'tr' | 'en' = 'tr'): Promise<Popup[]> {
  try {
    const now = new Date().toISOString();
    
    const response = await fetchAPI<Popup[]>(
      `/pop-ups?` +
      `filters[isActive][$eq]=true` +
      `&filters[startDate][$lte]=${now}` +
      `&filters[endDate][$gte]=${now}` +
      `&sort=priority:desc` +
      `&populate=image` +
      `&populate=mobileImage`,
      locale
    );

    if (!response?.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error('[getActivePopups] Error fetching popups:', error);
    return [];
  }
}

/**
 * Belirli bir sayfa için pop-up getir
 */
export async function getPopupForPage(
  pagePath: string,
  locale: 'tr' | 'en' = 'tr'
): Promise<Popup | null> {
  try {
    const popups = await getActivePopups(locale);
    
    if (popups.length === 0) {
      return null;
    }

    // showOnPages kontrolü
    const filteredPopups = popups.filter(popup => {
      // Eğer showOnPages null veya boş ise, her sayfada göster
      if (!popup.showOnPages || popup.showOnPages.length === 0) {
        return true;
      }
      
      // pagePath showOnPages içinde var mı?
      return popup.showOnPages.some(page => 
        pagePath === page || pagePath.includes(page)
      );
    });

    // En yüksek priority'li olanı döndür
    return filteredPopups[0] || null;
  } catch (error) {
    console.error('[getPopupForPage] Error:', error);
    return null;
  }
}

/**
 * Tüm pop-upları getir (admin için)
 */
export async function getAllPopups(locale: 'tr' | 'en' = 'tr'): Promise<Popup[]> {
  try {
    const response = await fetchAPI<Popup[]>(
      `/pop-ups?sort=priority:desc&populate=*`,
      locale
    );

    return response?.data || [];
  } catch (error) {
    console.error('[getAllPopups] Error:', error);
    return [];
  }
}