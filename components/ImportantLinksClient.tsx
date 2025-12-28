"use client";

import Image from "next/image";
import Link from "next/link";

interface ImportantLink {
    id: number;
    title: string;
    url: string;
    logo: string;
    bgClass?: string; // Optional custom background class
}

const links: ImportantLink[] = [
    {
        id: 1,
        title: "Ufuk Avrupa",
        url: "https://ufukavrupa.org.tr",
        logo: "/links/ufuk-logo.svg",
    },
    {
        id: 2,
        title: "DERBİS",
        url: "https://derbis.dernekler.gov.tr",
        logo: "/links/derbis-logo.png",
    },
    {
        id: 3,
        title: "Sivil Toplum",
        url: "https://siviltoplum.gov.tr",
        logo: "/links/sivil-logo.png",
        bgClass: "bg-ocean-deep/80", // Dark background for white logo
    },
    {
        id: 4,
        title: "DAKA",
        url: "https://daka.org.tr",
        logo: "/links/daka-logo.png",
    },
];

export default function ImportantLinksClient({ locale }: { locale: string }) {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/news/news-4.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 via-ocean-deep/80 to-ocean-deep" />
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
                        <Link href={`/${locale}`} className="hover:text-ocean-cyan transition-colors">
                            {locale === "tr" ? "Ana Sayfa" : "Home"}
                        </Link>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-white/90">
                            {locale === "tr" ? "Önemli Linkler" : "Important Links"}
                        </span>
                    </div>

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {locale === "tr" ? "Önemli Linkler" : "Important Links"}
                        </h1>
                        <p className="text-lg text-white/70">
                            {locale === "tr"
                                ? "Sektörle ilgili önemli kurum ve kuruluşların bağlantıları."
                                : "Links to important institutions and organizations related to the sector."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Links Grid */}
            <section className="relative py-16">
                <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep to-mid" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {links.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block"
                            >
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-ocean-cyan/30 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:-translate-y-1 group-hover:shadow-xl">
                                    <div className={`relative w-32 h-32 mb-6 rounded-xl p-4 flex items-center justify-center ${link.bgClass || "bg-white"}`}>
                                        <Image
                                            src={link.logo}
                                            alt={link.title}
                                            width={100}
                                            height={100}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-ocean-cyan transition-colors">
                                        {link.title}
                                    </h3>
                                    <div className="mt-4 text-ocean-cyan/60 text-sm flex items-center gap-1 group-hover:text-ocean-cyan transition-colors">
                                        <span>{locale === "tr" ? "Ziyaret Et" : "Visit"}</span>
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
