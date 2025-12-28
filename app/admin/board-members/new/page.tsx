import { BoardMemberForm } from "@/components/admin/BoardMemberForm";
export default function NewBoardMemberPage() {
    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Yeni Yönetim Kurulu Üyesi</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"><BoardMemberForm mode="create" /></div>
        </div>
    );
}
