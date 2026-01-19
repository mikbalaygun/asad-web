/**
 * HTML Sanitization Utility
 * XSS saldırılarını önlemek için HTML içeriğini temizler
 */

import DOMPurify from 'isomorphic-dompurify';

// İzin verilen HTML tag'leri (TipTap editor çıktısı için)
const ALLOWED_TAGS = [
    'p', 'br', 'strong', 'em', 'u', 's', 'del',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'hr', 'div', 'span'
];

// İzin verilen attribute'lar
const ALLOWED_ATTR = [
    'href', 'src', 'alt', 'title', 'class', 'id',
    'target', 'rel', 'width', 'height'
];

// Tehlikeli URL protokolleri
const FORBIDDEN_PROTOCOLS = ['javascript:', 'data:', 'vbscript:'];

/**
 * HTML içeriğini sanitize eder
 * Tehlikeli script'leri, event handler'ları ve zararlı attribute'ları temizler
 */
export function sanitizeHtml(dirty: string | null | undefined): string {
    if (!dirty) return '';

    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS,
        ALLOWED_ATTR,
        FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onblur'],
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
        ALLOW_DATA_ATTR: false,
        // URL'lerde javascript: protokolünü engelle
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
    });
}

/**
 * Basit text sanitizasyonu (HTML tag'lerini tamamen kaldırır)
 */
export function sanitizeText(dirty: string | null | undefined): string {
    if (!dirty) return '';
    return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/**
 * URL sanitizasyonu
 */
export function sanitizeUrl(url: string | null | undefined): string {
    if (!url) return '';

    const trimmedUrl = url.trim().toLowerCase();

    // Tehlikeli protokolleri engelle
    for (const protocol of FORBIDDEN_PROTOCOLS) {
        if (trimmedUrl.startsWith(protocol)) {
            return '';
        }
    }

    return url;
}
