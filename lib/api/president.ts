// lib/api/president.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface President {
  id: number;
  firstName: string;
  lastName: string;
  photo: string | null;
  message: string;
  messageEn?: string; // English translation
  phone: string;
  email: string;
}

export async function getPresident(): Promise<President | null> {
  try {
    const response = await fetchAPI<President>("/president");
    return response.data || null;
  } catch (error) {
    console.error("Error fetching president:", error);
    return null;
  }
}

export { getMediaUrl };