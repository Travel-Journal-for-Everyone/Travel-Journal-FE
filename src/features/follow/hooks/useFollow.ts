import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export function useFollow(memberId: number, isFollowingInitial: boolean) {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/v1/follow/${memberId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberInfo", memberId] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/v1/follow/${memberId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberInfo", memberId] });
    },
  });

  const toggleFollow = () => {
    if (isFollowingInitial) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return {
    isPending: followMutation.isPending || unfollowMutation.isPending,
    toggleFollow,
  };
}
