import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
 
function validateJwt(token: string): boolean {
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_TOKEN ?? '');
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const url = request.nextUrl.pathname

    const token = cookieStore.get('tokentest')?.value ?? ''
    console.log(token)
    const validation: boolean = validateJwt(token)
    console.log(validation)
    if(validation && (url == '/login' || url == '/signup')){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(!validation && !(url == '/login' || url == '/signup')){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
  matcher: ['/', '/login', '/signup']
}