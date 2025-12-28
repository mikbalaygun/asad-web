// lib/api/contact.ts - Custom API version
import { fetchAPI } from "../api";

export interface ContactInfo {
  id: number;
  phoneNumber: string;
  primaryEmail: string;
  secondaryEmail: string | null;
  addressTR: string;
  addressEN: string | null;
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  youtube: string | null;
  nextsocial: string | null;
  googleMapsUrl: string | null;
  latitude: string | null;
  longitude: string | null;
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const response = await fetchAPI<ContactInfo>("/contact");
    return response.data || null;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}

export function getAddress(contact: ContactInfo | null, locale: "tr" | "en" = "tr"): string {
  if (!contact) return "";
  return locale === "en" && contact.addressEN ? contact.addressEN : contact.addressTR;
}