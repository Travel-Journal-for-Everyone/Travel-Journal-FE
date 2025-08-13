import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { JournalUpdateRequest } from "@/types/journal";

export function useUpdateJournal(journalId: number) {
  return useMutation({
    mutationFn: async (form: JournalUpdateRequest) => {
      const res = await axiosInstance.put(`/v1/members/journals/${journalId}`, form);
      return res.data;
    },
  });
}
