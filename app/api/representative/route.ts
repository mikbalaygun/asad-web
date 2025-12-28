import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
    const rep = await prisma.representative.findFirst();
    return NextResponse.json({ data: rep });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const body = await request.json();
    const existing = await prisma.representative.findFirst();
    let rep;
    if (existing) {
        rep = await prisma.representative.update({ where: { id: existing.id }, data: body });
    } else {
        rep = await prisma.representative.create({ data: body });
    }
    return NextResponse.json({ data: rep });
}
