"use client"

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useSMEs } from "@/app/hooks/getSme";
import { smeColumns } from "@/app/dataTable/smeColumns";

export default function AdminSMEPage() {
    const { data, isLoading } = useSMEs()

    return (
        <div className="m-5">
            <h1 className="mb-5">SME Lists</h1>
            <Box>
                <DataGrid
                    rows={data?.data}
                    columns={smeColumns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5]}
                    loading={isLoading}
                />
            </Box>
        </div>
    );
}
