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

        const strapiRes = await fetch(`${STRAPI_URL}/api/sme-applications/${id}?populate=*`, {
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

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {

    try {
        const { id } = await context.params;
        const body = await req.json();

        const cookieStore = cookies();

        const token = (await cookieStore).get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
        }

        const payload = {
            "data": {
                "smeStatus": body
            }
        }

        const strapiRes = await fetch(`${STRAPI_URL}/api/sme-applications/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
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

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: No token found" },
                { status: 401 }
            );
        }

        const strapiRes = await fetch(
            `${STRAPI_URL}/api/sme-applications/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const strapiData = await strapiRes.json();

        if (!strapiRes.ok) {
            return NextResponse.json(
                {
                    error:
                        strapiData.error?.message ||
                        "Error from Strapi",
                },
                { status: strapiRes.status }
            );
        }

        return NextResponse.json(strapiData);
    } catch (error) {
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}