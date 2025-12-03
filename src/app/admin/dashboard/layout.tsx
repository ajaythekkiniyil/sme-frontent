import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();  

  // If no user is logged in, or the user is not an Admin, redirect
  // if (!user || user?.customRole !== 'admin') {
  //   redirect('/admin/login');
  // }

  return <>{children}</>;
}