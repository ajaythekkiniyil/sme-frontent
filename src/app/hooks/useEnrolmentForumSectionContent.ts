import { useQuery } from "@tanstack/react-query";
import { fetchEnrolmentForumPageData } from "../lib/enrolment-forum/fetchEnrolmentForumPageData";

export function useEnrolmentForumSectionContent(){
    return useQuery({
        queryKey: ['enrollment-forum'],
        queryFn: fetchEnrolmentForumPageData,
    })
}