/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface News {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  excerpt: string;
  content: any[];
  category: string;
  publishedTime: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  coverImage: StrapiImage | null;
  localizations?: Array<{
    id: number;
    documentId: string;
    Title: string;
    slug: string;
    locale: string;
  }>;
}