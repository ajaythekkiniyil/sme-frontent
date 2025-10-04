import { useQuery } from "@tanstack/react-query";
import { fetchHomePageData } from "../lib/homePage";

export function useHomePageContent(){
    return useQuery({
        queryKey: ['home-page'],
        queryFn: fetchHomePageData,
    })
}