import Link from "next/link";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";
import { TranslationButton } from "@/components/admin/TranslationButton";

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        where: { parentId: null },
        orderBy: { createdAt: "desc" },
        include: { localizations: true },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projeler</h1>
                    <p className="text-slate-400 mt-1">Tüm projeleri görüntüle ve yönet</p>
                </div>
                <Link href="/admin/projects/new"><Button><span>➕</span> Yeni Proje</Button></Link>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Başlık</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Kategori</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Diller</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Durum</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tarih</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {projects.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Henüz proje yok. <Link href="/admin/projects/new" className="text-blue-400">Oluşturun</Link></td></tr>
                        ) : projects.map((item) => {
                            const enTranslation = item.localizations.find((l) => l.locale === "en");
                            return (
                                <tr key={item.id} className="hover:bg-slate-800/50">
                                    <td className="px-6 py-4"><p className="font-medium text-white">{item.title}</p><p className="text-slate-400 text-sm truncate max-w-xs">{item.excerpt}</p></td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">{item.category}</span></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">TR</span>
                                            <TranslationButton itemId={item.id} currentLocale={item.locale} translationId={enTranslation?.id} basePath="/admin/projects" parentId={item.parentId} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.isActive ? <span className="text-green-400">Aktif</span> : <span className="text-red-400">Pasif</span>}</td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">{format(new Date(item.publishedTime), "dd MMM yyyy", { locale: tr })}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/projects/${item.id}/edit`} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm">Düzenle</Link>
                                            <DeleteProjectButton id={item.id} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
