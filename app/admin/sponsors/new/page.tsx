import { SponsorForm } from "@/components/admin/SponsorForm";
export default function NewSponsorPage() {
    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Yeni Sponsor</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"><SponsorForm mode="create" /></div>
        </div>
    );
}
