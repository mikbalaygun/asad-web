// lib/types/gep.ts
export interface GepTeamMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

export interface GepDocument {
  id: number;
  title: string;
  language: 'tr' | 'en';
  fileName: string;
  year: number;
  description?: string;
}