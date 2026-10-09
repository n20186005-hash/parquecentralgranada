import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const APEX_HOST = 'parquecentralgranada.com';
const WWW_HOST = 'www.parquecentralgranada.com';

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // P0: Canonical host is www — redirect the bare apex (preserving path & locale)
  // to the www version. Other hosts (www, workers.dev previews, localhost) are left alone.
  if (host === APEX_HOST) {
    url.host = WWW_HOST;
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
