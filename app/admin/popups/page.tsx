"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TranslationButton } from "@/components/admin/TranslationButton";
import { useState, useEffect } from "react";

interface Popup {
    id: number;
    title: string;
    image: string | null;
    isActive: boolean;
    locale: string;
    parentId: number | null;
    localizations: Array<{ id: number; locale: string }>;
}

export default function AdminPopupsPage() {
    const router = useRouter();
    const [popups, setPopups] = useState<Popup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPopups();
    }, []);

    const fetchPopups = async () => {
        const res = await fetch("/api/popups?locale=tr");
        const data = await res.json();
        // Filter to show only parent items
        setPopups((data.data || []).filter((p: Popup) => !p.parentId));
        setLoading(false);
    };

    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`"${title}" popup'ını silmek istediğinize emin misiniz?`)) return;

        await fetch(`/api/popups/${id}`, { method: "DELETE" });
        fetchPopups();
        router.refresh();
    };

    if (loading) return <div className="text-white">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-3xl font-bold text-white">Popup'lar</h1></div>
                <Link href="/admin/popups/new"><Button><span>➕</span> Yeni Popup</Button></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popups.length === 0 ? (
                    <p className="text-slate-400 col-span-3 text-center py-12">Henüz popup yok.</p>
                ) : popups.map((p) => {
                    const enTranslation = p.localizations?.find((l) => l.locale === "en");
                    return (
                        <div key={p.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                            {p.image ? (
                                <div className="relative w-full h-32">
                                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="300px" />
                                </div>
                            ) : (
                                <div className="w-full h-32 bg-slate-700 flex items-center justify-center text-4xl">🔔</div>
                            )}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium text-white">{p.title}</p>
                                    {p.isActive ? (
                                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">Aktif</span>
                                    ) : (
                                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">Pasif</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">TR</span>
                                        <TranslationButton itemId={p.id} currentLocale={p.locale} translationId={enTranslation?.id} basePath="/admin/popups" parentId={p.parentId} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/popups/${p.id}/edit`} className="text-blue-400 hover:underline">Düzenle</Link>
                                        <button onClick={() => handleDelete(p.id, p.title)} className="text-red-400 hover:underline">Sil</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
