// lib/api/audit-boards.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface AuditBoardMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  photo: string | null;
  order: number;
  isActive: boolean;
}

export async function getAllAuditBoardMembers(): Promise<AuditBoardMember[]> {
  try {
    const response = await fetchAPI<AuditBoardMember[]>("/audit-board");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching audit board members:", error);
    return [];
  }
}

export { getMediaUrl };
