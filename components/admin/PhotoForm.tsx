"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PhotoFormData {
    id?: number;
    title: string;
    category: string;
    image: string | null; // Changed from imageUrl to match schema
    alternativeText: string | null;
    publishedDate: string;
    isActive: boolean;
    locale: "tr" | "en";
}

export function PhotoForm({ initialData, mode }: { initialData?: PhotoFormData; mode: "create" | "edit" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<PhotoFormData>({
        title: initialData?.title || "",
        category: initialData?.category || "Genel", // Default to "Genel"
        image: initialData?.image || null,
        alternativeText: initialData?.alternativeText || null,
        publishedDate: initialData?.publishedDate || new Date().toISOString().slice(0, 16),
        isActive: initialData?.isActive ?? true,
        locale: initialData?.locale || "tr",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image) { alert("Fotoğraf zorunludur"); return; }
        setLoading(true);
        setError(null);

        try {
            const url = mode === "create" ? "/api/photo-gallery" : `/api/photo-gallery/${initialData?.id}`;
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Bir hata oluştu");
            }

            router.push("/admin/photo-gallery");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <Label>Başlık *</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>

            <div className="space-y-2">
                <Label>Kategori</Label>
                <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="örn: Dalış, Etkinlik" />
            </div>

            <div className="space-y-2">
                <Label>Fotoğraf *</Label>
                <ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} folder="gallery" />
            </div>

            <div className="space-y-2">
                <Label>Alt Metin (SEO için)</Label>
                <Input value={formData.alternativeText || ""} onChange={(e) => setFormData({ ...formData, alternativeText: e.target.value })} placeholder="Fotoğraf açıklaması" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Yayınlanma Tarihi</Label>
                    <Input type="datetime-local" value={formData.publishedDate} onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label>Dil</Label>
                    <Select value={formData.locale} onValueChange={(v: "tr" | "en") => setFormData({ ...formData, locale: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="tr">Türkçe</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5" />
                <Label>Aktif</Label>
            </div>

            <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>{loading ? "Kaydediliyor..." : mode === "create" ? "Oluştur" : "Kaydet"}</Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/photo-gallery")}>İptal</Button>
            </div>
        </form>
    );
}
