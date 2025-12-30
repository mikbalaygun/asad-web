/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/types/sponsor.ts

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  url: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface Sponsor {
  id: number;
  documentId: string;
  name: string;
  logo: StrapiImage | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations?: Array<{
    id: number;
    documentId: string;
    name: string;
    locale: string;
  }>;
}