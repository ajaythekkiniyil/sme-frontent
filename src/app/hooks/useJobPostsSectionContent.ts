import { useQuery } from "@tanstack/react-query";
import { fetchJobPostsPageData } from "../lib/jobPosts/fetchJobPostsPageData";

export function useJobPostsPageContent() {
    return useQuery({
        queryKey: ['job-posts'],
        queryFn: fetchJobPostsPageData,
    })
}