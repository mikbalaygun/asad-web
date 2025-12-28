import { prisma } from "@/lib/db";
import { PopupForm } from "@/components/admin/PopupForm";

interface NewPopupPageProps {
    searchParams: Promise<{ parentId?: string; locale?: string }>;
}

export default async function NewPopupPage({ searchParams }: NewPopupPageProps) {
    const params = await searchParams;
    const parentId = params.parentId ? parseInt(params.parentId) : null;
    const locale = (params.locale as "tr" | "en") || "tr";

    let parentItem = null;
    if (parentId) {
        parentItem = await prisma.popup.findUnique({ where: { id: parentId } });
    }

    const isTranslation = !!parentId;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">{isTranslation ? `${locale.toUpperCase()} Çevirisi Ekle` : "Yeni Popup"}</h1>
                {isTranslation && parentItem && <p className="text-slate-400 mt-1">Orijinal: "{parentItem.title}"</p>}
            </div>

            {isTranslation && parentItem && (
                <div className="mb-6 p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">📝 Orijinal İçerik</h3>
                    <p className="text-white font-medium">{parentItem.title}</p>
                </div>
            )}

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <PopupForm mode="create" initialData={isTranslation ? {
                    title: "", image: parentItem?.image || null, mobileImage: parentItem?.mobileImage || null,
                    linkUrl: parentItem?.linkUrl || "", linkText: "", priority: parentItem?.priority || 0,
                    startDate: parentItem?.startDate ? new Date(parentItem.startDate).toISOString().slice(0, 16) : "",
                    endDate: parentItem?.endDate ? new Date(parentItem.endDate).toISOString().slice(0, 16) : "",
                    displayFrequency: parentItem?.displayFrequency || "always", isActive: true, locale,
                } : undefined} />
            </div>
        </div>
    );
}
