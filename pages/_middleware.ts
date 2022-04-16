/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (process.env.NODE_ENV === 'production' && pathname === '/') {
    return NextResponse.redirect('/coming-soon');
  }
  return NextResponse.next();
}
