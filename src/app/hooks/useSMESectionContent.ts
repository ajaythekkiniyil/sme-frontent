import { useQuery } from "@tanstack/react-query";
import { fetchSmePageData } from "../lib/fetchSmePageData";

export function useSMESectionContent(){
    return useQuery({
        queryKey: ['sme-page'],
        queryFn: fetchSmePageData,
    })
}