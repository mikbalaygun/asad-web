// lib/api/contact.ts
import { fetchAPI } from '@/lib/strapi';

export interface ContactInfo {
  phoneNumber: string;
  primaryEmail: string;
  secondaryEmail: string;
  addressTR: string;
  instagram?: string;
  facebook?: string;
  nextSocial?: string;
  twitter?: string;
  youtube?: string;
  googleMapsUrl?: string;
  latitude?: string;
  longitude?: string;
}

// İletişim bilgisini getir (Single Type)
// Not: Single Type'lar için locale parametresi geçerli değil, 
// doğrudan data döner (array değil)
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

    const url = `${STRAPI_URL}/api/contact`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    };

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const result = await response.json();
    
    // Single Type doğrudan data döner, array içinde değil
    return result.data || null;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}