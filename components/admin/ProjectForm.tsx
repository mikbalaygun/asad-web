"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { projectCategories } from "@/lib/validations/project";

interface ProjectFormData {
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

export function ProjectForm({ initialData, mode }: { initialData?: ProjectFormData; mode: "create" | "edit" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProjectFormData>({
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
            const url = mode === "create" ? "/api/projects" : `/api/projects/${initialData?.id}`;
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error((await response.json()).error);
            router.push("/admin/projects");
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
            {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">{error}</div>}
            {isTranslation && <div className="bg-blue-500/20 border border-blue-500/50 text-blue-300 px-4 py-3 rounded-lg">🌐 Bu bir çeviri içeriktir (Parent ID: {formData.parentId})</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2"><Label>Başlık *</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>URL Slug (opsiyonel)</Label><Input value={formData.slug || ""} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="otomatik-olusturulur" /><p className="text-xs text-slate-500">Boş bırakılırsa başlıktan otomatik oluşturulur</p></div>
                    <div className="space-y-2"><Label>Özet *</Label><Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>İçerik *</Label><TipTapEditor content={formData.content} onChange={(content) => setFormData({ ...formData, content })} /></div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2"><Label>Kapak Görseli</Label><ImageUpload value={formData.coverImage} onChange={(url) => setFormData({ ...formData, coverImage: url })} /></div>
                    <div className="space-y-2"><Label>Kategori *</Label>
                        <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                            <SelectTrigger><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                            <SelectContent>{projectCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2"><Label>Dil</Label>
                        <Select value={formData.locale} onValueChange={(v: "tr" | "en") => setFormData({ ...formData, locale: v })} disabled={isTranslation}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="tr">Türkçe</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2"><Label>Yayın Tarihi</Label><Input type="datetime-local" value={formData.publishedTime} onChange={(e) => setFormData({ ...formData, publishedTime: e.target.value })} /></div>
                    <div className="flex items-center gap-3"><input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5" /><Label>Aktif</Label></div>
                </div>
            </div>
            <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>{loading ? "..." : mode === "create" ? "Oluştur" : "Kaydet"}</Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>İptal</Button>
            </div>
        </form>
    );
}
