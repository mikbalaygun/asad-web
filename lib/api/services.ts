// lib/api/services.ts - Custom API version
import { fetchAPI } from "../api";

export interface Service {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  coverImage: string | null;
  order: number;
  isActive: boolean;
  locale: string;
}

// Tüm aktif hizmetleri getir (sıralı)
export async function getAllServices(locale: "tr" | "en" = "tr"): Promise<Service[]> {
  try {
    const response = await fetchAPI<Service[]>("/services", { locale });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Slug'a göre hizmet getir
export async function getServiceBySlug(slug: string, locale: "tr" | "en" = "tr"): Promise<Service | null> {
  try {
    const response = await fetchAPI<Service[]>("/services", { locale, filters: { slug } });
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}

// Belirli sayıda hizmet getir
export async function getFeaturedServices(limit: number = 3, locale: "tr" | "en" = "tr"): Promise<Service[]> {
  try {
    const response = await fetchAPI<Service[]>("/services", { locale, limit });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching featured services:", error);
    return [];
  }
}