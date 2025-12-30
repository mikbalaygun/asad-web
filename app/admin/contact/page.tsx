"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminContactPage() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumber: "",
        primaryEmail: "",
        secondaryEmail: "",
        addressTR: "",
        addressEN: "",
        instagram: "",
        facebook: "",
        twitter: "",
        youtube: "",
        nextsocial: "",
        googleMapsUrl: "",
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        fetch("/api/contact").then(r => r.json()).then(data => {
            if (data.data) setFormData(data.data);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/contact", {
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
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">İletişim Bilgileri</h1></div>
            <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Telefon</Label><Input value={formData.phoneNumber || ""} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Birincil E-posta</Label><Input type="email" value={formData.primaryEmail || ""} onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })} /></div>
                    <div className="space-y-2"><Label>İkincil E-posta</Label><Input type="email" value={formData.secondaryEmail || ""} onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Adres (Türkçe)</Label><Textarea value={formData.addressTR || ""} onChange={(e) => setFormData({ ...formData, addressTR: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Address (English)</Label><Textarea value={formData.addressEN || ""} onChange={(e) => setFormData({ ...formData, addressEN: e.target.value })} /></div>
                </div>
                <h3 className="text-lg font-semibold text-white pt-4">Sosyal Medya</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>Instagram</Label><Input value={formData.instagram || ""} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} placeholder="URL" /></div>
                    <div className="space-y-2"><Label>Facebook</Label><Input value={formData.facebook || ""} onChange={(e) => setFormData({ ...formData, facebook: e.target.value })} placeholder="URL" /></div>
                    <div className="space-y-2"><Label>Twitter</Label><Input value={formData.twitter || ""} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} placeholder="URL" /></div>
                    <div className="space-y-2"><Label>YouTube</Label><Input value={formData.youtube || ""} onChange={(e) => setFormData({ ...formData, youtube: e.target.value })} placeholder="URL" /></div>
                    <div className="space-y-2"><Label>NextSocial</Label><Input value={formData.nextsocial || ""} onChange={(e) => setFormData({ ...formData, nextsocial: e.target.value })} placeholder="URL" /></div>
                </div>
                <h3 className="text-lg font-semibold text-white pt-4">Harita Ayarları</h3>
                <div className="space-y-2">
                    <Label>Google Maps Embed URL</Label>
                    <Input
                        value={formData.googleMapsUrl || ""}
                        onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                    <p className="text-xs text-slate-400">Google Maps&apos;ten &apos;Harita yerleştirme&apos; (Embed a map) seçeneği ile aldığınız linki buraya yapıştırın.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Enlem (Latitude)</Label><Input value={formData.latitude || ""} onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Boylam (Longitude)</Label><Input value={formData.longitude || ""} onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} /></div>
                </div>
                <div className="flex gap-4 pt-6 border-t border-slate-700">
                    <Button type="submit" disabled={loading}>{loading ? "Kaydediliyor..." : "Kaydet"}</Button>
                    {saved && <span className="text-green-400 py-2">✓ Kaydedildi</span>}
                </div>
            </form>
        </div>
    );
}
