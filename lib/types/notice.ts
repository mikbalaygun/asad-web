/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/types/notice.ts
export interface Notice {
  id: number;
  documentId?: string;
  slug: string;
  title: string;
  content: any; // Rich text blocks
  priority: 'urgent' | 'high' | 'medium' | 'low';
  startDate: string;
  endDate: string;
  isActive: boolean;
  locale?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  localizations?: Array<{
    id: number;
    documentId: string;
    title: string;
    slug: string;
    locale: string;
  }>;
}