import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession, updateSession } from '@/lib/auth'
 

export async function middleware(request: NextRequest) {
  const session = await getSession()
  if(session){
    updateSession()
    if(request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/signup'){
      return NextResponse.redirect(new URL('/', request.url))
    }
  }else{
    if(request.nextUrl.pathname != '/login' && request.nextUrl.pathname != '/signup'){
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/', '/login', '/signup']
}