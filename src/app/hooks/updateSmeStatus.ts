// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateSmeStatusFunction } from "../lib/sme";

// export enum smeStatusType {
//     rejected = "rejected",
//     active = "active",
// }

// export function useUpdateSmeStatus() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ status, id }: { status: smeStatusType; id: number }) =>
//             updateSmeStatusFunction(status, id),

//         onSettled: (_data, _error, variables) => {
//             queryClient.invalidateQueries({ queryKey: ["smeDetails", variables.id] });
//         },
//     });
// }
