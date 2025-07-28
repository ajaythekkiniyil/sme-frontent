import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.STRAPI_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { identifier, password } = body;

  if (!identifier || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    const strapiRes = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    const strapiData = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ error: strapiData.error.message }, { status: strapiData.error.status });
    }

    // Set the token in an HTTP-Only cookie
    (await cookies()).set('token', strapiData.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
      path: '/',
    });

    return NextResponse.json({ user: strapiData.user });

  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}