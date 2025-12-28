import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function AdminSponsorsPage() {
    const sponsors = await prisma.sponsor.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Sponsorlar</h1>
                <Link href="/admin/sponsors/new"><Button><span>➕</span> Yeni Sponsor</Button></Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sponsors.length === 0 ? (
                    <p className="text-slate-400 col-span-4 text-center py-12">Henüz sponsor yok.</p>
                ) : sponsors.map((s) => (
                    <div key={s.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
                        {s.logo ? (
                            <img src={s.logo} alt={s.name} className="h-16 mx-auto mb-3 object-contain" />
                        ) : (
                            <div className="h-16 flex items-center justify-center text-2xl mb-3">🏢</div>
                        )}
                        <p className="font-medium text-white">{s.name}</p>
                        <div className="flex justify-center gap-2 mt-3">
                            <Link href={`/admin/sponsors/${s.id}/edit`} className="text-blue-400 text-sm hover:underline">Düzenle</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
