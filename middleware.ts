import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value

  // Check if path requires authentication
  if (['/songs', '/dashboard', '/user'].some(route => path.startsWith(route))) {
    // Redirect to login if no token
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const decoded = await verifyToken(token)

      // Admin has access to everything
      if (decoded.isAdmin) {
        return NextResponse.next()
      }

      // Route-specific permissions
      if (path.startsWith('/songs')) {
        return NextResponse.next()
      }

      if (path.startsWith('/user')) {
        // Both teachers and students can access /user routes
        if (decoded.role === 'teacher' || decoded.role === 'student') {
          return NextResponse.next()
        }
      }

      if (path.startsWith('/dashboard')) {
        // Only teachers can access dashboard
        if (decoded.role === 'teacher') {
          return NextResponse.next()
        }
      }

      // If none of the above conditions match, redirect to home
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/songs/:path*', '/dashboard/:path*', '/user/:path*']
}
