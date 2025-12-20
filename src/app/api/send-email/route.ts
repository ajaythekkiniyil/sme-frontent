import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function POST(req: NextRequest) {
    if (!STRAPI_URL) {
        return NextResponse.json({ error: 'STRAPI_URL is not configured' }, { status: 500 });
    }

    try {
        // 1. Authorization: Retrieve the token from secure cookies
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        if (!token) {
            // Deny request if the user is not authenticated
            return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
        }

        // 2. Read the request body from the client
        const data = await req.json();        

        // 3. Forward the request securely to Strapi
        const strapiRes = await fetch(`${STRAPI_URL}/api/sme-application/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Pass the authentication token to Strapi (if Strapi's /smes/invite requires auth)
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const strapiData = await strapiRes.json();

        // 4. Handle Strapi's response
        if (!strapiRes.ok) {
            return NextResponse.json({
                error: strapiData.error?.message || 'Failed to trigger email dispatch from Strapi'
            }, {
                status: strapiRes.status,
            });
        }

        // 5. Return success response to the client
        return NextResponse.json(strapiData);

    } catch (error) {
        return NextResponse.json({ error: 'An unexpected server error occurred during email dispatch.' }, { status: 500 });
    }
}