// lib/api/representative.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface Representative {
  id: number;
  firstName: string;
  lastName: string;
  photo: string | null;
}

export async function getRepresentative(): Promise<Representative | null> {
  try {
    const response = await fetchAPI<Representative>("/representative");
    return response.data || null;
  } catch (error) {
    console.error("Error fetching representative:", error);
    return null;
  }
}

export { getMediaUrl };