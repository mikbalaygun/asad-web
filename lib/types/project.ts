/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/types/project.ts

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

export interface Project {
  id: number;
  documentId: string;
  title: string;              
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
    title: string;            
    slug: string;
    locale: string;
  }>;
}