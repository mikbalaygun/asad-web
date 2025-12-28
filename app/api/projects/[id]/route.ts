import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateProjectSchema, generateSlug } from "@/lib/validations/project";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id: parseInt(id) } });
    if (!project) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json({ data: project });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const result = updateProjectSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });

    const data = result.data;
    const project = await prisma.project.update({
        where: { id: parseInt(id) },
        data: {
            ...(data.title && { title: data.title, slug: data.slug || generateSlug(data.title) }),
            ...(data.excerpt && { excerpt: data.excerpt }),
            ...(data.content !== undefined && { content: data.content }),
            ...(data.category && { category: data.category }),
            ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
            ...(data.publishedTime && { publishedTime: new Date(data.publishedTime) }),
            ...(data.isActive !== undefined && { isActive: data.isActive }),
        },
    });
    return NextResponse.json({ data: project });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    await prisma.project.delete({ where: { id: parseInt((await params).id) } });
    return NextResponse.json({ message: "Silindi" });
}
