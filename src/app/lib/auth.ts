// /lib/auth.ts
import { cookies } from 'next/headers';
import { cache } from 'react';

const STRAPI_URL = process.env.STRAPI_URL;

// Using React's cache function to memoize the user fetch for a single request
export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!res.ok) return null;

    const user = await res.json();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
});