import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createProjectSchema, generateSlug } from "@/lib/validations/project";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get("locale") || "tr";
        const projects = await prisma.project.findMany({
            where: { locale },
            orderBy: { publishedTime: "desc" },
        });
        return NextResponse.json({ data: projects });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Projeler alınırken hata oluştu" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

        const body = await request.json();
        const result = createProjectSchema.safeParse(body);
        if (!result.success) return NextResponse.json({ error: "Geçersiz veri", details: result.error.issues }, { status: 400 });

        const data = result.data;
        const project = await prisma.project.create({
            data: {
                title: data.title,
                slug: data.slug || generateSlug(data.title),
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
        return NextResponse.json({ data: project }, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Proje oluşturulurken hata oluştu" }, { status: 500 });
    }
}
