import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();    

  // If no user is logged in, or the user is not an Sme, redirect
  if (!user || user?.customRole !== 'user') {
    redirect('/user/login');
  }

  return <>{children}</>;
}