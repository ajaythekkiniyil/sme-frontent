import { useQuery } from "@tanstack/react-query";
import { fetchCareerPageData } from "../lib/careers/fetchCareerPageData";

export function useCareerSectionContent(){
    return useQuery({
        queryKey: ['careers'],
        queryFn: fetchCareerPageData,
    })
}