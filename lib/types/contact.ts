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