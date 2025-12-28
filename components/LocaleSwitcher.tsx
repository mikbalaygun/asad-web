'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function detectLocaleFromPath(path: string): 'tr' | 'en' {
  if (path.startsWith('/en')) return 'en';
  return 'tr'; // default
}

// Check if current path is a detail page (has more than 2 segments like /tr/haberler/slug)
function isDetailPage(path: string): boolean {
  // Gallery pages are exceptions, they should show locale switcher
  if (path.includes('/galeri/')) return false;

  const segments = path.split('/').filter(Boolean);
  // More than 2 segments means it's a detail page (e.g., /tr/haberler/my-slug)
  return segments.length > 2;
}

function buildToggledHref(
  path: string,
  search: string | null
): { href: string; nextLocale: 'tr' | 'en' } {
  const current = detectLocaleFromPath(path);
  const target: 'tr' | 'en' = current === 'tr' ? 'en' : 'tr';

  let next = path;
  if (path.startsWith('/tr')) next = path.replace(/^\/tr\b/, '/en');
  else if (path.startsWith('/en')) next = path.replace(/^\/en\b/, '/tr');
  else next = `/${target}${path.startsWith('/') ? '' : '/'}${path}`; // safety

  if (search && search.length > 0) next += `?${search}`;

  return { href: next, nextLocale: target };
}

export default function LocaleSwitcher() {
  const pathname = usePathname() || '/tr';
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? null;

  // Hide on detail pages to prevent 404 errors
  if (isDetailPage(pathname)) {
    return null;
  }

  const { href, nextLocale } = buildToggledHref(pathname, search);

  return (
    <Link
      href={href}
      prefetch
      className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-all"
      aria-label="Switch language"
    >
      {nextLocale === 'en' ? '🇬🇧 EN' : '🇹🇷 TR'}
    </Link>
  );
}
