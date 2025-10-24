// lib/api/audit-board.ts
import { fetchAPI } from '../strapi';
import { AuditBoardMember } from '../types/audit-board';

// Tüm aktif denetleme kurulu üyelerini getir (sıralı)
export async function getAllAuditBoardMembers(): Promise<AuditBoardMember[]> {
  try {
    const response = await fetchAPI<AuditBoardMember[]>(
      '/audit-boards?populate=photo&sort=order:asc',
      'tr' // Audit board üyeleri locale'e bağlı değil; BoardMembers'la aynı mantık
    );

    const members = response.data || [];
    // isActive alanı yoksa true varsayalım; false olanları ayıkla
    return members.filter((m) => m.isActive !== false);
  } catch (error) {
    console.error('Error fetching audit board members:', error);
    return [];
  }
}

// Belirli bir denetleme kurulu üyesini getir
export async function getAuditBoardMemberById(id: number): Promise<AuditBoardMember | null> {
  try {
    const response = await fetchAPI<AuditBoardMember[]>(
      `/audit-boards?filters[id][$eq]=${id}&populate=photo`,
      'tr'
    );
    return response.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching audit board member:', error);
    return null;
  }
}
