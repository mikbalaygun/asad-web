import { prisma } from "@/lib/db";
import { NewsForm } from "@/components/admin/NewsForm";

interface NewNewsPageProps {
    searchParams: Promise<{ parentId?: string; locale?: string }>;
}

export default async function NewNewsPage({ searchParams }: NewNewsPageProps) {
    const params = await searchParams;
    const parentId = params.parentId ? parseInt(params.parentId) : null;
    const locale = (params.locale as "tr" | "en") || "tr";

    // If creating a translation, fetch the parent item for reference
    let parentItem = null;
    if (parentId) {
        parentItem = await prisma.news.findUnique({ where: { id: parentId } });
    }

    const isTranslation = !!parentId;
    const title = isTranslation ? `${locale.toUpperCase()} Çevirisi Ekle` : "Yeni Haber";
    const subtitle = isTranslation && parentItem
        ? `Orijinal: "${parentItem.title}"`
        : "Yeni bir haber oluşturun";

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-slate-400 mt-1">{subtitle}</p>
            </div>

            {/* Show original content for reference when translating */}
            {isTranslation && parentItem && (
                <div className="mb-6 p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
                    <h3 className="text-sm font-semibold text-slate-400 mb-2">📝 Orijinal İçerik (Referans)</h3>
                    <p className="text-white font-medium">{parentItem.title}</p>
                    <p className="text-slate-400 text-sm mt-1">{parentItem.excerpt}</p>
                </div>
            )}

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <NewsForm
                    mode="create"
                    initialData={isTranslation ? {
                        title: "",
                        slug: "",
                        excerpt: "",
                        content: "",
                        category: parentItem?.category || "",
                        coverImage: parentItem?.coverImage || null,
                        publishedTime: new Date().toISOString().slice(0, 16),
                        isActive: true,
                        locale: locale,
                        parentId: parentId,
                    } : undefined}
                />
            </div>
        </div>
    );
}
