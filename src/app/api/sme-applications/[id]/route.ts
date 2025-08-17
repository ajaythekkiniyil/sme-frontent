import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {

    try {
        const { id } = await params;

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
        console.error('Error fetching from Strapi:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

// export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {

    // const id = Number(params.id);
    // const body = await req.json();

    // console.log(body, "smeStatus");
    

    // try {

    //     const cookieStore = cookies();
    //     const token = (await cookieStore).get("token")?.value;

    //     if (!token) {
    //         return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    //     }

    //     const strapiRes = await fetch(`${STRAPI_URL}/api/sme-applications/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //         body
    //     });

    //     const strapiData = await strapiRes.json();

    //     if (!strapiRes.ok) {
    //         return NextResponse.json({ error: strapiData.error?.message || 'Error from Strapi' }, {
    //             status: strapiRes.status,
    //         });
    //     }

    //     return NextResponse.json(strapiData);

    // } catch (error) {
    //     console.error('Error fetching from Strapi:', error);
    //     return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    // }


// }
