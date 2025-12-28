// lib/api/board-members.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface BoardMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  photo: string | null;
  order: number;
  isActive: boolean;
}

export async function getAllBoardMembers(): Promise<BoardMember[]> {
  try {
    const response = await fetchAPI<BoardMember[]>("/board-members");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching board members:", error);
    return [];
  }
}

export { getMediaUrl };