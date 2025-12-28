import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createServiceSchema, generateSlug } from "@/lib/validations/service";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";
    const slug = searchParams.get("slug");

    const where: Record<string, unknown> = { locale };
    if (slug) {
        where.slug = slug;
    }

    const services = await prisma.service.findMany({
        where,
        orderBy: { order: "asc" },
        include: { localizations: { select: { id: true, title: true, slug: true, locale: true } } }
    });
    return NextResponse.json({ data: services });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const body = await request.json();
    const result = createServiceSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
    const data = result.data;
    const service = await prisma.service.create({
        data: {
            ...data,
            slug: data.slug || generateSlug(data.title),
            icon: "🌊" // Default icon since we now use coverImage
        },
    });
    return NextResponse.json({ data: service }, { status: 201 });
}
