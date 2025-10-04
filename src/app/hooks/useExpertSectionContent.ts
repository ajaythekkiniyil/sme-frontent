import { useQuery } from "@tanstack/react-query";
import { fetchExpertPageData } from "../lib/expertSectionData";

export function useExpertSectionContent(){
    return useQuery({
        queryKey: ['expert-section'],
        queryFn: fetchExpertPageData,
    })
}