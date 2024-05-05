import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@auth0/nextjs-auth0/edge';

export async function middleware(req: NextRequest) {

  // Proxy for the backend
  if (req.nextUrl.pathname.startsWith('/api/') && !req.nextUrl.pathname.startsWith('/api/auth/')) {

    const url = new URL(req.url)
    url.host = String(process.env.BACKEND_HOST)

    const method = req.method

    let headers = new Headers(req.headers)
    if (req.nextUrl.pathname.startsWith('/api/private/')) {
      const res = new NextResponse();
      const { accessToken } = await getAccessToken(req,res);
      headers.append('Authorization', `Bearer ${accessToken}`)
    }

    let body = req.body;

    const response = await fetch(url.toString(), {
      method: method,
      headers: headers,
      body: body
    })
    return new NextResponse(response.body, response)

  }
}