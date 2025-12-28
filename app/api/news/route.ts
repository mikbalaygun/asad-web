import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createNewsSchema, generateSlug } from "@/lib/validations/news";
import { auth } from "@/lib/auth";

// GET /api/news - Tüm haberleri getir
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get("locale") || "tr";
        const category = searchParams.get("category");
        const slug = searchParams.get("slug");
        const limit = parseInt(searchParams.get("limit") || "100");
        const page = parseInt(searchParams.get("page") || "1");
        const skip = (page - 1) * limit;

        const where: Record<string, unknown> = { locale };
        if (category) {
            where.category = category;
        }
        if (slug) {
            where.slug = slug;
        }

        const [news, total] = await Promise.all([
            prisma.news.findMany({
                where,
                orderBy: { publishedTime: "desc" },
                take: limit,
                skip,
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
            }),
            prisma.news.count({ where }),
        ]);

        return NextResponse.json({
            data: news,
            meta: {
                pagination: {
                    page,
                    pageSize: limit,
                    pageCount: Math.ceil(total / limit),
                    total,
                },
            },
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json(
            { error: "Haberler alınırken hata oluştu" },
            { status: 500 }
        );
    }
}

// POST /api/news - Yeni haber oluştur
export async function POST(request: NextRequest) {
    try {
        // Auth check
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        const body = await request.json();
        const validationResult = createNewsSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Geçersiz veri", details: validationResult.error.issues },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // Generate slug if not provided
        const slug = data.slug || generateSlug(data.title);

        // Check if slug exists for the same locale
        const existingNews = await prisma.news.findFirst({
            where: { slug, locale: data.locale },
        });

        if (existingNews) {
            return NextResponse.json(
                { error: "Bu slug zaten kullanılıyor" },
                { status: 400 }
            );
        }

        const news = await prisma.news.create({
            data: {
                title: data.title,
                slug,
                excerpt: data.excerpt,
                content: data.content,
                category: data.category,
                coverImage: data.coverImage,
                publishedTime: new Date(data.publishedTime),
                isActive: data.isActive,
                locale: data.locale,
                parentId: data.parentId,
            },
        });

        return NextResponse.json({ data: news }, { status: 201 });
    } catch (error) {
        console.error("Error creating news:", error);
        return NextResponse.json(
            { error: "Haber oluşturulurken hata oluştu" },
            { status: 500 }
        );
    }
}
