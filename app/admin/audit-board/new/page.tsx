import { AuditMemberForm } from "@/components/admin/AuditMemberForm";
export default function NewAuditMemberPage() {
    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Yeni Denetim Kurulu Üyesi</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"><AuditMemberForm mode="create" /></div>
        </div>
    );
}
