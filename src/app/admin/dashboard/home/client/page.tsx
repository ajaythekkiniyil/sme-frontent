"use client";

import React from "react";
import Link from "next/link";
import { 
  Users, 
  Briefcase, 
  Ticket, 
  LayoutDashboard, 
  LogOut, 
  Search, 
  Bell, 
  Filter, 
  Plus, 
  Building2 
} from "lucide-react";

export default function AdminClientPage() {
  // Placeholder: Add your data hook here later, e.g., const { data } = useClients();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800">
        <div className="flex items-center gap-2 h-16 px-6 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="text-white font-semibold text-lg tracking-wide">AdminPanel</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" />
          <NavItem href="/admin/dashboard/home/sme" icon={<Users size={20} />} label="SME Portal" />
          <NavItem href="/admin/dashboard/home/client" icon={<Briefcase size={20} />} label="Clients" active />
          <NavItem href="/admin/dashboard/home/tickets" icon={<Ticket size={20} />} label="Tickets" />
        </nav>

        <div className="p-4 border-t border-slate-800">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <LogOut size={18} />
                <span>Sign Out</span>
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm">
            <h1 className="text-xl font-bold text-gray-800">Client Management</h1>
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm">
                    <Search size={16} className="text-gray-400 mr-2" />
                    <input type="text" placeholder="Search Clients..." className="bg-transparent outline-none w-48 text-gray-700 placeholder-gray-400" />
                </div>
                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <button className="text-gray-500 hover:text-blue-600"><Bell size={20} /></button>
                    <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm">AD</div>
                </div>
            </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Client Directory</h2>
              <p className="text-gray-500 text-sm mt-1">Manage client accounts and subscriptions.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <Filter size={16} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                <Plus size={16} />
                Add Client
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px] relative">
            
            {/* TODO: Replace this block with your <DataGrid /> 
                when you have your useClient() hook ready.
            */}
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                   <Building2 size={48} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No Clients Loaded</h3>
                <p className="text-sm max-w-xs text-center mt-2">
                    Connect your data hook to view the client list or add a new client to get started.
                </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// --- Helper for Sidebar Links ---
function NavItem({ href, icon, label, active = false }: { href: string, icon: any, label: string, active?: boolean }) {
    return (
        <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            active 
            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
            : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`}>
            {icon}
            <span>{label}</span>
        </Link>
    );
}