import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const { id } = await params;
    const body = await request.json();
    const sponsor = await prisma.sponsor.update({ where: { id: parseInt(id) }, data: body });
    return NextResponse.json({ data: sponsor });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    await prisma.sponsor.delete({ where: { id: parseInt((await params).id) } });
    return NextResponse.json({ message: "Silindi" });
}
