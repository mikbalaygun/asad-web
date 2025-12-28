import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

const popupSchema = z.object({
    title: z.string().min(1),
    slug: z.string().optional(),
    image: z.string().optional().nullable(),
    mobileImage: z.string().optional().nullable(),
    linkUrl: z.string().optional().nullable(),
    linkText: z.string().optional().nullable(),
    priority: z.number().default(0),
    startDate: z.string().optional().nullable(),
    endDate: z.string().optional().nullable(),
    displayFrequency: z.string().default("always"),
    closeDelay: z.number().default(0),
    showOnPages: z.any().optional(),
    isActive: z.boolean().default(true),
    locale: z.enum(["tr", "en"]).default("tr"),
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
    const popups = await prisma.popup.findMany({ where: { locale }, orderBy: { priority: "desc" } });
    return NextResponse.json({ data: popups });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const body = await request.json();
    const result = popupSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });
    const data = result.data;
    const popup = await prisma.popup.create({
        data: {
            ...data,
            slug: data.slug || generateSlug(data.title),
            startDate: data.startDate ? new Date(data.startDate) : null,
            endDate: data.endDate ? new Date(data.endDate) : null,
        },
    });
    return NextResponse.json({ data: popup }, { status: 201 });
}
