"use client"

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useSme } from "@/app/hooks/getSme";
import { GridColDef } from "@mui/x-data-grid";

export const smeColumns: GridColDef[] = [
    {
        field: "fullName",
        headerName: "Full Name",
        flex: 1, // auto width
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Phone",
        flex: 1,
    },
    {
        field: "experience",
        headerName: "Experience",
        flex: 1,
    },
    {
        field: "smeStatus",
        headerName: "SME Status",
        flex: 1,
        renderCell: (params) => {
            return <h1 className="text-green-900">{params.row.smeStatus}</h1>
        }
    }
];

export default function AdminSMEPage() {
    const { data, isLoading } = useSme()

    return (
        <div className="m-5">
            <h1 className="mb-5">SME Lists</h1>
            <Box>
                <DataGrid
                    rows={data?.data}
                    columns={smeColumns}
                    getRowId={(row) => row.id}
                    onRowClick={(params) => {
                        window.location.href = window.location.pathname + `/${params.row.documentId}`
                    }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5]}
                    loading={isLoading}
                    sx={{
                        "& .MuiDataGrid-row": {
                            cursor: "pointer",
                        },
                    }}
                />
            </Box>
        </div>
    );
}
