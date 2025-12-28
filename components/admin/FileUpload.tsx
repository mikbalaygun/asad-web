"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
    value: string | null;
    onChange: (url: string | null) => void;
    accept?: string;
    folder?: string;
    label?: string;
}

export function FileUpload({ value, onChange, accept = ".pdf", folder = "files", label = "PDF Dosyası" }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", folder);

            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();

            if (data.url) {
                onChange(data.url);
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const fileName = value ? value.split("/").pop() : null;

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex flex-col gap-3">
                {value ? (
                    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <span className="text-2xl">📄</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{fileName}</p>
                            <a href={value} target="_blank" rel="noopener" className="text-blue-400 text-xs hover:underline">
                                Görüntüle / İndir
                            </a>
                        </div>
                        <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
                            Kaldır
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <input
                            ref={inputRef}
                            type="file"
                            accept={accept}
                            onChange={handleUpload}
                            className="hidden"
                            id="file-upload"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => inputRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? "Yükleniyor..." : "📎 PDF Yükle"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
