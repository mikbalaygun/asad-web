'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function detectLocaleFromPath(path: string): 'tr' | 'en' {
  if (path.startsWith('/en')) return 'en';
  return 'tr'; // default
}

function buildToggledHref(
  path: string,
  search: string | null,
  hash: string | null
): { href: string; nextLocale: 'tr' | 'en' } {
  const current = detectLocaleFromPath(path);
  const target: 'tr' | 'en' = current === 'tr' ? 'en' : 'tr';

  let next = path;
  if (path.startsWith('/tr')) next = path.replace(/^\/tr\b/, '/en');
  else if (path.startsWith('/en')) next = path.replace(/^\/en\b/, '/tr');
  else next = `/${target}${path.startsWith('/') ? '' : '/'}${path}`; // safety

  if (search && search.length > 0) next += `?${search}`;
  if (hash && hash.length > 0) next += `#${hash}`;

  return { href: next, nextLocale: target };
}

export default function LocaleSwitcher() {
  const pathname = usePathname() || '/tr';
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? null;
  // hash Next.js'te doğrudan yok; istersen window.location.hash okuyabilirsin:
  const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : null;

  const { href, nextLocale } = buildToggledHref(pathname, search, hash);

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
