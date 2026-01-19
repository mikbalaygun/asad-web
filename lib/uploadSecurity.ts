/**
 * File Upload Security Module
 * Kritik güvenlik kontrollerini içerir
 */

import { randomBytes } from 'crypto';

// Güvenli dosya türleri ve magic byte'ları
const FILE_SIGNATURES: Record<string, { magic: number[][]; extension: string; mimeTypes: string[] }> = {
    // JPEG
    jpeg: {
        magic: [[0xFF, 0xD8, 0xFF]],
        extension: 'jpg',
        mimeTypes: ['image/jpeg', 'image/jpg']
    },
    // PNG
    png: {
        magic: [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
        extension: 'png',
        mimeTypes: ['image/png']
    },
    // GIF
    gif: {
        magic: [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
        extension: 'gif',
        mimeTypes: ['image/gif']
    },
    // WebP
    webp: {
        magic: [[0x52, 0x49, 0x46, 0x46]], // RIFF header, WebP has additional checks
        extension: 'webp',
        mimeTypes: ['image/webp']
    },
    // PDF
    pdf: {
        magic: [[0x25, 0x50, 0x44, 0x46]], // %PDF
        extension: 'pdf',
        mimeTypes: ['application/pdf']
    }
};

// Tehlikeli dosya uzantıları (kesinlikle engelle)
const DANGEROUS_EXTENSIONS = [
    'php', 'php3', 'php4', 'php5', 'phtml', 'phps',
    'asp', 'aspx', 'asa', 'asax',
    'jsp', 'jspx',
    'cgi', 'pl', 'py', 'rb', 'sh', 'bash',
    'exe', 'dll', 'com', 'bat', 'cmd', 'msi',
    'htaccess', 'htpasswd',
    'svg', // SVG can contain scripts
    'html', 'htm', 'xhtml',
    'js', 'mjs', 'ts'
];

// Rate limiting için basit in-memory store
const uploadAttempts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 dakika
const MAX_UPLOADS_PER_WINDOW = 10; // Dakikada max 10 yükleme

export interface SecurityCheckResult {
    valid: boolean;
    error?: string;
    detectedType?: string;
    safeExtension?: string;
}

/**
 * Magic byte kontrolü - Dosyanın gerçek türünü kontrol eder
 */
export function validateMagicBytes(buffer: Buffer): SecurityCheckResult {
    if (buffer.length < 8) {
        return { valid: false, error: 'Dosya çok küçük veya bozuk' };
    }

    for (const [type, signature] of Object.entries(FILE_SIGNATURES)) {
        for (const magic of signature.magic) {
            let matches = true;
            for (let i = 0; i < magic.length; i++) {
                if (buffer[i] !== magic[i]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                // WebP için ek kontrol (RIFF....WEBP)
                if (type === 'webp') {
                    const webpMarker = buffer.slice(8, 12).toString('ascii');
                    if (webpMarker !== 'WEBP') {
                        continue;
                    }
                }
                return {
                    valid: true,
                    detectedType: type,
                    safeExtension: signature.extension
                };
            }
        }
    }

    return { valid: false, error: 'Desteklenmeyen veya tehlikeli dosya türü' };
}

/**
 * MIME type doğrulaması - Magic byte ile uyumlu mu kontrol eder
 */
export function validateMimeType(mimeType: string, detectedType: string): boolean {
    const signature = FILE_SIGNATURES[detectedType];
    if (!signature) return false;
    return signature.mimeTypes.includes(mimeType.toLowerCase());
}

/**
 * Dosya adı sanitizasyonu
 */
export function sanitizeFilename(filename: string): string {
    // Sadece alfanümerik, tire ve alt çizgi kabul et
    return filename
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .replace(/_+/g, '_')
        .substring(0, 50);
}

/**
 * Uzantı kontrolü - Tehlikeli uzantıları engelle
 */
export function isExtensionSafe(filename: string): boolean {
    const parts = filename.toLowerCase().split('.');
    // Çoklu uzantı kontrolü (örn: file.php.jpg)
    for (const part of parts) {
        if (DANGEROUS_EXTENSIONS.includes(part)) {
            return false;
        }
    }
    return true;
}

/**
 * Folder parametresi sanitizasyonu - Directory traversal'ı engelle
 */
export function sanitizeFolder(folder: string): string {
    // İzin verilen klasörler
    const allowedFolders = ['general', 'news', 'articles', 'projects', 'services', 'board', 'sponsors', 'gallery', 'files', 'photos', 'videos'];

    // Folder'ı temizle
    const cleanFolder = folder
        .replace(/\.\./g, '') // ../ engelle
        .replace(/[\/\\]/g, '') // / ve \ engelle
        .replace(/[^a-zA-Z0-9_-]/g, '') // Sadece güvenli karakterler
        .toLowerCase();

    // Whitelist kontrolü
    if (allowedFolders.includes(cleanFolder)) {
        return cleanFolder;
    }

    return 'general'; // Varsayılan güvenli klasör
}

/**
 * Güvenli dosya adı oluştur
 */
export function generateSecureFilename(extension: string): string {
    const timestamp = Date.now();
    const randomPart = randomBytes(8).toString('hex');
    return `${timestamp}_${randomPart}.${extension}`;
}

/**
 * Rate limiting kontrolü
 */
export function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const record = uploadAttempts.get(clientIp);

    if (!record || now > record.resetTime) {
        uploadAttempts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return { allowed: true };
    }

    if (record.count >= MAX_UPLOADS_PER_WINDOW) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000);
        return { allowed: false, retryAfter };
    }

    record.count++;
    return { allowed: true };
}

