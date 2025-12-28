import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

// Single type - only one record
export async function GET() {
    const president = await prisma.president.findFirst();
    return NextResponse.json({ data: president });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

    const body = await request.json();

    // Only keep editable fields, remove system fields
    const { firstName, lastName, photo, message, messageEn, phone, email } = body;
    const updateData = { firstName, lastName, photo, message, messageEn, phone, email };

    // Upsert - create or update the single record
    const existing = await prisma.president.findFirst();
    let president;
    if (existing) {
        president = await prisma.president.update({
            where: { id: existing.id },
            data: updateData
        });
    } else {
        president = await prisma.president.create({ data: updateData });
    }
    return NextResponse.json({ data: president });
}
