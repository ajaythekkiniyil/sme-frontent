"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails, fetchUsers } from "../lib/users";

// Hook for fetching all SMEs
export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });
}

// Hook for fetching SME details by id
export function useSmeDetails(id: number) {
    return useQuery({
        queryKey: ["userDetails", id], // id in key so cache is per-id
        queryFn: () => fetchUserDetails(id), // pass id to fetcher
        enabled: !!id, // only run if id exists
    });
}
