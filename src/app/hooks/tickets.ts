import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTicketDetails, fetchTickets, updateTicketStatus } from "../lib/tickets";
import { uploadFiles } from "../lib/uploadFiles"
import { useEffect, useState } from "react";

export function useGetTickets() {
   return useQuery({
      queryKey: ["tickets"],
      queryFn: fetchTickets,
   });
}

export function useTicketDetails(id: number) {
   return useQuery({
      queryKey: ["tickets", id],
      queryFn: () => fetchTicketDetails(id),
      enabled: !!id,
   });
}

export const useTicketCreation = () => {
   const [profile, setProfile] = useState({});
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      const storedEmail = localStorage.getItem("email");
      const storedName = localStorage.getItem("username");
      if (storedEmail && storedName) {
         setProfile({ username: storedName, email: storedEmail });
      }
   }, []);

   const handleTicketCreation = async (details: any) => {
      setLoading(true)
      try {
         let attachmentsId: number[] | null = null;

         if (details.attachments.length > 0) {
            attachmentsId = await uploadFiles(details.attachments)
         }

         const ticketCreationPayload = {
            data: {
               ...details,
               ...profile,
               attachments: attachmentsId, // attachments is the name used in strapi
            }
         };

         const res = await fetch(`/api/tickets`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketCreationPayload),
         });

         if (res.status !== 200) {
            throw new Error("something went worng while creating new ticket.")
         }

         return res;
      }
      catch (err) {
         throw new Error("something went worng while creating new ticket.")
      }
   };

   return { handleTicketCreation, loading, setLoading }
}

export function useUpdateTicketStatus() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, ticketStatus, assignedSmeName, paymentStatus }: { id: number; ticketStatus: boolean, assignedSmeName: string | null, paymentStatus: string | null }) =>
         updateTicketStatus(id, ticketStatus, assignedSmeName, paymentStatus),

      onSuccess: (_, variables) => {
         // Refresh ticket details
         queryClient.invalidateQueries({
            queryKey: ["tickets", variables.id],
         });

         // refresh ticket list
         queryClient.invalidateQueries({
            queryKey: ["tickets"],
         });
      },

      onError: (error: unknown) => {
         throw new Error("Failed to update ticket status");
      },
   });
}