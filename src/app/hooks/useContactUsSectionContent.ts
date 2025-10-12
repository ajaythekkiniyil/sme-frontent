import { useQuery } from "@tanstack/react-query";
import { fetchContactUsPageData } from "../lib/contact-us/fetchContactUsPageData";

export function useContactUsSectionContent(){
    return useQuery({
        queryKey: ['contact-us'],
        queryFn: fetchContactUsPageData,
    })
}