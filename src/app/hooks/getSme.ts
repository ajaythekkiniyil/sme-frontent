"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSme, fetchSmeDetails } from "../lib/getSme";

// Hook for fetching all SMEs
export function useSme() {
    return useQuery({
        queryKey: ["smes"],
        queryFn: fetchSme,
    });
}

// Hook for fetching SME details by id
export function useSmeDetails(id: number) {
    return useQuery({
        queryKey: ["smeDetails", id], // id in key so cache is per-id
        queryFn: () => fetchSmeDetails(id), // pass id to fetcher
        enabled: !!id, // only run if id exists
    });
}
