// lib/api/sponsors.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface Sponsor {
  id: number;
  name: string;
  logo: string | null;
  isActive: boolean;
  locale: string;
}

export async function getAllSponsors(locale: "tr" | "en" = "tr"): Promise<Sponsor[]> {
  try {
    const response = await fetchAPI<Sponsor[]>("/sponsors", { locale });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
}

export { getMediaUrl };