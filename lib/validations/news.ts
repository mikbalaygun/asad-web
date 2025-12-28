import { z } from "zod";

// Create News Schema
export const createNewsSchema = z.object({
    title: z.string().min(1, "Başlık zorunludur").max(200, "Başlık en fazla 200 karakter olabilir"),
    slug: z.string().optional(), // Auto-generated if not provided
    excerpt: z.string().min(1, "Özet zorunludur").max(500, "Özet en fazla 500 karakter olabilir"),
    content: z.any(), // JSON - HTML string or blocks array
    category: z.string().min(1, "Kategori zorunludur"),
    coverImage: z.string().optional().nullable(),
    publishedTime: z.string().or(z.date()),
    isActive: z.boolean().default(true),
    locale: z.enum(["tr", "en"]).default("tr"),
    parentId: z.number().optional().nullable(),
});

// Update News Schema
export const updateNewsSchema = createNewsSchema.partial();

// News Response Type
export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;

// Helper function to generate slug
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .substring(0, 100);
}

// News Categories
export const newsCategories = [
    "Genel",
    "Dalış",
    "Etkinlik",
    "Eğitim",
    "Duyuru",
    "Başarı",
] as const;

export type NewsCategory = (typeof newsCategories)[number];
