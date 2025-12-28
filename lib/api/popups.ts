// lib/api/popups.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface Popup {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  mobileImage: string | null;
  isActive: boolean;
  priority: number;
  closeDelay: number;
  startDate: string | null;
  endDate: string | null;
  linkUrl: string | null;
  linkText: string | null;
  displayFrequency: string;
  showOnPages: string[] | null;
  locale: string;
}

export async function getActivePopups(locale: "tr" | "en" = "tr"): Promise<Popup[]> {
  try {
    const response = await fetchAPI<Popup[]>("/popups", { locale });
    const now = new Date();
    return (response.data || []).filter(p => {
      if (!p.isActive) return false;
      if (p.startDate && new Date(p.startDate) > now) return false;
      if (p.endDate && new Date(p.endDate) < now) return false;
      return true;
    });
  } catch (error) {
    console.error("Error fetching popups:", error);
    return [];
  }
}

// Get popup for a specific page
export async function getPopupForPage(page: string, locale: "tr" | "en" = "tr"): Promise<Popup | null> {
  try {
    const popups = await getActivePopups(locale);

    // Find popup that matches this page or shows on all pages
    const matchingPopup = popups.find(p => {
      // If showOnPages is null/empty, show on all pages
      if (!p.showOnPages || p.showOnPages.length === 0) return true;
      // Otherwise check if current page is in the list
      return p.showOnPages.includes(page) || p.showOnPages.includes('*');
    });

    return matchingPopup || null;
  } catch (error) {
    console.error("Error getting popup for page:", error);
    return null;
  }
}

export { getMediaUrl };