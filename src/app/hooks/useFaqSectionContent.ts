import { useQuery } from "@tanstack/react-query";
import { fetchFaqPageData } from "../lib/faq/fetchFaqPageData";

export function useFaqSectionContent(){
    return useQuery({
        queryKey: ['faq'],
        queryFn: fetchFaqPageData,
    })
}