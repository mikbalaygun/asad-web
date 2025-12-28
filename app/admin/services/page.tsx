"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TranslationButton } from "@/components/admin/TranslationButton";
import { useState, useEffect } from "react";

interface Service {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    coverImage: string | null;
    order: number;
    isActive: boolean;
    locale: string;
    parentId: number | null;
    localizations: Array<{ id: number; locale: string; title: string; slug: string }>;
}

export default function AdminServicesPage() {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const res = await fetch("/api/services?locale=tr");
        const data = await res.json();
        // Filter to show only parent items (not translations)
        setServices((data.data || []).filter((s: Service) => !s.parentId));
        setLoading(false);
    };

    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`"${title}" hizmetini silmek istediğinize emin misiniz?`)) return;

        await fetch(`/api/services/${id}`, { method: "DELETE" });
        fetchServices();
        router.refresh();
    };

    if (loading) return <div className="text-white">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-3xl font-bold text-white">Hizmetler</h1></div>
                <Link href="/admin/services/new"><Button><span>➕</span> Yeni Hizmet</Button></Link>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Sıra</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Görsel</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Başlık</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Diller</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Durum</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {services.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Henüz hizmet yok.</td></tr>
                        ) : services.map((item) => {
                            const enTranslation = item.localizations?.find((l) => l.locale === "en");
                            return (
                                <tr key={item.id} className="hover:bg-slate-800/50">
                                    <td className="px-6 py-4 text-slate-300">{item.order}</td>
                                    <td className="px-6 py-4">
                                        {item.coverImage ? (
                                            <div className="relative w-16 h-12 rounded overflow-hidden">
                                                <Image src={item.coverImage} alt={item.title} fill className="object-cover" sizes="64px" />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-12 bg-slate-700 rounded flex items-center justify-center text-slate-500 text-xs">Yok</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4"><p className="font-medium text-white">{item.title}</p><p className="text-slate-400 text-sm line-clamp-1">{item.shortDescription}</p></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">TR</span>
                                            <TranslationButton itemId={item.id} currentLocale={item.locale} translationId={enTranslation?.id} basePath="/admin/services" parentId={item.parentId} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.isActive ? <span className="text-green-400">Aktif</span> : <span className="text-red-400">Pasif</span>}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/services/${item.id}/edit`} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm">Düzenle</Link>
                                            <button onClick={() => handleDelete(item.id, item.title)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm">Sil</button>
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
