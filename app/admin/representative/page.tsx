"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface RepData {
    firstName: string;
    lastName: string;
    photo: string | null;
}

export default function RepresentativePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState<RepData>({ firstName: "", lastName: "", photo: null });

    useEffect(() => {
        fetch("/api/representative").then((r) => r.json()).then((data) => {
            if (data.data) setFormData(data.data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        await fetch("/api/representative", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        setSaving(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    if (loading) return <div className="text-slate-400">Yükleniyor...</div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Temsilci Bilgileri</h1>
                <p className="text-slate-400 mt-1">ASAD temsilcisi bilgilerini düzenleyin</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {success && <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">✓ Kaydedildi</div>}
                    <div className="flex items-center gap-6">
                        <ImageUpload value={formData.photo} onChange={(url) => setFormData({ ...formData, photo: url })} folder="representative" />
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2"><Label>Ad *</Label><Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required /></div>
                            <div className="space-y-2"><Label>Soyad *</Label><Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required /></div>
                        </div>
                    </div>
                    <div className="flex gap-4 pt-6 border-t border-slate-700">
                        <Button type="submit" disabled={saving}>{saving ? "Kaydediliyor..." : "Kaydet"}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
