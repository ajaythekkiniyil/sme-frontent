import { useQuery } from "@tanstack/react-query";
import { fetchTermsAndConditionPageData } from "./fetchTermsAndConditionPageData";

export function useTermsAndConditionSectionContent(){
    return useQuery({
        queryKey: ['terms-and-condition'],
        queryFn: fetchTermsAndConditionPageData,
    })
}