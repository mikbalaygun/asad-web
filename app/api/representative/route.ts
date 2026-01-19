import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

// Validation schema
const representativeSchema = z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    photo: z.string().max(500).optional().nullable(),
    message: z.any(),
    messageEn: z.any().optional(),
    phone: z.string().max(50).optional(),
    email: z.string().email().max(100).optional(),
});

export async function GET() {
    const rep = await prisma.representative.findFirst();
    return NextResponse.json({ data: rep });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    try {
        const body = await request.json();

        // Validate input
        const result = representativeSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
        }

        const existing = await prisma.representative.findFirst();
        let rep;
        if (existing) {
            rep = await prisma.representative.update({ where: { id: existing.id }, data: body });
        } else {
            rep = await prisma.representative.create({ data: body });
        }
        return NextResponse.json({ data: rep });
    } catch (error) {
        console.error("[REPRESENTATIVE POST] Error:", error);
        return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
    }
}

