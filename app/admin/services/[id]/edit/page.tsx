import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id: parseInt(id) } });
    if (!service) notFound();

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Hizmeti Düzenle</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <ServiceForm mode="edit" initialData={{
                    id: service.id,
                    title: service.title,
                    shortDescription: service.shortDescription,
                    description: typeof service.description === "string" ? service.description : JSON.stringify(service.description),
                    icon: service.icon,
                    order: service.order,
                    isActive: service.isActive,
                    locale: service.locale as "tr" | "en",
                }} />
            </div>
        </div>
    );
}
