"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { newsCategories } from "@/lib/validations/news";

interface NewsFormData {
    id?: number;
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage: string | null;
    publishedTime: string;
    isActive: boolean;
    locale: "tr" | "en";
    parentId?: number | null;
}

interface NewsFormProps {
    initialData?: NewsFormData;
    mode: "create" | "edit";
}

export function NewsForm({ initialData, mode }: NewsFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<NewsFormData>({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        category: initialData?.category || "",
        coverImage: initialData?.coverImage || null,
        publishedTime: initialData?.publishedTime || new Date().toISOString().slice(0, 16),
        isActive: initialData?.isActive ?? true,
        locale: initialData?.locale || "tr",
        parentId: initialData?.parentId || null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = mode === "create" ? "/api/news" : `/api/news/${initialData?.id}`;
            const method = mode === "create" ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    content: formData.content, // HTML string from TipTap
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Bir hata oluştu");
            }

            router.push("/admin/news");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Başlık *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Haber başlığı..."
                            required
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Özet *</Label>
                        <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="Haber özeti..."
                            required
                            className="min-h-[100px]"
                        />
                    </div>

                    {/* Content (TipTap Editor) */}
                    <div className="space-y-2">
                        <Label>İçerik *</Label>
                        <TipTapEditor
                            content={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                            placeholder="Haber içeriğini yazın..."
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Cover Image */}
                    <div className="space-y-2">
                        <Label>Kapak Resmi</Label>
                        <ImageUpload
                            value={formData.coverImage}
                            onChange={(url) => setFormData({ ...formData, coverImage: url })}
                            folder="news"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label>Kategori *</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Kategori seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                {newsCategories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Locale */}
                    <div className="space-y-2">
                        <Label>Dil</Label>
                        <Select
                            value={formData.locale}
                            onValueChange={(value: "tr" | "en") => setFormData({ ...formData, locale: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tr">Türkçe</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Published Time */}
                    <div className="space-y-2">
                        <Label htmlFor="publishedTime">Yayın Tarihi</Label>
                        <Input
                            id="publishedTime"
                            type="datetime-local"
                            value={formData.publishedTime}
                            onChange={(e) => setFormData({ ...formData, publishedTime: e.target.value })}
                        />
                    </div>

                    {/* Is Active */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="isActive" className="cursor-pointer">
                            Aktif (Yayında)
                        </Label>
                    </div>

                    {/* Slug (optional) */}
                    <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug (opsiyonel)</Label>
                        <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="otomatik-olusturulur"
                        />
                        <p className="text-xs text-slate-500">
                            Boş bırakılırsa başlıktan otomatik oluşturulur
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Kaydediliyor...
                        </>
                    ) : mode === "create" ? (
                        "Oluştur"
                    ) : (
                        "Kaydet"
                    )}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/news")}
                >
                    İptal
                </Button>
            </div>
        </form>
    );
}
