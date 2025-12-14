"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Users,
    Briefcase,
    Ticket,
    LayoutDashboard,
    LogOut,
    Bell,
    Search,
    Menu,
    X
} from "lucide-react";
import { useSme } from "@/app/hooks/getSme";

export default function AdminHomePage() {
    const { data: smeData, isLoading } = useSme();
    
    // State to manage the visibility of the sidebar on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        // 1. Main Container: Takes full viewport height, flexible row layout
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* 2. Sidebar: Fixed width, dark theme, conditionally rendered */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:flex md:translate-x-0` // Show on md screens and up, regardless of state
                }
            >
                {/* Logo Area */}
                <div className="flex items-center gap-2 h-16 px-6 border-b border-slate-800">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="text-white font-semibold text-lg tracking-wide">AdminPanel</span>

                    {/* Close Button for Mobile Sidebar */}
                    <button
                        className="md:hidden ml-auto text-slate-400 hover:text-white"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                        Main Menu
                    </p>

                    <NavItem href="/admin/dashboard/home" icon={<LayoutDashboard size={20} />} label="Overview" active onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/admin/dashboard/home/sme" icon={<Users size={20} />} label="SME Portal" onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/admin/dashboard/home/client" icon={<Briefcase size={20} />} label="Clients" onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/admin/dashboard/home/tickets" icon={<Ticket size={20} />} label="Tickets" onClick={() => setIsSidebarOpen(false)} />
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* 2.5. Mobile Overlay (visible when sidebar is open) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}

            {/* 3. Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Header */}
                <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm z-30">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle Button */}
                        <button
                            className="md:hidden text-gray-500 hover:text-gray-700"
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">Dashboard Overview</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Added Search Bar for better responsiveness example */}
                        {/* <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm">
                            <Search size={16} className="text-gray-400 mr-2" />
                            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-24 sm:w-48 text-gray-700 placeholder-gray-400" />
                        </div> */}

                        {/* User Profile - Uncommented for completeness */}
                        {/* <div className="flex items-center gap-3 pl-0 sm:pl-6 sm:border-l border-gray-200">
                            <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                AD
                            </div>
                        </div> */}
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">

                    {/* The 3 Main Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                        {/* SME Card */}
                        <DashboardCard
                            title="SME Portal"
                            value={smeData?.data?.length + ' Active'}
                            desc="Manage subject experts"
                            href="/admin/dashboard/home/sme"
                            icon={<Users className="text-white" size={24} />}
                            color="bg-blue-600"
                            trend="+2.5% this week"
                        />

                        {/* Client Card */}
                        <DashboardCard
                            title="Clients"
                            value="0 Accounts"
                            desc="Client database access"
                            href="/admin/dashboard/home/client"
                            icon={<Briefcase className="text-white" size={24} />}
                            color="bg-purple-600"
                            trend="+12% this month"
                        />

                        {/* Tickets Card */}
                        <DashboardCard
                            title="Tickets"
                            value="0 Open"
                            desc="Support requests queue"
                            href="/admin/dashboard/home/tickets"
                            icon={<Ticket className="text-white" size={24} />}
                            color="bg-emerald-500"
                            trend="-5% pending"
                        />

                        </div>

                    {/* Empty State / Content Placeholder below cards */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8 h-96 flex flex-col items-center justify-center text-gray-400">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                            <LayoutDashboard size={40} className="opacity-20" />
                        </div>
                        <p>Select a module above to view details</p>
                        <p className="mt-2 text-sm text-gray-300">This layout adapts for mobile, tablet, and desktop screens.</p>
                    </div>

                </main>
            </div>
        </div>
    );
}

// --- Helper Components for clean code ---

function NavItem({ href, icon, label, active = false, onClick }: { href: string, icon: any, label: string, active?: boolean, onClick?: () => void }) {
    return (
        <Link href={href} onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
            : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}>
            {icon}
            <span>{label}</span>
        </Link>
    );
}

function DashboardCard({ title, value, desc, href, icon, color, trend }: any) {
    return (
        <Link href={href} className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${color}`}>
                    {icon}
                </div>
            </div>
            {/* <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400 truncate">{desc}</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{trend}</span>
            </div> */}
        </Link>
    )
}