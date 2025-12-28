"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SponsorForm({ initialData, mode }: { initialData?: { id?: number; name: string; logo: string | null; isActive: boolean; locale: "tr" | "en" }; mode: "create" | "edit" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        logo: initialData?.logo || null,
        isActive: initialData?.isActive ?? true,
        locale: initialData?.locale || "tr" as "tr" | "en",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const url = mode === "create" ? "/api/sponsors" : `/api/sponsors/${initialData?.id}`;
        await fetch(url, { method: mode === "create" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        router.push("/admin/sponsors");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div className="space-y-2"><Label>Sponsor Adı *</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Logo</Label><ImageUpload value={formData.logo} onChange={(url) => setFormData({ ...formData, logo: url })} folder="sponsors" /></div>
            <div className="space-y-2">
                <Label>Dil</Label>
                <Select value={formData.locale} onValueChange={(v: "tr" | "en") => setFormData({ ...formData, locale: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="tr">Türkçe</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-3"><input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5" /><Label>Aktif</Label></div>
            <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>{loading ? "..." : mode === "create" ? "Oluştur" : "Kaydet"}</Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/sponsors")}>İptal</Button>
            </div>
        </form>
    );
}
