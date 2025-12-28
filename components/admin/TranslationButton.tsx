"use client";

import Link from "next/link";

interface TranslationButtonProps {
    /** Current item ID */
    itemId: number;
    /** Current item's locale */
    currentLocale: string;
    /** ID of translation if exists */
    translationId?: number | null;
    /** Base path for the module (e.g., "/admin/news") */
    basePath: string;
    /** Parent ID if this item is already a translation */
    parentId?: number | null;
}

export function TranslationButton({
    itemId,
    currentLocale,
    translationId,
    basePath,
    parentId,
}: TranslationButtonProps) {
    // If this is already a translation (has parentId), don't show button
    if (parentId) {
        return null;
    }

    const targetLocale = currentLocale === "tr" ? "en" : "tr";
    const targetLabel = targetLocale.toUpperCase();

    if (translationId) {
        // Translation exists - link to edit it
        return (
            <Link
                href={`${basePath}/${translationId}/edit`}
                className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs hover:bg-green-500/30 transition-colors"
                title={`${targetLabel} çevirisini düzenle`}
            >
                ✓ {targetLabel}
            </Link>
        );
    }

    // No translation - link to create one
    return (
        <Link
            href={`${basePath}/new?parentId=${itemId}&locale=${targetLocale}`}
            className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30 transition-colors"
            title={`${targetLabel} çevirisi ekle`}
        >
            🌐 {targetLabel}
        </Link>
    );
}
