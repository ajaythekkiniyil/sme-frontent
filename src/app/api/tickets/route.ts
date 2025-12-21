import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();

    const token = (await cookieStore).get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    }

    const strapiRes = await fetch(`${STRAPI_URL}/api/tickets`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const strapiData = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ error: strapiData.error?.message || 'Error from Strapi' }, {
        status: strapiRes.status,
      });
    }    

    return NextResponse.json(strapiData);

  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  const body = await req.json();  
  try {
    const cookieStore = cookies();

    const token = (await cookieStore).get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    }

    const strapiRes = await fetch(`${STRAPI_URL}/api/tickets`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const strapiData = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ error: strapiData.error?.message || 'Error from Strapi' }, {
        status: strapiRes.status,
      });
    }

    return NextResponse.json(strapiData);

  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}