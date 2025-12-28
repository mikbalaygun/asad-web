import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

const noticeSchema = z.object({
    title: z.string().min(1),
    slug: z.string().optional(),
    excerpt: z.string().min(1),
    content: z.any(),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
    publishedDate: z.string(),
    isActive: z.boolean().default(true),
    locale: z.enum(["tr", "en"]).default("tr"),
    parentId: z.number().optional().nullable(),
});

function generateSlug(title: string): string {
    return title.toLowerCase()
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").substring(0, 100);
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "100");

    const where: Record<string, unknown> = { locale };
    if (slug) {
        where.slug = slug;
    }

    const notices = await prisma.notice.findMany({
        where,
        orderBy: { publishedDate: "desc" },
        take: limit,
        include: { localizations: { select: { id: true, title: true, slug: true, locale: true } } },
    });
    return NextResponse.json({ data: notices });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    try {
        const body = await request.json();
        const result = noticeSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Geçersiz veri", details: result.error.issues }, { status: 400 });
        }

        const data = result.data;
        const notice = await prisma.notice.create({
            data: {
                title: data.title,
                slug: data.slug || generateSlug(data.title),
                excerpt: data.excerpt,
                content: data.content,
                priority: data.priority,
                publishedDate: new Date(data.publishedDate),
                isActive: data.isActive,
                locale: data.locale,
                parentId: data.parentId || null,
            },
        });
        return NextResponse.json({ data: notice }, { status: 201 });
    } catch (error) {
        console.error("[NOTICES POST] Error:", error);
        return NextResponse.json({ error: "Duyuru oluşturulamadı" }, { status: 500 });
    }
}
