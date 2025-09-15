// src/features/comments/hooks/useToggleLike.ts
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { toggleLike } from "../api";
import { commentKeys } from "../keys";
import type { CommentListPageDTO, CommentModel } from "../types/comment";

type PageShape = { content: CommentModel[]; page: CommentListPageDTO["page"] };
type Pages = InfiniteData<PageShape>;

export function useToggleLike(journalId: number, size = 20) {
  const qc = useQueryClient();
  const qk = commentKeys.journal(journalId, size);

  return useMutation({
    mutationFn: (commentId: number) => toggleLike(commentId),

    // ✅ 낙관적 토글
    onMutate: async (commentId) => {
      await qc.cancelQueries({ queryKey: qk });

      const prev = qc.getQueryData<Pages>(qk);
      if (!prev) return { prev };

      const next: Pages = {
        ...prev,
        pages: prev.pages.map((p) => ({
          ...p,
          content: (p.content ?? []).map((c) =>
            c.commentId === commentId
              ? {
                  ...c,
                  isLiked: !c.isLiked,
                  likeCount: c.isLiked ? c.likeCount - 1 : c.likeCount + 1,
                }
              : c
          ),
        })),
      };

      qc.setQueryData<Pages>(qk, next);
      return { prev };
    },

    // 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<Pages>(qk, ctx.prev);
    },

    // 최종 동기화
    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk });
    },
  });
}
