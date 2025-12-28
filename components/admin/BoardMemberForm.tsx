"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface BoardMemberFormData {
    id?: number;
    firstName: string;
    lastName: string;
    role: string;
    photo: string | null;
    order: number;
    isActive: boolean;
}

export function BoardMemberForm({ initialData, mode }: { initialData?: BoardMemberFormData; mode: "create" | "edit" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<BoardMemberFormData>({
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        role: initialData?.role || "",
        photo: initialData?.photo || null,
        order: initialData?.order || 0,
        isActive: initialData?.isActive ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const url = mode === "create" ? "/api/board-members" : `/api/board-members/${initialData?.id}`;
        await fetch(url, { method: mode === "create" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        router.push("/admin/board-members");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Ad *</Label><Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Soyad *</Label><Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required /></div>
            </div>
            <div className="space-y-2"><Label>Görev *</Label><Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Fotoğraf</Label><ImageUpload value={formData.photo} onChange={(url) => setFormData({ ...formData, photo: url })} folder="board-members" /></div>
            <div className="space-y-2"><Label>Sıra</Label><Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} /></div>
            <div className="flex items-center gap-3">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-5 h-5" />
                <Label>Aktif</Label>
            </div>
            <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button type="submit" disabled={loading}>{loading ? "..." : mode === "create" ? "Oluştur" : "Kaydet"}</Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/board-members")}>İptal</Button>
            </div>
        </form>
    );
}
