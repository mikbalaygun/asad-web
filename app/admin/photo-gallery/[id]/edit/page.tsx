import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PhotoForm } from "@/components/admin/PhotoForm";

export default async function EditPhotoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const photo = await prisma.photoGallery.findUnique({ where: { id: parseInt(id) } });
    if (!photo) notFound();

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Fotoğraf Düzenle</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <PhotoForm mode="edit" initialData={{
                    id: photo.id,
                    title: photo.title,
                    category: photo.category || "",
                    imageUrl: photo.imageUrl,
                    thumbnailUrl: photo.thumbnailUrl,
                    order: photo.order,
                    isActive: photo.isActive,
                    locale: photo.locale as "tr" | "en",
                }} />
            </div>
        </div>
    );
}
