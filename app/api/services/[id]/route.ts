import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateServiceSchema } from "@/lib/validations/service";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id: parseInt(id) } });
    if (!service) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json({ data: service });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const { id } = await params;
    const body = await request.json();
    const result = updateServiceSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });
    const service = await prisma.service.update({ where: { id: parseInt(id) }, data: result.data });
    return NextResponse.json({ data: service });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    await prisma.service.delete({ where: { id: parseInt((await params).id) } });
    return NextResponse.json({ message: "Silindi" });
}
