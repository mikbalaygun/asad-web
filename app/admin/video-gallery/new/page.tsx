import { VideoForm } from "@/components/admin/VideoForm";
export default function NewVideoPage() {
    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Yeni Video</h1></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"><VideoForm mode="create" /></div>
        </div>
    );
}
