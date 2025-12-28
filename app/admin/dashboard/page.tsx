import { auth } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default async function DashboardPage() {
    const session = await auth();

    // İstatistikleri ve son içerikleri çek
    const [
        newsCount, articlesCount, projectsCount, servicesCount, noticesCount, sponsorsCount,
        boardMembersCount, photosCount, popupsCount,
        recentNews, recentProjects, recentNotices
    ] = await Promise.all([
        prisma.news.count({ where: { parentId: null } }),
        prisma.article.count({ where: { parentId: null } }),
        prisma.project.count({ where: { parentId: null } }),
        prisma.service.count({ where: { parentId: null } }),
        prisma.notice.count({ where: { parentId: null } }),
        prisma.sponsor.count(),
        prisma.boardMember.count(),
        prisma.photoGallery.count(),
        prisma.popup.count({ where: { parentId: null } }),
        prisma.news.findMany({ where: { parentId: null }, orderBy: { createdAt: "desc" }, take: 5, include: { localizations: true } }),
        prisma.project.findMany({ where: { parentId: null }, orderBy: { createdAt: "desc" }, take: 3 }),
        prisma.notice.findMany({ where: { parentId: null, isActive: true }, orderBy: { priority: "desc" }, take: 3 }),
    ]);

    const stats = [
        { label: "Haberler", count: newsCount, href: "/admin/news", icon: "📰", color: "from-blue-500 to-blue-600" },
        { label: "Makaleler", count: articlesCount, href: "/admin/articles", icon: "📝", color: "from-purple-500 to-purple-600" },
        { label: "Projeler", count: projectsCount, href: "/admin/projects", icon: "🚀", color: "from-green-500 to-green-600" },
        { label: "Hizmetler", count: servicesCount, href: "/admin/services", icon: "⚡", color: "from-yellow-500 to-yellow-600" },
        { label: "Duyurular", count: noticesCount, href: "/admin/notices", icon: "📢", color: "from-red-500 to-red-600" },
        { label: "Popup'lar", count: popupsCount, href: "/admin/popups", icon: "🔔", color: "from-orange-500 to-orange-600" },
        { label: "Yönetim K.", count: boardMembersCount, href: "/admin/board-members", icon: "👥", color: "from-cyan-500 to-cyan-600" },
        { label: "Fotoğraflar", count: photosCount, href: "/admin/photo-gallery", icon: "📷", color: "from-pink-500 to-pink-600" },
        { label: "Sponsorlar", count: sponsorsCount, href: "/admin/sponsors", icon: "🤝", color: "from-indigo-500 to-indigo-600" },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Hoş Geldiniz, {session?.user?.name || "Admin"}! 👋</h1>
                <p className="text-slate-400">ASAD Admin Paneline hoş geldiniz. Buradan tüm içerikleri yönetebilirsiniz.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {stats.map((stat) => (
                    <Link key={stat.href} href={stat.href} className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl p-4 transition-all hover:border-slate-600">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{stat.icon}</span>
                            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                                {stat.count}
                            </div>
                        </div>
                        <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">{stat.label}</h3>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Son Haberler */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">📰 Son Haberler</h2>
                        <Link href="/admin/news" className="text-blue-400 text-sm hover:underline">Tümü →</Link>
                    </div>
                    <div className="space-y-3">
                        {recentNews.length === 0 ? (
                            <p className="text-slate-400 text-sm">Henüz haber yok</p>
                        ) : recentNews.map((item) => (
                            <Link key={item.id} href={`/admin/news/${item.id}/edit`} className="block p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                                <p className="text-white text-sm font-medium truncate">{item.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-slate-400 text-xs">{format(new Date(item.createdAt), "dd MMM", { locale: tr })}</span>
                                    <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">TR</span>
                                    {item.localizations.length > 0 && <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">EN</span>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Son Projeler */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">🚀 Son Projeler</h2>
                        <Link href="/admin/projects" className="text-blue-400 text-sm hover:underline">Tümü →</Link>
                    </div>
                    <div className="space-y-3">
                        {recentProjects.length === 0 ? (
                            <p className="text-slate-400 text-sm">Henüz proje yok</p>
                        ) : recentProjects.map((item) => (
                            <Link key={item.id} href={`/admin/projects/${item.id}/edit`} className="block p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                                <p className="text-white text-sm font-medium truncate">{item.title}</p>
                                <span className="text-slate-400 text-xs">{item.category}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Aktif Duyurular */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">📢 Aktif Duyurular</h2>
                        <Link href="/admin/notices" className="text-blue-400 text-sm hover:underline">Tümü →</Link>
                    </div>
                    <div className="space-y-3">
                        {recentNotices.length === 0 ? (
                            <p className="text-slate-400 text-sm">Aktif duyuru yok</p>
                        ) : recentNotices.map((item) => (
                            <Link key={item.id} href={`/admin/notices/${item.id}/edit`} className="block p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                                <p className="text-white text-sm font-medium truncate">{item.title}</p>
                                <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs">Öncelik: {item.priority}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">⚡ Hızlı İşlemler</h2>
                <div className="flex flex-wrap gap-3">
                    <Link href="/admin/news/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <span>➕</span> Yeni Haber
                    </Link>
                    <Link href="/admin/articles/new" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <span>➕</span> Yeni Makale
                    </Link>
                    <Link href="/admin/projects/new" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <span>➕</span> Yeni Proje
                    </Link>
                    <Link href="/admin/notices/new" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <span>➕</span> Yeni Duyuru
                    </Link>
                    <Link href="/admin/photo-gallery/new" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <span>📷</span> Fotoğraf Ekle
                    </Link>
                    <Link href="/admin/popups/new" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <span>🔔</span> Yeni Popup
                    </Link>
                </div>
            </div>
        </div>
    );
}
