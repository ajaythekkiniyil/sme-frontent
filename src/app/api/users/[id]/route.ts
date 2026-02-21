import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const cookieStore = cookies();
        const { id } = await params;

        const token = (await cookieStore).get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
        }

        const strapiRes = await fetch(`${STRAPI_URL}/api/users/${id}`, {
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

        // Strapi typically returns { data: userObject, meta: {...} }
        return NextResponse.json(strapiData.data || strapiData);

    } catch (error) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}