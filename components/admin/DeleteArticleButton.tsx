"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteArticleButton({ id }: { id: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Bu makaleyi silmek istediğinize emin misiniz?")) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/articles/${id}`, { method: "DELETE" });
            if (response.ok) {
                router.refresh();
            } else {
                alert("Silme işlemi başarısız oldu");
            }
        } catch {
            alert("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded text-sm transition-colors disabled:opacity-50"
        >
            {loading ? "..." : "Sil"}
        </button>
    );
}
