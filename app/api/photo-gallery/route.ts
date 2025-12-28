import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

const photoSchema = z.object({
    title: z.string().min(1),
    category: z.string().min(1).default("Genel"), // Required field with default
    image: z.string().min(1),
    alternativeText: z.string().optional().nullable(),
    publishedDate: z.string().optional().nullable(),
    isActive: z.boolean().default(true),
    locale: z.enum(["tr", "en"]).default("tr"),
});

export async function GET() {
    // No locale filter - photos show in all languages
    const photos = await prisma.photoGallery.findMany({
        where: { isActive: true },
        orderBy: { publishedDate: "desc" },
    });
    return NextResponse.json({ data: photos });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    try {
        const body = await request.json();
        console.log("[PHOTO-GALLERY POST] Received:", body);

        const result = photoSchema.safeParse(body);
        if (!result.success) {
            console.log("[PHOTO-GALLERY POST] Validation error:", result.error);
            return NextResponse.json({ error: "Geçersiz veri", details: result.error.issues }, { status: 400 });
        }

        const data = result.data;
        const photo = await prisma.photoGallery.create({
            data: {
                title: data.title,
                category: data.category || "Genel",
                image: data.image,
                alternativeText: data.alternativeText || null,
                publishedDate: data.publishedDate ? new Date(data.publishedDate) : new Date(),
                isActive: data.isActive,
                locale: data.locale,
            },
        });
        return NextResponse.json({ data: photo }, { status: 201 });
    } catch (error) {
        console.error("[PHOTO-GALLERY POST] Error:", error);
        return NextResponse.json({ error: "Fotoğraf oluşturulamadı" }, { status: 500 });
    }
}
