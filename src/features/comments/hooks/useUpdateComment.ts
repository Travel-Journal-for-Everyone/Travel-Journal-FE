// src/features/comments/hooks/useUpdateComment.ts
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { updateComment } from "../api";
import { commentKeys } from "../keys";
import type { CommentListPageDTO, CommentModel } from "../types/comment";

type PageShape = { content: CommentModel[]; page: CommentListPageDTO["page"] };
type Pages = InfiniteData<PageShape>;

export function useUpdateComment(journalId: number, size = 20) {
  const qc = useQueryClient();
  const qk = commentKeys.journal(journalId, size);

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) => updateComment(commentId, content),

    onMutate: async ({ commentId, content }) => {
      await qc.cancelQueries({ queryKey: qk });

      const prev = qc.getQueryData<Pages>(qk);
      if (!prev) return { prev };

      const next: Pages = {
        ...prev,
        pages: prev.pages.map((p) => ({
          ...p,
          content: (p.content ?? []).map((c) => (c.commentId === commentId ? ({ ...c, content } as CommentModel) : c)),
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
