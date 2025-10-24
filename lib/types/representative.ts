// lib/types/representative.ts

// Temsilci (Single Type - Tek kişi, basit)
export interface Representative {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  photo?: {
    id: number;
    url: string;
    formats?: any;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}