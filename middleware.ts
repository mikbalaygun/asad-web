import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const locales = ['tr', 'en'] as const;
const defaultLocale = 'tr';

function preferred(req: NextRequest) {
  const h = req.headers.get('accept-language') || '';
  const first = h.split(',')[0]?.toLowerCase() || '';
  if (first.startsWith('en')) return 'en';
  if (first.startsWith('tr')) return 'tr';
  return defaultLocale;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    if (!req.auth) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Locale handling for public routes
  if (locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  if (pathname === '/' || pathname === '') {
    const loc = preferred(req);
    return NextResponse.redirect(new URL(`/${loc}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|textures|public|api).*)'],
};
