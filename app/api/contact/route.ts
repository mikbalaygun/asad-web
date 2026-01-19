import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
    address: z.string().max(500).optional(),
    addressEn: z.string().max(500).optional(),
    phone: z.string().max(50).optional(),
    email: z.string().email().max(100).optional(),
    workingHours: z.string().max(200).optional(),
    workingHoursEn: z.string().max(200).optional(),
    mapUrl: z.string().max(1000).optional(),
    facebookUrl: z.string().max(500).optional(),
    instagramUrl: z.string().max(500).optional(),
    youtubeUrl: z.string().max(500).optional(),
    twitterUrl: z.string().max(500).optional(),
});

export async function GET() {
    const contact = await prisma.contactInfo.findFirst();
    return NextResponse.json({ data: contact });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    try {
        const body = await request.json();

        // Validate input
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
        }

        const existing = await prisma.contactInfo.findFirst();
        let contact;
        if (existing) {
            contact = await prisma.contactInfo.update({ where: { id: existing.id }, data: body });
        } else {
            contact = await prisma.contactInfo.create({ data: body });
        }
        return NextResponse.json({ data: contact });
    } catch (error) {
        console.error("[CONTACT POST] Error:", error);
        return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
    }
}

