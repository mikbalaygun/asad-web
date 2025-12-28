import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateNewsSchema, generateSlug } from "@/lib/validations/news";
import { auth } from "@/lib/auth";

// GET /api/news/[id] - Tek haber getir
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const newsId = parseInt(id);

        if (isNaN(newsId)) {
            return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
        }

        const news = await prisma.news.findUnique({
            where: { id: newsId },
            include: {
                localizations: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        locale: true,
                    },
                },
            },
        });

        if (!news) {
            return NextResponse.json({ error: "Haber bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ data: news });
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json(
            { error: "Haber alınırken hata oluştu" },
            { status: 500 }
        );
    }
}

// PUT /api/news/[id] - Haber güncelle
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Auth check
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        const { id } = await params;
        const newsId = parseInt(id);

        if (isNaN(newsId)) {
            return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
        }

        const body = await request.json();
        const validationResult = updateNewsSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Geçersiz veri", details: validationResult.error.issues },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // Check if news exists
        const existingNews = await prisma.news.findUnique({
            where: { id: newsId },
        });

        if (!existingNews) {
            return NextResponse.json({ error: "Haber bulunamadı" }, { status: 404 });
        }

        // Generate new slug if title changed and slug not provided
        let slug = data.slug;
        if (data.title && !data.slug) {
            slug = generateSlug(data.title);
        }

        // Check slug uniqueness if slug changed
        if (slug && slug !== existingNews.slug) {
            const slugExists = await prisma.news.findFirst({
                where: {
                    slug,
                    locale: data.locale || existingNews.locale,
                    id: { not: newsId },
                },
            });

            if (slugExists) {
                return NextResponse.json(
                    { error: "Bu slug zaten kullanılıyor" },
                    { status: 400 }
                );
            }
        }

        const news = await prisma.news.update({
            where: { id: newsId },
            data: {
                ...(data.title && { title: data.title }),
                ...(slug && { slug }),
                ...(data.excerpt && { excerpt: data.excerpt }),
                ...(data.content !== undefined && { content: data.content }),
                ...(data.category && { category: data.category }),
                ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
                ...(data.publishedTime && { publishedTime: new Date(data.publishedTime) }),
                ...(data.isActive !== undefined && { isActive: data.isActive }),
                ...(data.locale && { locale: data.locale }),
                ...(data.parentId !== undefined && { parentId: data.parentId }),
            },
        });

        return NextResponse.json({ data: news });
    } catch (error) {
        console.error("Error updating news:", error);
        return NextResponse.json(
            { error: "Haber güncellenirken hata oluştu" },
            { status: 500 }
        );
    }
}

// DELETE /api/news/[id] - Haber sil
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Auth check
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        const { id } = await params;
        const newsId = parseInt(id);

        if (isNaN(newsId)) {
            return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
        }

        // Check if news exists
        const existingNews = await prisma.news.findUnique({
            where: { id: newsId },
        });

        if (!existingNews) {
            return NextResponse.json({ error: "Haber bulunamadı" }, { status: 404 });
        }

        // First, remove parent references from localizations
        await prisma.news.updateMany({
            where: { parentId: newsId },
            data: { parentId: null },
        });

        // Then delete the news
        await prisma.news.delete({
            where: { id: newsId },
        });

        return NextResponse.json({ message: "Haber silindi" });
    } catch (error) {
        console.error("Error deleting news:", error);
        return NextResponse.json(
            { error: "Haber silinirken hata oluştu" },
            { status: 500 }
        );
    }
}
