import { z } from "zod";

export const createServiceSchema = z.object({
    title: z.string().min(1),
    slug: z.string().optional(),
    shortDescription: z.string().min(1),
    description: z.any(),
    coverImage: z.string().optional().nullable(),
    order: z.number().default(0),
    isActive: z.boolean().default(true),
    locale: z.enum(["tr", "en"]).default("tr"),
    parentId: z.number().optional().nullable(),
});

export const updateServiceSchema = createServiceSchema.partial();

export function generateSlug(title: string): string {
    return title.toLowerCase()
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").substring(0, 100);
}
