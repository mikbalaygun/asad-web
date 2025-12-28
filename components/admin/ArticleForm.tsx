"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { FileUpload } from "@/components/admin/FileUpload";
import { articleCategories } from "@/lib/validations/article";

interface ArticleFormData {
    id?: number;
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    pdfUrl: string | null;
    publishedDate: string;
    isActive: boolean;
    locale: "tr" | "en";
    parentId?: number | null;
}

interface ArticleFormProps {
    initialData?: ArticleFormData;
    mode: "create" | "edit";
}

export function ArticleForm({ initialData, mode }: ArticleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<ArticleFormData>({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        author: initialData?.author || "",
        category: initialData?.category || "",
        pdfUrl: initialData?.pdfUrl || null,
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
            const url = mode === "create" ? "/api/articles" : `/api/articles/${initialData?.id}`;
            const method = mode === "create" ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Bir hata oluştu");
            }

            router.push("/admin/articles");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Bir hata oluştu");
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
                        <Label htmlFor="title">Başlık *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Makale başlığı..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug (opsiyonel)</Label>
                        <Input
                            id="slug"
                            value={formData.slug || ""}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="otomatik-olusturulur"
                        />
                        <p className="text-xs text-slate-500">Boş bırakılırsa başlıktan otomatik oluşturulur</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Özet *</Label>
                        <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="Makale özeti..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>İçerik *</Label>
                        <TipTapEditor
                            content={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="author">Yazar *</Label>
                        <Input
                            id="author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder="Yazar adı..."
                            required
                        />
                    </div>

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
                                {articleCategories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* PDF Yükleme */}
                    <FileUpload
                        value={formData.pdfUrl}
                        onChange={(url) => setFormData({ ...formData, pdfUrl: url })}
                        folder="articles"
                        label="PDF Dosyası (opsiyonel)"
                    />

                    <div className="space-y-2">
                        <Label>Dil</Label>
                        <Select
                            value={formData.locale}
                            onValueChange={(value: "tr" | "en") => setFormData({ ...formData, locale: value })}
                            disabled={isTranslation}
                        >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tr">Türkçe</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="publishedDate">Yayın Tarihi</Label>
                        <Input
                            id="publishedDate"
                            type="datetime-local"
                            value={formData.publishedDate}
                            onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-600"
                        />
                        <Label htmlFor="isActive">Aktif</Label>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>
                    {loading ? "Kaydediliyor..." : mode === "create" ? "Oluştur" : "Kaydet"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/articles")}>
                    İptal
                </Button>
            </div>
        </form>
    );
}
