// src/features/comments/hooks/useHideComment.ts
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { hideComment } from "../api";
import { commentKeys } from "../keys";
import type { CommentListPageDTO, CommentModel } from "../types/comment";

type PageShape = { content: CommentModel[]; page: CommentListPageDTO["page"] };
type Pages = InfiniteData<PageShape>;

export function useHideComment(journalId: number, size = 20) {
  const qc = useQueryClient();
  const qk = commentKeys.journal(journalId, size);

  return useMutation({
    mutationFn: (commentId: number) => hideComment(commentId),

    onMutate: async (commentId) => {
      await qc.cancelQueries({ queryKey: qk });

      const prev = qc.getQueryData<Pages>(qk);
      if (!prev) return { prev };

      const next: Pages = {
        ...prev,
        pages: prev.pages.map((p) => ({
          ...p,
          content: (p.content ?? []).map((c) => (c.commentId === commentId ? { ...c, isHidden: true } : c)),
        })),
      };

      qc.setQueryData<Pages>(qk, next);
      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<Pages>(qk, ctx.prev);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk });
    },
  });
}
