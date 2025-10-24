import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['tr','en'] as const;
const defaultLocale = 'tr';

function preferred(req: NextRequest){
  const h = req.headers.get('accept-language') || '';
  const first = h.split(',')[0]?.toLowerCase() || '';
  if (first.startsWith('en')) return 'en';
  if (first.startsWith('tr')) return 'tr';
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }
  if (pathname === '/' || pathname === '') {
    const loc = preferred(req);
    return NextResponse.redirect(new URL(`/${loc}`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|textures|public).*)'],
};
