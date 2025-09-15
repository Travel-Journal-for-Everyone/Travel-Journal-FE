import { useQuery } from "@tanstack/react-query";
import { getReplies } from "../api";
import { mapDTOtoModel, type CommentModel } from "../types/comment";
import { commentKeys } from "../keys";

export function useReplies(commentId: number) {
  return useQuery({
    queryKey: commentKeys.replies(commentId),
    queryFn: ({ signal }) => getReplies(commentId, signal),
    select: (list) => list.map(mapDTOtoModel) as CommentModel[],
  });
}
