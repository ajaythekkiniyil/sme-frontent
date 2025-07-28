// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;  

//   // If no token exists and the user is trying to access a protected route, redirect to login
//   if (!token && request.nextUrl.pathname.startsWith('/admin-dashboard')) {
//     const loginUrl = new URL('/admin-login', request.url);
//     loginUrl.searchParams.set('from', request.nextUrl.pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // If a token exists and the user is trying to access login page, redirect to dashboard
//   if (token && request.nextUrl.pathname === '/admin-login') {
//      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin-dashboard/:path*', '/login'],
// };