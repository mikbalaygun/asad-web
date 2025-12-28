import "@/app/globals.css";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
    title: "ASAD Admin Panel",
    description: "ASAD Admin Panel - İçerik Yönetim Sistemi",
};

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/admin/news", label: "Haberler", icon: "📰" },
    { href: "/admin/articles", label: "Makaleler", icon: "📝" },
    { href: "/admin/projects", label: "Projeler", icon: "🚀" },
    { href: "/admin/services", label: "Hizmetler", icon: "⚡" },
    { href: "/admin/notices", label: "Duyurular", icon: "📢" },
    { href: "/admin/popups", label: "Popup'lar", icon: "🔔" },
    { href: "/admin/board-members", label: "Yönetim Kurulu", icon: "👥" },
    { href: "/admin/audit-board", label: "Denetim Kurulu", icon: "🔍" },
    { href: "/admin/photo-gallery", label: "Fotoğraf Galerisi", icon: "📷" },
    { href: "/admin/video-gallery", label: "Video Galerisi", icon: "🎥" },
    { href: "/admin/sponsors", label: "Sponsorlar", icon: "🤝" },
    { href: "/admin/president", label: "Başkan", icon: "👔" },
    { href: "/admin/representative", label: "Temsilci", icon: "🎖️" },
    { href: "/admin/contact", label: "İletişim", icon: "📞" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session) redirect("/login");

    return (
        <html lang="tr">
            <body className="bg-slate-900 text-white antialiased">
                <div className="min-h-screen flex">
                    {/* Sidebar */}
                    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
                        {/* Logo */}
                        <div className="p-6 border-b border-slate-700">
                            <Link href="/admin/dashboard" className="flex items-center gap-3">
                                <div className="relative w-10 h-10">
                                    <Image
                                        src="/hero/logo-1.png"
                                        alt="ASAD Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <span className="text-white font-semibold text-lg">ASAD</span>
                                    <span className="block text-slate-400 text-xs">Admin Panel</span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 py-4 overflow-y-auto">
                            <AdminNav items={navItems} />
                        </nav>

                        {/* User Info & Logout */}
                        <div className="p-4 border-t border-slate-700">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {session.user?.name?.[0] || session.user?.email?.[0]?.toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">{session.user?.name || "Admin"}</p>
                                    <p className="text-slate-400 text-xs truncate">{session.user?.email}</p>
                                </div>
                            </div>
                            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
                                <button type="submit" className="w-full px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors flex items-center gap-2">
                                    <span>🚪</span> Çıkış Yap
                                </button>
                            </form>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto">
                        <div className="p-8">{children}</div>
                    </main>
                </div>
            </body>
        </html>
    );
}
