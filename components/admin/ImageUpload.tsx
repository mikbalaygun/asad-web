"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    value?: string | null;
    onChange: (url: string | null) => void;
    folder?: string;
}

export function ImageUpload({ value, onChange, folder = "general" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", folder);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Yükleme başarısız");
            }

            const data = await response.json();
            onChange(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Bir hata oluştu");
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-3">
            {/* Preview */}
            {value && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-700">
                    <Image
                        src={value}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Upload Area */}
            {!value && (
                <label
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                        uploading
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-800"
                    )}
                >
                    <div className="flex flex-col items-center justify-center py-6">
                        {uploading ? (
                            <>
                                <svg className="w-10 h-10 text-blue-500 animate-spin mb-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span className="text-slate-400 text-sm">Yükleniyor...</span>
                            </>
                        ) : (
                            <>
                                <span className="text-4xl mb-3">📷</span>
                                <span className="text-slate-400 text-sm">Resim yüklemek için tıklayın</span>
                                <span className="text-slate-500 text-xs mt-1">PNG, JPG, GIF, WEBP (max 5MB)</span>
                            </>
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleUpload}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            )}

            {/* Error */}
            {error && (
                <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* Manual URL Input */}
            {!value && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="veya resim URL'si girin..."
                        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onBlur={(e) => {
                            if (e.target.value) {
                                onChange(e.target.value);
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}
