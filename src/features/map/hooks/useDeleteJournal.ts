import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useDeleteJournal = () => {
  return useMutation({
    mutationFn: async (journalId: number) => {
      await axiosInstance.delete(`/v1/members/journals/${journalId}`);
    },
  });
};
