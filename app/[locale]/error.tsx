'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const pathname = usePathname();
    const isEn = pathname?.startsWith('/en');

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-ocean-deep relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-ocean-deep via-ocean-navy/50 to-ocean-deep" />

            {/* Animated Blobs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <div className="relative z-10 text-center px-4">
                <div className="mb-8 relative w-40 h-40 mx-auto animate-float">
                    <span className="text-9xl drop-shadow-2xl">⚠️</span>
                </div>

                <h1 className="text-8xl font-bold text-white mb-4 tracking-tighter drop-shadow-lg">500</h1>
                <h2 className="text-2xl text-ocean-cyan mb-8 font-medium">
                    {isEn ? 'System Malfunction' : 'Sistem Arızası'}
                </h2>

                <p className="text-white/60 max-w-md mx-auto mb-12 leading-relaxed">
                    {isEn
                        ? 'Something went wrong in the depths. We are investigating the issue.'
                        : 'Derinlerde bir şeyler ters gitti. Sorunu inceliyoruz.'
                    }
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
                    >
                        {isEn ? 'Try Again' : 'Tekrar Dene'}
                    </button>
                    <Link
                        href={isEn ? '/en' : '/tr'}
                        className="px-8 py-4 bg-ocean-cyan text-white rounded-xl font-semibold hover:bg-ocean-cyan/90 transition-all shadow-lg shadow-ocean-cyan/20"
                    >
                        {isEn ? 'Back to Home' : 'Ana Sayfaya Dön'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
