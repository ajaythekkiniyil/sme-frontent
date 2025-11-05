import { useQuery } from "@tanstack/react-query";
import { fetchComplainsPageData } from "./fetchComplainsPageData";

export function useComplainsSectionContent(){
    return useQuery({
        queryKey: ['complains-page-data'],
        queryFn: fetchComplainsPageData,
    })
}