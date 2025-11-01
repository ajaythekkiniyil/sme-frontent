import { useQuery } from "@tanstack/react-query";
import { fetchPrivacyPolicyPageData } from "./fetchPrivacyPolicyPageData";

export function usePrivacyPolicySectionContent(){
    return useQuery({
        queryKey: ['privacy-policy'],
        queryFn: fetchPrivacyPolicyPageData,
    })
}