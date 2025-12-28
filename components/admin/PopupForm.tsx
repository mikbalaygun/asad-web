"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PopupFormData {
    id?: number;
    title: string;
    image: string | null;
    mobileImage: string | null;
    linkUrl: string;
    linkText: string;
    priority: number;
    closeDelay: number;
    startDate: string;
    endDate: string;
    displayFrequency: string;
    isActive: boolean;
    locale: "tr" | "en";
}

export function PopupForm({ initialData, mode }: { initialData?: PopupFormData; mode: "create" | "edit" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<PopupFormData>({
        title: initialData?.title || "",
        image: initialData?.image || null,
        mobileImage: initialData?.mobileImage || null,
        linkUrl: initialData?.linkUrl || "",
        linkText: initialData?.linkText || "",
        priority: initialData?.priority || 0,
        closeDelay: initialData?.closeDelay || 0,
        startDate: initialData?.startDate || "",
        endDate: initialData?.endDate || "",
        displayFrequency: initialData?.displayFrequency || "always",
        isActive: initialData?.isActive ?? true,
        locale: initialData?.locale || "tr",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const url = mode === "create" ? "/api/popups" : `/api/popups/${initialData?.id}`;
        await fetch(url, { method: mode === "create" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        router.push("/admin/popups");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="space-y-2"><Label>Başlık *</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Popup Görseli (Desktop)</Label><ImageUpload value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} folder="popups" /></div>
                    <div className="space-y-2"><Label>Popup Görseli (Mobil)</Label><ImageUpload value={formData.mobileImage} onChange={(url) => setFormData({ ...formData, mobileImage: url })} folder="popups" /></div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2"><Label>Link URL</Label><Input value={formData.linkUrl} onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })} placeholder="https://..." /></div>
                    <div className="space-y-2"><Label>Link Metni</Label><Input value={formData.linkText} onChange={(e) => setFormData({ ...formData, linkText: e.target.value })} placeholder="Daha Fazla" /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Öncelik</Label><Input type="number" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })} /></div>
                        <div className="space-y-2"><Label>Otomatik Kapanma (sn)</Label><Input type="number" value={formData.closeDelay} onChange={(e) => setFormData({ ...formData, closeDelay: parseInt(e.target.value) || 0 })} placeholder="0 = Kapanmaz" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Başlangıç</Label><Input type="datetime-local" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} /></div>
                        <div className="space-y-2"><Label>Bitiş</Label><Input type="datetime-local" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} /></div>
                    </div>
                    <div className="space-y-2">
                        <Label>Gösterim Sıklığı</Label>
                        <Select value={formData.displayFrequency} onValueChange={(v) => setFormData({ ...formData, displayFrequency: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="always">Her Ziyarette</SelectItem>
                                <SelectItem value="once">Bir Kez</SelectItem>
                                <SelectItem value="session">Oturum Başına</SelectItem>
                                <SelectItem value="daily">Günde Bir</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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
                <Button type="button" variant="outline" onClick={() => router.push("/admin/popups")}>İptal</Button>
            </div>
        </form>
    );
}
