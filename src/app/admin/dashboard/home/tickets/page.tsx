"use client"
import { useGetTickets } from "@/app/hooks/tickets"
import { GridColDef } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid"

export const ticketsColumn: GridColDef[] = [
    {
        field: "firstName",
        headerName: "First name",
        flex: 1, // auto width
    },
    {
        field: "lastName",
        headerName: "Last name",
        flex: 1,
    },
    {
        field: "businessNumber",
        headerName: "Admin verified",
        flex: 1,
    },
    {
        field: "businessEmail",
        headerName: "Business email",
        flex: 1,
    },
    {
        field: "adminVerified",
        headerName: "Admin verified",
        flex: 1,
        renderCell: (params) => {
            return <h1 className="text-green-900">{params.row.adminVerified ? 'Verified' : 'Not Verified'}</h1>
        }
    }
];

export default function AdminHomePage() {
    const { data: tickets, isLoading } = useGetTickets()
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Tickets</h1>
            {
                tickets?.data?.length === 0
                    ?
                    (
                        <p>No tickets found.</p>
                    )
                    :
                    (
                        <DataGrid
                            rows={tickets?.data}
                            columns={ticketsColumn}
                            getRowId={(row) => row.id}
                            onRowClick={(params) => {
                                window.location.href = window.location.pathname + `/${params.row.documentId}`
                            }}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            loading={isLoading}
                            pageSizeOptions={[5]}
                            sx={{
                                "& .MuiDataGrid-row": {
                                    cursor: "pointer",
                                },
                            }}
                        />
                    )}
        </div>
    )
}