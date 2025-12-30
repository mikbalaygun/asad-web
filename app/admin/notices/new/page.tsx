import { prisma } from "@/lib/db";
import { NoticeForm } from "@/components/admin/NoticeForm";

interface NewNoticePageProps {
    searchParams: Promise<{ parentId?: string; locale?: string }>;
}

export default async function NewNoticePage({ searchParams }: NewNoticePageProps) {
    const params = await searchParams;
    const parentId = params.parentId ? parseInt(params.parentId) : null;
    const locale = (params.locale as "tr" | "en") || "tr";

    let parentItem = null;
    if (parentId) {
        parentItem = await prisma.notice.findUnique({ where: { id: parentId } });
    }

    const isTranslation = !!parentId;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">{isTranslation ? `${locale.toUpperCase()} Çevirisi Ekle` : "Yeni Duyuru"}</h1>
                {isTranslation && parentItem && <p className="text-slate-400 mt-1">Orijinal: &quot;{parentItem.title}&quot;</p>}
            </div>

            {isTranslation && parentItem && (
                <div className="mb-6 p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">📝 Orijinal İçerik</h3>
                    <p className="text-white font-medium">{parentItem.title}</p>
                    <p className="text-slate-400 text-sm mt-1">{parentItem.excerpt}</p>
                </div>
            )}

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <NoticeForm mode="create" initialData={isTranslation && parentItem ? {
                    title: "", slug: "", excerpt: "", content: "",
                    priority: parentItem.priority as "low" | "medium" | "high",
                    publishedDate: new Date().toISOString().slice(0, 16),
                    isActive: true, locale,
                    parentId: parentId,
                } : undefined} />
            </div>
        </div>
    );
}
