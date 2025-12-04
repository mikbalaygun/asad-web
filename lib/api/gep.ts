// lib/api/gep.ts
import { GepTeamMember, GepDocument } from '@/lib/types/gep';

export const gepTeamMembers: GepTeamMember[] = [
  {
    id: 1,
    firstName: 'Nil',
    lastName: 'Kıncal',
    role: 'Yönetim Kurulu',
  },
  {
    id: 2,
    firstName: 'Hale',
    lastName: 'Telli',
    role: 'Yönetim Kurulu',
  },
];

export const gepDocuments: GepDocument[] = [
  {
    id: 1,
    title: 'GEP Planı',
    language: 'tr',
    fileName: 'gep-plan-tr.pdf',
    year: 2025,
    description: 'ASAD Toplumsal Cinsiyet Eşitliği Planı',
  },
  {
    id: 2,
    title: 'GEP Plan',
    language: 'en',
    fileName: 'gep-plan-en.pdf',
    year: 2025,
    description: 'ASAD Gender Equality Plan',
  },
];

// Export fonksiyonları
export async function getAllGepMembers(): Promise<GepTeamMember[]> {
  return gepTeamMembers;
}

export async function getAllGepDocuments(): Promise<GepDocument[]> {
  return gepDocuments;
}