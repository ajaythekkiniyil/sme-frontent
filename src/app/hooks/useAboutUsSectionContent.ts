import { useQuery } from "@tanstack/react-query";
import { fetchAboutUsPageData } from "../lib/about-us/fetchAboutUsPageData";

export function useAboutUsSectionContent(){
    return useQuery({
        queryKey: ['about-us'],
        queryFn: fetchAboutUsPageData,
    })
}