/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/types/board-member.ts

export interface BoardMember {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  role: string;
  photo?: {
    id: number;
    url: string;
    formats?: any;
  };
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}