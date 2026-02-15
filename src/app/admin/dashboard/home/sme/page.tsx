"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Users,
  Briefcase,
  Ticket,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Trash2, // added
} from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useSme } from "@/app/hooks/getSme";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../../components/ui/toast";

const StatusBadge = ({ status }: { status: string }) => {
  let styles = "bg-gray-100 text-gray-600";

  if (status === "active")
    styles =
      "bg-green-100 text-green-700 border border-green-200";
  else if (status === "pending")
    styles =
      "bg-blue-50 text-blue-600 border border-blue-100";
  else if (
    status === "inactive" ||
    status === "suspended"
  )
    styles =
      "bg-red-50 text-red-600 border border-red-100";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles}`}
    >
      {status}
    </span>
  );
};

export default function AdminSMEPage() {
  const { data, isLoading } = useSme();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // DELETE FUNCTION
  const handleDelete = async () => {
    if (!selectedDocumentId) return;

    try {
      const res = await fetch(
        `/api/sme-applications/${selectedDocumentId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        showToast("SME deleted successfully!", "success");

        queryClient.setQueryData(["smes"], (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter(
              (item: any) => item.documentId !== selectedDocumentId
            ),
          };
        });

        setOpenDeleteDialog(false);
        setSelectedDocumentId(null);

      } else {
        const errorData = await res.json();
        showToast(
          errorData?.error?.message || "Failed to delete SME",
          "error"
        );
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // COLUMNS (Moved inside component)
  const smeColumns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <span className="font-medium text-gray-700">
          {params.value}
        </span>
      ),
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
      renderCell: (params) => (
        <span className="text-gray-500">
          {params.value}
        </span>
      ),
    },
    {
      field: "businessNumber",
      headerName: "Phone",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "smeStatus",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <StatusBadge
          status={params.row.smeStatus}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDocumentId(params.row.documentId);
            setOpenDeleteDialog(true);
          }}
          className="text-red-500 hover:text-red-700 transition"
        >
          <Trash2 size={18} />
        </button>
      ),
    },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "/api/auth/logout",
        { method: "POST" }
      );

      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 transition-transform duration-300 ease-in-out 
          ${isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
          md:relative md:flex md:translate-x-0`}
      >
        <div className="flex items-center gap-2 h-16 px-6 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">
            AdminPanel
          </span>

          <button
            className="md:hidden ml-auto text-slate-400 hover:text-white"
            onClick={() =>
              setIsSidebarOpen(false)
            }
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavItem
            href="/admin/dashboard/home"
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            onClick={() =>
              setIsSidebarOpen(false)
            }
          />
          <NavItem
            href="/admin/dashboard/home/sme"
            icon={<Users size={20} />}
            label="SME Portal"
            active
            onClick={() =>
              setIsSidebarOpen(false)
            }
          />
          <NavItem
            href="/admin/dashboard/home/client"
            icon={<Briefcase size={20} />}
            label="Clients"
            onClick={() =>
              setIsSidebarOpen(false)
            }
          />
          <NavItem
            href="/admin/dashboard/home/tickets"
            icon={<Ticket size={20} />}
            label="Tickets"
            onClick={() =>
              setIsSidebarOpen(false)
            }
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm z-30">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() =>
                setIsSidebarOpen(true)
              }
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              SME Management
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <Box sx={{ width: "100%" }}>
              <DataGrid
                rows={data?.data || []}
                columns={smeColumns}
                getRowId={(row) => row.documentId}
                loading={isLoading}
                onRowClick={(params) => {
                  router.push(
                    `${pathname}/${params.row.documentId}`
                  );
                }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                sx={{
                  border: 0,
                  minHeight: 400,
                }}
              />
            </Box>
            {/* DELETE CONFIRMATION DIALOG */}
            <Dialog
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
            >
              <DialogTitle sx={{ fontWeight: 600 }}>
                Confirm Delete
              </DialogTitle>

              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this SME?
                  This action cannot be undone.
                </DialogContentText>
              </DialogContent>

              <DialogActions sx={{ padding: "16px 24px" }}>
                <Button
                  onClick={() => setOpenDeleteDialog(false)}
                  variant="outlined"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleDelete}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
  onClick,
}: {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
