import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
  '/agency',
  '/',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // If not user
    if (!auth().userId) return auth().redirectToSignIn();
    console.log(auth().userId);
  }

  // rewrite [domains]
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  let hostname = req.headers;

  const pathWithSearchParams = `${url.pathname}${
    searchParams ? `?${searchParams}` : ''
  }`;

  // if subdomain exists
  const customSubDomain = hostname
    .get('host')
    ?.split(`.${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  // console.log(customSubDomain)
  // console.log(pathWithSearchParams)

  if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
  }

  // '/'
  if (url.pathname === '/' && url.host === process.env.NEXT_PUBLIC_DOMAIN) {
    console.log('redirecting to site');

    return NextResponse.redirect(new URL(`/site`, req.url));
  }

  if (
    url.pathname.startsWith('/agency') ||
    url.pathname.startsWith('/subaccount')
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
