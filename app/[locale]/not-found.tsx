'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    const isEn = pathname?.startsWith('/en');

    return (
        <div className="min-h-screen flex items-center justify-center bg-ocean-deep relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-ocean-deep via-ocean-navy/50 to-ocean-deep" />

            {/* Animated Blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-cyan/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <div className="relative z-10 text-center px-4">
                <div className="mb-8 relative w-40 h-40 mx-auto animate-float">
                    <span className="text-9xl drop-shadow-2xl">🌊</span>
                </div>

                <h1 className="text-8xl font-bold text-white mb-4 tracking-tighter drop-shadow-lg">404</h1>
                <h2 className="text-2xl text-ocean-cyan mb-8 font-medium">
                    {isEn ? 'Page Lost Underwater' : 'Sayfa Sualtında Kayboldu'}
                </h2>

                <p className="text-white/60 max-w-md mx-auto mb-12 leading-relaxed">
                    {isEn
                        ? 'The page you are looking for might be somewhere deep or may not exist at all. Let\'s get back to the surface.'
                        : 'Aradığınız sayfa derinlerde bir yerlerde olabilir veya hiç var olmamış olabilir. Yüzeye geri dönelim.'
                    }
                </p>

                <Link
                    href={isEn ? '/en' : '/tr'}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-ocean-cyan text-white rounded-xl font-semibold hover:bg-ocean-cyan/90 transition-all hover:scale-105 shadow-lg shadow-ocean-cyan/20"
                >
                    <span>🏠</span>
                    {isEn ? 'Back to Home' : 'Ana Sayfaya Dön'}
                </Link>
            </div>
        </div>
    );
}
