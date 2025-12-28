import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default async function AdminPhotoGalleryPage() {
    const photos = await prisma.photoGallery.findMany({ orderBy: { publishedDate: "desc" } });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-3xl font-bold text-white">Fotoğraf Galerisi</h1></div>
                <Link href="/admin/photo-gallery/new"><Button><span>➕</span> Yeni Fotoğraf</Button></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {photos.length === 0 ? (
                    <p className="text-slate-400 col-span-4 text-center py-12">Henüz fotoğraf yok.</p>
                ) : photos.map((p) => (
                    <div key={p.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden group">
                        <div className="relative aspect-square">
                            <Image
                                src={p.image}
                                alt={p.alternativeText || p.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Link href={`/admin/photo-gallery/${p.id}/edit`} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">Düzenle</Link>
                            </div>
                            {!p.isActive && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-red-500/80 text-white text-xs rounded">Pasif</div>
                            )}
                        </div>
                        <div className="p-3">
                            <p className="text-sm font-medium text-white truncate">{p.title}</p>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-slate-400">{p.category || "Genel"}</span>
                                <span className="text-xs text-slate-500">{format(new Date(p.publishedDate), "dd MMM", { locale: tr })}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
