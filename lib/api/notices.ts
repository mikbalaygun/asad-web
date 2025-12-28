// lib/api/notices.ts - Custom API version
import { fetchAPI } from "../api";

export interface Notice {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  priority: string; // low, medium, high
  publishedDate: string;
  isActive: boolean;
  locale: string;
}

export async function getAllNotices(locale: "tr" | "en" = "tr"): Promise<Notice[]> {
  try {
    const response = await fetchAPI<Notice[]>("/notices", { locale });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
}

export async function getActiveNotices(locale: "tr" | "en" = "tr"): Promise<Notice[]> {
  try {
    const response = await fetchAPI<Notice[]>("/notices", { locale });
    return (response.data || []).filter(n => n.isActive);
  } catch (error) {
    console.error("Error fetching active notices:", error);
    return [];
  }
}

export async function getLatestNotices(limit: number = 5, locale: "tr" | "en" = "tr"): Promise<Notice[]> {
  try {
    const response = await fetchAPI<Notice[]>("/notices", { locale, limit });
    return (response.data || []).filter(n => n.isActive);
  } catch (error) {
    console.error("Error fetching latest notices:", error);
    return [];
  }
}

export async function getNoticeBySlug(slug: string, locale: "tr" | "en" = "tr"): Promise<Notice | null> {
  try {
    const response = await fetchAPI<Notice[]>("/notices", {
      locale,
      filters: { slug }
    });
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching notice by slug:", error);
    return null;
  }
}