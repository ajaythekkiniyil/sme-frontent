import Link from "next/link";

export default function AdminHomePage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <p><Link href="/admin/dashboard/home/sme">
                SME
            </Link></p>
            <p><Link href="/admin/dashboard/home/client">
                Client
            </Link></p>
            <p><Link href="/admin/dashboard/home/tickets">
                Tickets
            </Link></p>
        </div>
    )
}
