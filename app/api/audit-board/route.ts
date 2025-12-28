import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

const auditMemberSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    role: z.string().min(1),
    photo: z.string().optional().nullable(),
    order: z.number().default(0),
    isActive: z.boolean().default(true),
});

export async function GET() {
    const members = await prisma.auditBoardMember.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ data: members });
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const body = await request.json();
    const result = auditMemberSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Geçersiz" }, { status: 400 });
    const member = await prisma.auditBoardMember.create({ data: result.data });
    return NextResponse.json({ data: member }, { status: 201 });
}
