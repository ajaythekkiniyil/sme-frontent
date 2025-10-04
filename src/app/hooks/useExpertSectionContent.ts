import { useQuery } from "@tanstack/react-query";
import { fetchExpertPageData } from "../lib/expertSection";

export function useExpertSectionContent(){
    return useQuery({
        queryKey: ['expert-section'],
        queryFn: fetchExpertPageData,
        retry: 1,
    })
}