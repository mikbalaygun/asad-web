import Link from "next/link";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { TranslationButton } from "@/components/admin/TranslationButton";

export default async function AdminNoticesPage() {
    const notices = await prisma.notice.findMany({
        where: { parentId: null },
        orderBy: { publishedDate: "desc" },
        include: { localizations: true },
    });

    const priorityBadge = (p: string) => {
        switch (p) {
            case 'high': return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">🔴 Yüksek</span>;
            case 'medium': return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">🟡 Orta</span>;
            default: return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">🟢 Düşük</span>;
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-3xl font-bold text-white">Duyurular</h1></div>
                <Link href="/admin/notices/new"><Button><span>➕</span> Yeni Duyuru</Button></Link>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Öncelik</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Başlık</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Diller</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Yayın Tarihi</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Durum</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {notices.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Henüz duyuru yok.</td></tr>
                        ) : notices.map((item) => {
                            const enTranslation = item.localizations.find((l: { locale: string }) => l.locale === "en");
                            return (
                                <tr key={item.id} className="hover:bg-slate-800/50">
                                    <td className="px-6 py-4">{priorityBadge(item.priority)}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{item.title}</div>
                                        <div className="text-sm text-slate-400 truncate max-w-xs">{item.excerpt}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">TR</span>
                                            <TranslationButton itemId={item.id} currentLocale={item.locale} translationId={enTranslation?.id} basePath="/admin/notices" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {format(new Date(item.publishedDate), "dd MMM yyyy HH:mm", { locale: tr })}
                                    </td>
                                    <td className="px-6 py-4">{item.isActive ? <span className="text-green-400">Aktif</span> : <span className="text-red-400">Pasif</span>}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/notices/${item.id}/edit`} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm">Düzenle</Link>
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
