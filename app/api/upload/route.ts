import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// POST /api/upload - Dosya yükleme
export async function POST(request: NextRequest) {
    try {
        // Auth check
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) || "general";

        if (!file) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        // Validate file type (images + PDF)
        const allowedTypes = [
            "image/jpeg", "image/png", "image/gif", "image/webp",
            "application/pdf"
        ];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Geçersiz dosya türü. Sadece JPEG, PNG, GIF, WEBP ve PDF kabul edilir." },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB for PDF, 5MB for images)
        const isPdf = file.type === "application/pdf";
        const maxSize = isPdf ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: `Dosya boyutu ${isPdf ? '10' : '5'}MB'dan büyük olamaz` },
                { status: 400 }
            );
        }

        // Create unique filename
        const timestamp = Date.now();
        const ext = file.name.split(".").pop();
        const filename = `${timestamp}.${ext}`;

        // Create upload directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
        await mkdir(uploadDir, { recursive: true });

        // Write file
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // Return the public URL
        const url = `/uploads/${folder}/${filename}`;

        return NextResponse.json({
            url,
            filename,
            size: file.size,
            type: file.type,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Dosya yüklenirken hata oluştu" },
            { status: 500 }
        );
    }
}
