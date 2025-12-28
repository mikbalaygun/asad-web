"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProjectButton({ id }: { id: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        if (!confirm("Silmek istediğinize emin misiniz?")) return;
        setLoading(true);
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        router.refresh();
        setLoading(false);
    };
    return (
        <button onClick={handleDelete} disabled={loading} className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded text-sm transition-colors">
            {loading ? "..." : "Sil"}
        </button>
    );
}
