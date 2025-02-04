import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
 
function validateJwt(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN ?? '');
    return true;
  } catch (error) {
    return false;
  }
}

export function middleware(request: NextRequest) {
//   const url = request.nextUrl.pathname

//   const token = request.cookies.get('auth_token')?.value || request.headers.get('authorization')

//   const validation: boolean = validateJwt(token)

//   if(validation && (url == '/login' || url == '/signup')){
//     return NextResponse.redirect(new URL('/', request.url))
//   }
//   if(!validation && !(url == '/login' || url == '/signup')){
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
}

export const config = {
  matcher: ['/', '/login', '/signup']
}