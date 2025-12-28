import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

const sponsorSchema = z.object({
    name: z.string().min(1),
    logo: z.string().optional().nullable(),
    isActive: z.boolean().default(true),
    locale: z.enum(["tr", "en"]).default("tr"),
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "tr";
    const sponsors = await prisma.sponsor.findMany({ where: { locale } });
    return NextResponse.json({ data: sponsors });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const body = await request.json();
    const result = sponsorSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });
    const sponsor = await prisma.sponsor.create({ data: result.data });
    return NextResponse.json({ data: sponsor }, { status: 201 });
}
