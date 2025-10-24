// lib/types/president.ts

export interface President {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  photo?: {
    id: number;
    url: string;
    formats?: any;
  };
  message: any; // Rich text blocks veya string
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}