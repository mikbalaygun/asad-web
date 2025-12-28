import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default async function EditArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const articleId = parseInt(id);

    if (isNaN(articleId)) {
        notFound();
    }

    const article = await prisma.article.findUnique({
        where: { id: articleId },
    });

    if (!article) {
        notFound();
    }

    const initialData = {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: typeof article.content === "string" ? article.content : JSON.stringify(article.content),
        author: article.author,
        category: article.category,
        publishedDate: new Date(article.publishedDate).toISOString().slice(0, 16),
        isActive: article.isActive,
        locale: article.locale as "tr" | "en",
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Makaleyi Düzenle</h1>
                <p className="text-slate-400 mt-1">{article.title}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <ArticleForm mode="edit" initialData={initialData} />
            </div>
        </div>
    );
}
