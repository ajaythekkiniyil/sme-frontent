import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  try {
    const { id } = await context.params;

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    }

    const strapiRes = await fetch(`${STRAPI_URL}/api/tickets/${id}?populate=*`, {
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

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {

  try {
    const { id } = await context.params;
    const body = await req.json();

    const cookieStore = cookies();

    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    }

    const strapiRes = await fetch(`${STRAPI_URL}/api/tickets/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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