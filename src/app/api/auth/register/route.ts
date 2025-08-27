import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  const body = await req.json();

  const { username, email, password, customRole, role } = body;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
  }

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'username and email,password are required' }, { status: 400 });
  }

  try {
    const strapiRes = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, customRole, role }),
    });

    const strapiData = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ error: strapiData.error.message }, { status: strapiData.error.status });
    }

    return NextResponse.json("successfully created new account");

  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}