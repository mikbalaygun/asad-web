// lib/api/projects.ts - Custom API version
import { fetchAPI, getMediaUrl } from "../api";

export interface Project {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  publishedTime: string;
  isActive: boolean;
  locale: string;
  parentId: number | null;
  createdAt: string;
  localizations?: Project[];
}

// Tüm projeleri getir
export async function getAllProjects(locale: "tr" | "en" = "tr"): Promise<Project[]> {
  try {
    const response = await fetchAPI<Project[]>("/projects", { locale });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Slug'a göre proje getir
export async function getProjectBySlug(slug: string, locale: "tr" | "en" = "tr"): Promise<Project | null> {
  try {
    const response = await fetchAPI<Project[]>(`/projects?slug=${slug}`, { locale });
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

// Kategoriye göre projeler
export async function getProjectsByCategory(category: string, locale: "tr" | "en" = "tr"): Promise<Project[]> {
  try {
    const response = await fetchAPI<Project[]>(`/projects?category=${category}`, { locale });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching projects by category:", error);
    return [];
  }
}

export { getMediaUrl };