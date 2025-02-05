import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getSession } from '@/lib/auth'
 

export async function middleware(request: NextRequest) {
  console.log(getSession())
}

export const config = {
  matcher: ['/', '/login', '/signup']
}