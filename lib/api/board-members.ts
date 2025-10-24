// lib/api/board-members.ts
import { fetchAPI } from '../strapi';
import { BoardMember } from '../types/board-member';

// Tüm aktif yönetim kurulu üyelerini getir (sıralı)
export async function getAllBoardMembers(): Promise<BoardMember[]> {
  try {
    const response = await fetchAPI<BoardMember[]>(
      '/board-members?populate=photo&sort=order:asc',
      'tr' // Board members locale'e bağlı değil
    );
    
    const members = response.data || [];
    return members.filter(m => m.isActive !== false);
  } catch (error) {
    console.error('Error fetching board members:', error);
    return [];
  }
}

// Belirli bir üyeyi getir
export async function getBoardMemberById(id: number): Promise<BoardMember | null> {
  try {
    const response = await fetchAPI<BoardMember[]>(
      `/board-members?filters[id][$eq]=${id}&populate=photo`,
      'tr'
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching board member:', error);
    return null;
  }
}