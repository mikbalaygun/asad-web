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

interface ServiceFormData {
    id?: number;
    title: string;
    slug?: string;
    shortDescription: string;
    description: string;
    coverImage: string | null;
    order: number;
    isActive: boolean;
    locale: "tr" | "en";
    parentId?: number | null;
}

export function ServiceForm({ initialData, mode }: { initialData?: ServiceFormData; mode: "create" | "edit" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ServiceFormData>({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        shortDescription: initialData?.shortDescription || "",
        description: initialData?.description || "",
        coverImage: initialData?.coverImage || null,
        order: initialData?.order || 0,
        isActive: initialData?.isActive ?? true,
        locale: initialData?.locale || "tr",
        parentId: initialData?.parentId || null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const url = mode === "create" ? "/api/services" : `/api/services/${initialData?.id}`;
        await fetch(url, { method: mode === "create" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        router.push("/admin/services");
        router.refresh();
    };

    const isTranslation = !!formData.parentId;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {isTranslation && <div className="bg-blue-500/20 border border-blue-500/50 text-blue-300 px-4 py-3 rounded-lg">🌐 Bu bir çeviri içeriktir (Parent ID: {formData.parentId})</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2"><Label>Başlık *</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>URL Slug (opsiyonel)</Label><Input value={formData.slug || ""} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="otomatik-olusturulur" /><p className="text-xs text-slate-500">Boş bırakılırsa başlıktan otomatik oluşturulur</p></div>
                    <div className="space-y-2"><Label>Kısa Açıklama *</Label><Textarea value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Açıklama</Label><TipTapEditor content={formData.description} onChange={(c) => setFormData({ ...formData, description: c })} /></div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Hizmet Görseli</Label>
                        <ImageUpload value={formData.coverImage} onChange={(url) => setFormData({ ...formData, coverImage: url })} folder="services" />
                    </div>
                    <div className="space-y-2"><Label>Sıra</Label><Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} /></div>
                    <div className="space-y-2">
                        <Label>Dil</Label>
                        <Select value={formData.locale} onValueChange={(v: "tr" | "en") => setFormData({ ...formData, locale: v })} disabled={isTranslation}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="tr">Türkçe</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-3"><input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5" /><Label>Aktif</Label></div>
                </div>
            </div>
            <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>{loading ? "..." : mode === "create" ? "Oluştur" : "Kaydet"}</Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>İptal</Button>
            </div>
        </form>
    );
}
