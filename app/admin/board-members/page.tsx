import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function AdminBoardMembersPage() {
    const members = await prisma.boardMember.findMany({ orderBy: { order: "asc" } });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Yönetim Kurulu</h1>
                <Link href="/admin/board-members/new"><Button><span>➕</span> Yeni Üye</Button></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.length === 0 ? (
                    <p className="text-slate-400 col-span-3 text-center py-12">Henüz üye eklenmedi.</p>
                ) : members.map((m) => (
                    <div key={m.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                {m.firstName[0]}{m.lastName[0]}
                            </div>
                            <div>
                                <p className="font-semibold text-white">{m.firstName} {m.lastName}</p>
                                <p className="text-slate-400 text-sm">{m.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={m.isActive ? "text-green-400 text-sm" : "text-red-400 text-sm"}>{m.isActive ? "Aktif" : "Pasif"}</span>
                            <Link href={`/admin/board-members/${m.id}/edit`} className="text-blue-400 hover:underline text-sm">Düzenle</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
