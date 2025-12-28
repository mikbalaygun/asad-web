"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VideoFormData {
    id?: number;
    title: string;
    description: string;
    category: string;
    youtubeLink: string;
    publishedDate: string;
    isActive: boolean;
    locale: "tr" | "en";
}

export function VideoForm({ initialData, mode }: { initialData?: VideoFormData; mode: "create" | "edit" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<VideoFormData>({
        title: initialData?.title || "",
        description: initialData?.description || "",
        category: initialData?.category || "Genel",
        youtubeLink: initialData?.youtubeLink || "",
        publishedDate: initialData?.publishedDate || new Date().toISOString().split("T")[0],
        isActive: initialData?.isActive ?? true,
        locale: initialData?.locale || "tr",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.youtubeLink) { alert("YouTube linki zorunludur"); return; }
        setLoading(true);
        const url = mode === "create" ? "/api/video-gallery" : `/api/video-gallery/${initialData?.id}`;
        await fetch(url, { method: mode === "create" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        router.push("/admin/video-gallery");
        router.refresh();
    };

    // YouTube thumbnail preview
    const getThumbnail = (url: string) => {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
        return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
    };
    const thumbnail = getThumbnail(formData.youtubeLink);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="space-y-2"><Label>Başlık *</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
                    <div className="space-y-2">
                        <Label>YouTube Linki *</Label>
                        <Input value={formData.youtubeLink} onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })} placeholder="https://youtube.com/watch?v=..." required />
                        {thumbnail && (
                            <div className="mt-2">
                                <img src={thumbnail} alt="Thumbnail" className="rounded-lg w-full max-w-xs" />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2"><Label>Açıklama</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2"><Label>Kategori</Label><Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Dalış, Etkinlik..." /></div>
                    <div className="space-y-2"><Label>Yayın Tarihi</Label><Input type="date" value={formData.publishedDate} onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })} /></div>
                    <div className="space-y-2">
                        <Label>Dil</Label>
                        <Select value={formData.locale} onValueChange={(v: "tr" | "en") => setFormData({ ...formData, locale: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="tr">Türkçe</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-3"><input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5" /><Label>Aktif</Label></div>
                </div>
            </div>
            <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>{loading ? "..." : mode === "create" ? "Oluştur" : "Kaydet"}</Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/video-gallery")}>İptal</Button>
            </div>
        </form>
    );
}
