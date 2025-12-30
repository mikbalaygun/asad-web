/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/types/article.ts

export interface Article {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text blocks veya string
  publishedDate: string;
  author: string;
  category: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale: string;
  pdfUrl?: string | null;
  localizations?: Array<{
    id: number;
    documentId?: string;
    title: string;
    slug: string;
    locale: string;
  }>;
}