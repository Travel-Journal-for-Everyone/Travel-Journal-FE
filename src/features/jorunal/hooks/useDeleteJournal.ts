import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export function useDeleteJournal(journalId: number) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/v1/members/journals/${journalId}`);
    },
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      router.push("/my-journal");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      alert("삭제 중 오류가 발생했습니다.");
      console.error(err);
    },
  });

  return mutation;
}
