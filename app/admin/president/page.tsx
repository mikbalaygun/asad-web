"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function AdminPresidentPage() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        photo: null as string | null,
        message: "",
        messageEn: "", // English message
        phone: "",
        email: "",
    });

    useEffect(() => {
        fetch("/api/president").then(r => r.json()).then(data => {
            if (data.data) {
                // Convert messages to string if they're JSON objects
                const message = typeof data.data.message === 'string'
                    ? data.data.message
                    : (data.data.message ? JSON.stringify(data.data.message) : "");
                const messageEn = typeof data.data.messageEn === 'string'
                    ? data.data.messageEn
                    : (data.data.messageEn ? JSON.stringify(data.data.messageEn) : "");

                setFormData({
                    ...data.data,
                    message,
                    messageEn
                });
            }
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/president", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        setLoading(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Başkan Bilgileri</h1></div>
            <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Ad</Label><Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} /></div>
                            <div className="space-y-2"><Label>Soyad</Label><Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} /></div>
                        </div>
                        <div className="space-y-2"><Label>Telefon</Label><Input value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
                        <div className="space-y-2"><Label>E-posta</Label><Input type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>

                        {/* Turkish Message */}
                        <div className="space-y-2">
                            <Label>
                                <span className="flex items-center gap-2">
                                    🇹🇷 Başkan Mesajı (Türkçe)
                                </span>
                            </Label>
                            <TipTapEditor content={formData.message || ""} onChange={(c) => setFormData({ ...formData, message: c })} />
                        </div>

                        {/* English Message */}
                        <div className="space-y-2">
                            <Label>
                                <span className="flex items-center gap-2">
                                    🇬🇧 Başkan Mesajı (İngilizce)
                                </span>
                            </Label>
                            <TipTapEditor content={formData.messageEn || ""} onChange={(c) => setFormData({ ...formData, messageEn: c })} />
                        </div>
                    </div>
                    <div className="space-y-2"><Label>Fotoğraf</Label><ImageUpload value={formData.photo} onChange={(url) => setFormData({ ...formData, photo: url })} folder="president" /></div>
                </div>
                <div className="flex gap-4 pt-6 border-t border-slate-700">
                    <Button type="submit" disabled={loading}>{loading ? "Kaydediliyor..." : "Kaydet"}</Button>
                    {saved && <span className="text-green-400 py-2">✓ Kaydedildi</span>}
                </div>
            </form>
        </div>
    );
}
