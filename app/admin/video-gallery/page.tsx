import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

function getYoutubeThumbnail(url: string): string {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : "";
}

export default async function AdminVideoGalleryPage() {
    const videos = await prisma.videoGallery.findMany({ orderBy: { order: "asc" } });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-3xl font-bold text-white">Video Galerisi</h1></div>
                <Link href="/admin/video-gallery/new"><Button><span>➕</span> Yeni Video</Button></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.length === 0 ? (
                    <p className="text-slate-400 col-span-3 text-center py-12">Henüz video yok.</p>
                ) : videos.map((v) => {
                    const thumbnail = v.thumbnail || getYoutubeThumbnail(v.youtubeLink);
                    return (
                        <div key={v.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden group">
                            <div className="relative aspect-video">
                                {thumbnail ? (
                                    <img src={thumbnail} alt={v.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-4xl">🎥</div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <a href={v.youtubeLink} target="_blank" rel="noopener" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm mr-2">▶ İzle</a>
                                    <Link href={`/admin/video-gallery/${v.id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Düzenle</Link>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="font-medium text-white truncate">{v.title}</p>
                                <div className="flex items-center justify-between mt-2 text-sm">
                                    <span className="text-slate-400">{v.category}</span>
                                    <span className={v.isActive ? "text-green-400" : "text-red-400"}>{v.isActive ? "Aktif" : "Pasif"}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
