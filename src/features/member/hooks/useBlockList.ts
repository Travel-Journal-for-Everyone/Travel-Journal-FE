import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export interface BlockResponse {
  content: [
    {
      memberId: number;
      nickname: string;
      profileImageUrl: string;
    }
  ];
}

export function useBlockList() {
  return useQuery<BlockResponse>({
    queryKey: ["block-list"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/v1/block/list");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export async function unblockUser(blockedId: number) {
  try {
    const res = await axiosInstance.delete(`/v1/block/${blockedId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
