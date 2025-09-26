
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@/lib/firebase/adminApp';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('__session')?.value;

  // Define protected routes
  const protectedRoutes = ['/account', '/learn', '/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(url);
  }

  try {
    const auth = getAuth();
    await auth.verifySessionCookie(sessionCookie, true);
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware auth error:', error);
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect_to', pathname);
    // Clear the invalid cookie
    const response = NextResponse.redirect(url);
    response.cookies.delete('__session');
    return response;
  }
}

export const config = {
  matcher: ['/account/:path*', '/learn/:path*', '/dashboard/:path*'],
};
