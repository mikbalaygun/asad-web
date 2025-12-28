import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { NewsForm } from "@/components/admin/NewsForm";

export default async function EditNewsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const newsId = parseInt(id);

    if (isNaN(newsId)) {
        notFound();
    }

    const news = await prisma.news.findUnique({
        where: { id: newsId },
    });

    if (!news) {
        notFound();
    }

    // Prepare initial data for form
    const initialData = {
        id: news.id,
        title: news.title,
        slug: news.slug,
        excerpt: news.excerpt,
        content: typeof news.content === "string" ? news.content : JSON.stringify(news.content),
        category: news.category,
        coverImage: news.coverImage,
        publishedTime: new Date(news.publishedTime).toISOString().slice(0, 16),
        isActive: news.isActive,
        locale: news.locale as "tr" | "en",
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Haberi Düzenle</h1>
                <p className="text-slate-400 mt-1">{news.title}</p>
            </div>

            {/* Form */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <NewsForm mode="edit" initialData={initialData} />
            </div>
        </div>
    );
}
