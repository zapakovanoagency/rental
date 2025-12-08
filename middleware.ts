import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Перевіряємо чи користувач намагається зайти на /admin/dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // Перевіряємо наявність cookie з сесією
    const session = request.cookies.get('admin-session');
    
    if (!session) {
      // Якщо немає сесії - редіректимо на сторінку входу
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/dashboard/:path*',
};
