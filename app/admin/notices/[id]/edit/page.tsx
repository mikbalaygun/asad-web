import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { NoticeForm } from "@/components/admin/NoticeForm";

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const notice = await prisma.notice.findUnique({ where: { id: parseInt(id) } });
    if (!notice) notFound();

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Duyuru Düzenle</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <NoticeForm mode="edit" initialData={{
                    id: notice.id,
                    title: notice.title,
                    content: typeof notice.content === "string" ? notice.content : JSON.stringify(notice.content),
                    priority: notice.priority,
                    startDate: notice.startDate ? new Date(notice.startDate).toISOString().slice(0, 16) : "",
                    endDate: notice.endDate ? new Date(notice.endDate).toISOString().slice(0, 16) : "",
                    isActive: notice.isActive,
                    locale: notice.locale as "tr" | "en",
                }} />
            </div>
        </div>
    );
}
