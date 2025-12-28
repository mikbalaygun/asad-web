"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NoticeFormData {
    id?: number;
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    priority: "low" | "medium" | "high";
    publishedDate: string;
    isActive: boolean;
    locale: "tr" | "en";
    parentId?: number | null;
}

export function NoticeForm({ initialData, mode }: { initialData?: NoticeFormData; mode: "create" | "edit" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<NoticeFormData>({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        priority: initialData?.priority || "medium",
        publishedDate: initialData?.publishedDate || new Date().toISOString().slice(0, 16),
        isActive: initialData?.isActive ?? true,
        locale: initialData?.locale || "tr",
        parentId: initialData?.parentId || null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = mode === "create" ? "/api/notices" : `/api/notices/${initialData?.id}`;
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Bir hata oluştu");
            }

            router.push("/admin/notices");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const isTranslation = !!formData.parentId;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {isTranslation && (
                <div className="bg-blue-500/20 border border-blue-500/50 text-blue-300 px-4 py-3 rounded-lg">
                    🌐 Bu bir çeviri içeriktir (Parent ID: {formData.parentId})
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <Label>Başlık *</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Duyuru başlığı..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>URL Slug (opsiyonel)</Label>
                        <Input
                            value={formData.slug || ""}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="otomatik-olusturulur"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Kısa Özet *</Label>
                        <Textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="Duyuru özeti..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>İçerik *</Label>
                        <TipTapEditor
                            content={formData.content}
                            onChange={(c) => setFormData({ ...formData, content: c })}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Öncelik</Label>
                        <Select
                            value={formData.priority}
                            onValueChange={(v: "low" | "medium" | "high") => setFormData({ ...formData, priority: v })}
                        >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">🟢 Düşük</SelectItem>
                                <SelectItem value="medium">🟡 Orta</SelectItem>
                                <SelectItem value="high">🔴 Yüksek</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Yayınlanma Tarihi</Label>
                        <Input
                            type="datetime-local"
                            value={formData.publishedDate}
                            onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Dil</Label>
                        <Select
                            value={formData.locale}
                            onValueChange={(v: "tr" | "en") => setFormData({ ...formData, locale: v })}
                            disabled={isTranslation}
                        >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tr">Türkçe</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-5 h-5"
                        />
                        <Label>Aktif</Label>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>
                    {loading ? "Kaydediliyor..." : mode === "create" ? "Oluştur" : "Kaydet"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/notices")}>
                    İptal
                </Button>
            </div>
        </form>
    );
}
