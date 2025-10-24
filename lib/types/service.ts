// lib/types/service.ts

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: any; // String veya Rich text blocks olabilir
  icon: string;
  coverImage?: {
    id: number;
    url: string;
    formats?: any;
  };
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations?: Array<{
    id: number;
    documentId: string;
    title: string;
    slug: string;
    locale: string;
  }>;
}