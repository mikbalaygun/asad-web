import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateArticleSchema, generateSlug } from "@/lib/validations/article";
import { auth } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const articleId = parseInt(id);

        if (isNaN(articleId)) {
            return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
        }

        const article = await prisma.article.findUnique({
            where: { id: articleId },
        });

        if (!article) {
            return NextResponse.json({ error: "Makale bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ data: article });
    } catch (error) {
        console.error("Error fetching article:", error);
        return NextResponse.json({ error: "Makale alınırken hata oluştu" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        const { id } = await params;
        const articleId = parseInt(id);

        if (isNaN(articleId)) {
            return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
        }

        const body = await request.json();
        const result = updateArticleSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Geçersiz veri", details: result.error.issues }, { status: 400 });
        }

        const data = result.data;
        let slug = data.slug;
        if (data.title && !data.slug) {
            slug = generateSlug(data.title);
        }

        const article = await prisma.article.update({
            where: { id: articleId },
            data: {
                ...(data.title && { title: data.title }),
                ...(slug && { slug }),
                ...(data.excerpt && { excerpt: data.excerpt }),
                ...(data.content !== undefined && { content: data.content }),
                ...(data.author && { author: data.author }),
                ...(data.category && { category: data.category }),
                ...(data.publishedDate && { publishedDate: new Date(data.publishedDate) }),
                ...(data.isActive !== undefined && { isActive: data.isActive }),
                ...(data.locale && { locale: data.locale }),
            },
        });

        return NextResponse.json({ data: article });
    } catch (error) {
        console.error("Error updating article:", error);
        return NextResponse.json({ error: "Makale güncellenirken hata oluştu" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        const { id } = await params;
        const articleId = parseInt(id);

        if (isNaN(articleId)) {
            return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });
        }

        await prisma.article.delete({ where: { id: articleId } });
        return NextResponse.json({ message: "Makale silindi" });
    } catch (error) {
        console.error("Error deleting article:", error);
        return NextResponse.json({ error: "Makale silinirken hata oluştu" }, { status: 500 });
    }
}
