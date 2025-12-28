import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id: parseInt(id) } });
    if (!project) notFound();

    return (
        <div>
            <div className="mb-8"><h1 className="text-3xl font-bold text-white">Projeyi Düzenle</h1><p className="text-slate-400">{project.title}</p></div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <ProjectForm mode="edit" initialData={{
                    id: project.id,
                    title: project.title,
                    excerpt: project.excerpt,
                    content: typeof project.content === "string" ? project.content : JSON.stringify(project.content),
                    category: project.category,
                    coverImage: project.coverImage,
                    publishedTime: new Date(project.publishedTime).toISOString().slice(0, 16),
                    isActive: project.isActive,
                    locale: project.locale as "tr" | "en",
                }} />
            </div>
        </div>
    );
}
