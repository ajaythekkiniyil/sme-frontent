// app/api/chats/route.ts (or [id]/route.ts)
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // FIX: cookies() is now an async function in Next.js 15
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
        }

        const strapiRes = await fetch(`${STRAPI_URL}/api/chats`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const strapiData = await strapiRes.json();

        if (!strapiRes.ok) {
            return NextResponse.json(
                { error: strapiData.error?.message || 'Error from Strapi' },
                { status: strapiRes.status }
            );
        }

        return NextResponse.json(strapiData);

    } catch (error: any) {
        // This will print the actual error in your VS Code terminal
        console.error("API ROUTE ERROR:", error.message);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}