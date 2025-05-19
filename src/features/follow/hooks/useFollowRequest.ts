import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export interface FollowRequest {
  followId: number;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  placesCount: number;
  travelDiaryCount: number;
  requestStatus: "REQUESTED" | "ACCEPTED" | "REJECTED";
}

interface FollowRequestResponse {
  content: FollowRequest[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export const useFollowRequests = () => {
  return useQuery<FollowRequestResponse>({
    queryKey: ["followRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/follow/requests");
      return res.data;
    },
  });
};

export const useAcceptFollowRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (followId: number) =>
      axiosInstance.post(`/v1/follow/requests/${followId}/accept`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followRequests"] });
    },
  });
};

export const useRejectFollowRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (followId: number) =>
      axiosInstance.post(`/v1/follow/requests/${followId}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followRequests"] });
    },
  });
};