/**
 * IP adresini al (proxy arkasında bile)
 */
export function getClientIp(headers: Headers): string {
    return headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        headers.get('x-real-ip') ||
        'unknown';
}

/**
 * Dosya içeriğinde tehlikeli pattern kontrolü
 */
export function scanForMaliciousContent(buffer: Buffer): boolean {
    const content = buffer.toString('utf8', 0, Math.min(buffer.length, 10000));

    const dangerousPatterns = [
        /<\?php/i,
        /<script/i,
        /<%/,
        /eval\s*\(/i,
        /base64_decode/i,
        /shell_exec/i,
        /system\s*\(/i,
        /exec\s*\(/i,
        /passthru/i,
        /proc_open/i,
        /popen\s*\(/i,
    ];

    for (const pattern of dangerousPatterns) {
        if (pattern.test(content)) {
            return true; // Tehlikeli içerik bulundu
        }
    }

    return false;
}

/**
 * Tam güvenlik kontrolü - Tüm kontrolleri birleştirir
 */
export async function performFullSecurityCheck(
    file: File,
    folder: string,
    clientIp: string
): Promise<{
    valid: boolean;
    error?: string;
    safeFilename?: string;
    safeFolder?: string;
}> {
    // 1. Rate limit kontrolü
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
        return {
            valid: false,
            error: `Çok fazla yükleme denemesi. ${rateCheck.retryAfter} saniye sonra tekrar deneyin.`
        };
    }

    // 2. Uzantı kontrolü (ilk savunma hattı)
    if (!isExtensionSafe(file.name)) {
        return { valid: false, error: 'Tehlikeli dosya türü engellendi' };
    }

    // 3. Dosya boyutu kontrolü
    const isPdf = file.type === 'application/pdf';
    const maxSize = isPdf ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return { valid: false, error: `Dosya boyutu ${isPdf ? '10' : '5'}MB'dan büyük olamaz` };
    }

    // 4. Buffer oku
    const buffer = Buffer.from(await file.arrayBuffer());

    // 5. Magic byte kontrolü
    const magicCheck = validateMagicBytes(buffer);
    if (!magicCheck.valid) {
        return { valid: false, error: magicCheck.error };
    }

    // 6. MIME type uyumu kontrolü
    if (!validateMimeType(file.type, magicCheck.detectedType!)) {
        return { valid: false, error: 'Dosya türü ile içerik uyuşmuyor' };
    }

    // 7. Tehlikeli içerik taraması
    if (scanForMaliciousContent(buffer)) {
        return { valid: false, error: 'Dosyada zararlı içerik tespit edildi' };
    }

    // 8. Güvenli değerler oluştur
    const safeFolder = sanitizeFolder(folder);
    const safeFilename = generateSecureFilename(magicCheck.safeExtension!);

    return {
        valid: true,
        safeFilename,
        safeFolder
    };
}
