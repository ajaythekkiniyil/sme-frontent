"use client";

import { useSmeDetails } from "@/app/hooks/getSme";
import React from "react";

export default function SmeDetails({ params }: { params: Promise<{ id: number }> }) {
    const { id } = React.use(params)

    const { data, isLoading, error } = useSmeDetails(id);

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Failed to load SME details</div>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">SME Details</h1>
            <pre className="bg-gray-100 p-4 mt-4 rounded">
                {JSON.stringify(data.data, null, 2)}
            </pre>
        </div>
    );
}
