import { useQuery } from "@tanstack/react-query";
import { fetchPersonalChats } from "../lib/chats";

export function usePersonalChats(id: number) {
   return useQuery({
      queryKey: ["chats", id],
      queryFn: () => fetchPersonalChats(id),
      enabled: !!id,
   });
}