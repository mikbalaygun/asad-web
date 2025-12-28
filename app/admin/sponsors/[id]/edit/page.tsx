import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { SponsorForm } from "@/components/admin/SponsorForm";

export default async function EditSponsorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const sponsor = await prisma.sponsor.findUnique({ where: { id: parseInt(id) } });
    if (!sponsor) notFound();

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Sponsor Düzenle</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <SponsorForm mode="edit" initialData={{
                    id: sponsor.id,
                    name: sponsor.name,
                    logo: sponsor.logo,
                    isActive: sponsor.isActive,
                    locale: sponsor.locale as "tr" | "en",
                }} />
            </div>
        </div>
    );
}
