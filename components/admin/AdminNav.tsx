"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    href: string;
    label: string;
    icon: string;
}

export function AdminNav({ items }: { items: NavItem[] }) {
    const pathname = usePathname();

    return (
        <ul className="space-y-1 px-3">
            {items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${isActive
                                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
