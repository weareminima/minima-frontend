/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === '/') {
    return NextResponse.redirect('/coming-soon');
  }
  return NextResponse.next();
}
