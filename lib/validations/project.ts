import { z } from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(1, "Başlık zorunludur").max(200),
    slug: z.string().optional(),
    excerpt: z.string().min(1, "Özet zorunludur").max(500),
    content: z.any(),
    category: z.string().min(1, "Kategori zorunludur"),
    coverImage: z.string().optional().nullable(),
    publishedTime: z.string().or(z.date()),
    isActive: z.boolean().default(true),
    locale: z.enum(["tr", "en"]).default("tr"),
    parentId: z.number().optional().nullable(),
});

export const updateProjectSchema = createProjectSchema.partial();

export function generateSlug(title: string): string {
    return title.toLowerCase()
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").substring(0, 100);
}

export const projectCategories = ["Araştırma", "Koruma", "Eğitim", "Keşif", "Belgeleme"] as const;
