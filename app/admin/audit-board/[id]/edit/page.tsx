import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { AuditMemberForm } from "@/components/admin/AuditMemberForm";

export default async function EditAuditMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const member = await prisma.auditBoardMember.findUnique({ where: { id: parseInt(id) } });
    if (!member) notFound();

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Üye Düzenle</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <AuditMemberForm mode="edit" initialData={{
                    id: member.id,
                    firstName: member.firstName,
                    lastName: member.lastName,
                    role: member.role,
                    photo: member.photo,
                    order: member.order,
                    isActive: member.isActive,
                }} />
            </div>
        </div>
    );
}
