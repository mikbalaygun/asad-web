// lib/types/notice.ts
export interface Notice {
  id: number;
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
}