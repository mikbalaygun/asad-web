import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
    const contact = await prisma.contactInfo.findFirst();
    return NextResponse.json({ data: contact });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const body = await request.json();

    const existing = await prisma.contactInfo.findFirst();
    let contact;
    if (existing) {
        contact = await prisma.contactInfo.update({ where: { id: existing.id }, data: body });
    } else {
        contact = await prisma.contactInfo.create({ data: body });
    }
    return NextResponse.json({ data: contact });
}
