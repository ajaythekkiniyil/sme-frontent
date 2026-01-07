"use client";

import React, { useState } from "react"; // Added useState
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Users,
  Briefcase,
  Ticket,
  LayoutDashboard,
  LogOut,
  Search,
  Bell,
  Plus,
  Filter,
  Menu, // Added Menu
  X // Added X
} from "lucide-react";

// MUI Imports
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useSme } from "@/app/hooks/getSme";

// --- 1. Custom Status Badge Component ---
const StatusBadge = ({ status }: { status: string }) => {
  let styles = "bg-gray-100 text-gray-600"; // Default

  if (status === 'active') styles = "bg-green-100 text-green-700 border border-green-200";
  else if (status === 'pending') styles = "bg-blue-50 text-blue-600 border border-blue-100";
  else if (status === 'inactive' || status === 'suspended') styles = "bg-red-50 text-red-600 border border-red-100";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles}`}>
      {status}
    </span>
  );
};

// --- 2. Grid Definitions ---
const smeColumns: GridColDef[] = [
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => <span className="font-medium text-gray-700">{params.value}</span>
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "businessEmail",
    headerName: "Email",
    flex: 1.5,
    minWidth: 150,
    renderCell: (params) => <span className="text-gray-500">{params.value}</span>
  },
  {
    field: "businessNumber",
    headerName: "Phone",
    flex: 1,
    minWidth: 120
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    minWidth: 100
  },
  {
    field: "smeStatus",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => <StatusBadge status={params.row.smeStatus} />
  }
];

export default function AdminSMEPage() {
  const { data, isLoading } = useSme();
  const router = useRouter();
  const pathname = usePathname();
  // State to manage the visibility of the sidebar on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (res.ok) {
        // Optional: Clear client-side cache so old data doesn't flash if they log back in
        // queryClient.clear(); 

        // Redirect to login page
        router.push('/admin/login');

        // Force a router refresh to ensure Server Components re-render without the cookie
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">

      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:flex md:translate-x-0` // Show on md screens and up, regardless of state
        }
      >
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
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
          <NavItem href="/admin/dashboard/home" icon={<LayoutDashboard size={20} />} label="Overview" onClick={() => setIsSidebarOpen(false)} />
          <NavItem href="/admin/dashboard/home/sme" icon={<Users size={20} />} label="SME Portal" active onClick={() => setIsSidebarOpen(false)} />
          <NavItem href="/admin/dashboard/home/client" icon={<Briefcase size={20} />} label="Clients" onClick={() => setIsSidebarOpen(false)} />
          <NavItem href="/admin/dashboard/home/tickets" icon={<Ticket size={20} />} label="Tickets" onClick={() => setIsSidebarOpen(false)} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay (visible when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
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
            <h1 className="text-xl font-bold text-gray-800">SME Management</h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Bar - Responsive size */}
            {/* <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search SMEs..."
                className="bg-transparent outline-none w-24 md:w-48 text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-3 pl-0 sm:pl-6 sm:border-l border-gray-200">
              <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm">AD</div>
            </div> */}
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">

          {/* Action Bar - Ensured full width/flex behavior for buttons on mobile */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">SME Directory</h2>
              <p className="text-gray-500 text-sm mt-1">Manage your subject matter experts and their status.</p>
            </div>
            {/* <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <Filter size={16} />
                Filters
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                <Plus size={16} />
                Add New SME
              </button>
            </div> */}
          </div>

          {/* Data Grid Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <Box sx={{ width: '100%' }}>
              <DataGrid
                rows={data?.data || []}
                columns={smeColumns}
                getRowId={(row) => row.id}
                loading={isLoading}
                onRowClick={(params) => {
                  router.push(`${pathname}/${params.row.documentId}`);
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                // --- CUSTOM MUI STYLING TO MATCH TAILWIND ---
                sx={{
                  border: 0,
                  minHeight: 400,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                    color: "#374151",
                    fontWeight: 600,
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #f3f4f6",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f9fafb",
                    cursor: "pointer",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "1px solid #e5e7eb",
                  },
                  // Remove the blue focus outline MUI adds by default
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-columnHeader:focus": {
                    outline: "none",
                  },
                }}
              />
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Helper for Sidebar Links ---
// Updated to accept an optional onClick handler
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