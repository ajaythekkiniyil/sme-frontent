"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSMEs } from "../lib/getSme";

export function useSMEs() {
    return useQuery({
        queryKey: ["smes"],
        queryFn: fetchSMEs,
    });
}
