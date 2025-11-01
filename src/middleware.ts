// @/src/middleware.ts

export { default } from 'next-auth/middleware'
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Token } from '@/types/auth'

export async function middleware(req: NextRequest) {
  const token: Token | null = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log('token: ', token)
  const { pathname } = req.nextUrl

  if (
    (pathname.startsWith('/admin') && !token) ||
    (pathname.startsWith('/teacher') && !token) ||
    (pathname.startsWith('/student') && !token)
  ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (pathname.startsWith('/login') && token) {
    // Admins
    if (['SUPERADMIN', 'ADMIN'].includes(token.role)) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }

    // Teachers
    if (['TEACHER'].includes(token.role)) {
      return NextResponse.redirect(new URL('/teacher/dashboard', req.url))
    }

    // STudents
    if (['STUDENT'].includes(token.role)) {
      return NextResponse.redirect(new URL('/student/dashboard', req.url))
    }
    return NextResponse.redirect(new URL('/user', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/app/:path*', // Add api routes here?
  ],
}
