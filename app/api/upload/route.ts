import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import {
    performFullSecurityCheck,
    getClientIp
} from "@/lib/uploadSecurity";

// POST /api/upload - Güvenli Dosya Yükleme
export async function POST(request: NextRequest) {
    try {
        // 1. Auth check - Sadece giriş yapmış kullanıcılar
        const session = await auth();
        if (!session) {
            console.warn("[UPLOAD] Yetkisiz erişim denemesi");
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        // 2. Form verilerini al
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) || "general";

        if (!file) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        // 3. Client IP al (rate limiting için)
        const clientIp = getClientIp(request.headers);

        // 4. Tam güvenlik kontrolü
        const securityCheck = await performFullSecurityCheck(file, folder, clientIp);

        if (!securityCheck.valid) {
            console.warn(`[UPLOAD] Güvenlik kontrolü başarısız - IP: ${clientIp}, Hata: ${securityCheck.error}`);
            return NextResponse.json(
                { error: securityCheck.error },
                { status: 400 }
            );
        }

        // 5. Güvenli klasör oluştur
        const uploadDir = path.join(process.cwd(), "public", "uploads", securityCheck.safeFolder!);
        await mkdir(uploadDir, { recursive: true });

        // 6. Dosyayı güvenli isimle kaydet
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(uploadDir, securityCheck.safeFilename!);
        await writeFile(filePath, buffer);

        // 7. URL'i döndür
        const url = `/uploads/${securityCheck.safeFolder}/${securityCheck.safeFilename}`;

        console.log(`[UPLOAD] Başarılı - Kullanıcı: ${session.user?.email}, Dosya: ${url}`);

        return NextResponse.json({
            url,
            filename: securityCheck.safeFilename,
            size: file.size,
            type: file.type,
        });
    } catch (error) {
        console.error("[UPLOAD] Hata:", error);
        return NextResponse.json(
            { error: "Dosya yüklenirken hata oluştu" },
            { status: 500 }
        );
    }
}
