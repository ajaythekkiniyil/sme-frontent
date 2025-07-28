export default function AdminSMEPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">SME Views</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard title="Users" value="125" />
                <DashboardCard title="Posts" value="87" />
                <DashboardCard title="Revenue" value="$4,200" />
            </div>
        </div>
    )
}

function DashboardCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-3xl font-bold text-blue-600">{value}</p>
        </div>
    )
}
