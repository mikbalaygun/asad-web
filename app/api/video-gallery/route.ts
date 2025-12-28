import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

const videoSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    category: z.string().optional().default("Genel"),
    youtubeLink: z.string().min(1),
    thumbnail: z.string().optional().nullable(),
    publishedDate: z.string().optional().nullable(),
    isActive: z.boolean().default(true),
    locale: z.enum(["tr", "en"]).default("tr"),
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";
    const videos = await prisma.videoGallery.findMany({
        where: { locale, isActive: true },
        orderBy: { publishedDate: "desc" }, // Changed from order to publishedDate
    });
    return NextResponse.json({ data: videos });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    try {
        const body = await request.json();
        console.log("[VIDEO-GALLERY POST] Received:", body);

        const result = videoSchema.safeParse(body);
        if (!result.success) {
            console.log("[VIDEO-GALLERY POST] Validation error:", result.error);
            return NextResponse.json({ error: "Geçersiz veri", details: result.error.issues }, { status: 400 });
        }

        const data = result.data;
        const video = await prisma.videoGallery.create({
            data: {
                title: data.title,
                description: data.description || null,
                category: data.category || "Genel",
                youtubeLink: data.youtubeLink,
                thumbnail: data.thumbnail || null,
                publishedDate: data.publishedDate ? new Date(data.publishedDate) : new Date(),
                isActive: data.isActive,
                locale: data.locale,
            },
        });
        return NextResponse.json({ data: video }, { status: 201 });
    } catch (error) {
        console.error("[VIDEO-GALLERY POST] Error:", error);
        return NextResponse.json({ error: "Video oluşturulamadı" }, { status: 500 });
    }
}
