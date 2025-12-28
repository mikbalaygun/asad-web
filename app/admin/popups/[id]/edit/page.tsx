import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PopupForm } from "@/components/admin/PopupForm";

export default async function EditPopupPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const popup = await prisma.popup.findUnique({ where: { id: parseInt(id) } });
    if (!popup) notFound();

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Popup Düzenle</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <PopupForm mode="edit" initialData={{
                    id: popup.id,
                    title: popup.title,
                    image: popup.image,
                    mobileImage: popup.mobileImage,
                    linkUrl: popup.linkUrl || "",
                    linkText: popup.linkText || "",
                    priority: popup.priority,
                    startDate: popup.startDate ? new Date(popup.startDate).toISOString().slice(0, 16) : "",
                    endDate: popup.endDate ? new Date(popup.endDate).toISOString().slice(0, 16) : "",
                    displayFrequency: popup.displayFrequency,
                    isActive: popup.isActive,
                    locale: popup.locale as "tr" | "en",
                }} />
            </div>
        </div>
    );
}
