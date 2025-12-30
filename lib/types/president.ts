/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/types/president.ts

export interface President {
  id: number;
  documentId?: string;
  firstName: string;
  lastName: string;
  photo?: string | {
    id: number;
    url: string;
    formats?: unknown;
  };
  message: unknown; // Rich text blocks veya string (Turkish)
  messageEn?: unknown; // Rich text blocks veya string (English)
  phone: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}