// lib/types/popup.ts

export interface Popup {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  image: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  mobileImage?: {
    id: number;
    url: string;
    formats?: any;
  };
  isActive: boolean;
  priority: number;
  startDate: string;
  endDate: string;
  linkUrl?: string;
  linkText?: string;
  displayFrequency: 'once' | 'daily' | 'session' | 'always';
  closeDelay: number;
  showOnPages?: string[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations?: Array<{
    id: number;
    documentId: string;
    locale: string;
  }>;
}

export interface PopupDisplay {
  id: number;
  title: string;
  desktopImage: string;
  mobileImage: string;
  linkUrl?: string;
  linkText?: string;
  closeDelay: number;
  displayFrequency: 'once' | 'daily' | 'session' | 'always';
}