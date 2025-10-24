// lib/types/announcement.ts

export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Announcement {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any[]; // Rich text blocks
  priority: AnnouncementPriority;
  startDate: string;
  endDate: string;
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