import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { VideoForm } from "@/components/admin/VideoForm";

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const video = await prisma.videoGallery.findUnique({ where: { id: parseInt(id) } });
    if (!video) notFound();

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Video Düzenle</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <VideoForm mode="edit" initialData={{
                    id: video.id,
                    title: video.title,
                    description: video.description || "",
                    category: video.category,
                    youtubeLink: video.youtubeLink,
                    order: video.order,
                    isActive: video.isActive,
                    locale: video.locale as "tr" | "en",
                }} />
            </div>
        </div>
    );
}
