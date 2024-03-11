import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Get a cookie
  const xxx = req.cookies.get('clikedId');
  console.log(xxx);
  // Get all cookies
  // req.cookies.getAll();

  // To change a cookie, first create a response
  const response = NextResponse.next();

  // Set a cookie
  // response.cookies.set('myCookieName', 'some-value');

  // // Setting a cookie with additional options
  // response.cookies.set({
  //   name: 'myCookieName',
  //   value: 'some-value',
  //   httpOnly: true,
  // });

  // Delete a cookie
  // response.cookies.delete('myCookieName');

  return response;
}

export const config = {
  matcher: '/',
};
