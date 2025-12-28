import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createArticleSchema, generateSlug } from "@/lib/validations/article";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get("locale") || "tr";
        const slug = searchParams.get("slug");
        const limit = parseInt(searchParams.get("limit") || "100");

        const where: Record<string, unknown> = { locale };
        if (slug) {
            where.slug = slug;
        }

        const articles = await prisma.article.findMany({
            where,
            orderBy: { publishedDate: "desc" },
            take: limit,
            include: { localizations: { select: { id: true, title: true, slug: true, locale: true } } },
        });

        return NextResponse.json({ data: articles });
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ error: "Makaleler alınırken hata oluştu" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        const body = await request.json();
        const result = createArticleSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Geçersiz veri", details: result.error.issues }, { status: 400 });
        }

        const data = result.data;
        const slug = data.slug || generateSlug(data.title);

        const article = await prisma.article.create({
            data: {
                title: data.title,
                slug,
                excerpt: data.excerpt,
                content: data.content,
                author: data.author,
                category: data.category,
                pdfUrl: data.pdfUrl || null,
                publishedDate: new Date(data.publishedDate),
                isActive: data.isActive,
                locale: data.locale,
                parentId: data.parentId,
            },
        });

        return NextResponse.json({ data: article }, { status: 201 });
    } catch (error) {
        console.error("Error creating article:", error);
        return NextResponse.json({ error: "Makale oluşturulurken hata oluştu" }, { status: 500 });
    }
}
