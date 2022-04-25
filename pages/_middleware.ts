/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && pathname === '/') {
    return NextResponse.redirect('/coming-soon');
  }
  return NextResponse.next();
}
