// src/features/comments/hooks/useCreateComment.ts
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { createComment } from "../api";
import type { CommentListPageDTO, CommentModel } from "../types/comment";
import { commentKeys } from "../keys";

type PageShape = { content: CommentModel[]; page: CommentListPageDTO["page"] };
type Pages = InfiniteData<PageShape>;

export function useCreateComment(
  journalId: number,
  size = 20,
  me?: { id: number; nickname: string; profileImage?: string }
) {
  const qc = useQueryClient();
  const qk = commentKeys.journal(journalId, size);

  return useMutation({
    mutationFn: ({ content, parentId }: { content: string; parentId?: number }) =>
      createComment({ journalId, content, parentId }),

    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: qk });

      const prev = qc.getQueryData<Pages>(qk);

      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      const optimistic: CommentModel = {
        commentId: -Date.now(),
        journalId,
        parentId: vars.parentId ?? null,
        author: { memberId: me?.id ?? -1, nickname: me?.nickname ?? "나", profileImage: me?.profileImage },
        content: vars.content,
        likeCount: 0,
        replyCount: 0,
        isLiked: false,
        isMine: true,
        isHidden: false,
        createdAt: now,
        updatedAt: now,
      };

      // 캐시가 없을 때(첫 댓글)도 안전하게
      if (!prev || !prev.pages?.length) {
        const first: PageShape = {
          content: [optimistic],
          page: { size, number: 0, totalElements: 1, totalPages: 1 },
        };
        qc.setQueryData<Pages>(qk, { pages: [first], pageParams: [undefined] } as Pages);
        return { prev };
      }

      // ✅ content 기준으로 prepend
      const next: Pages = {
        ...prev,
        pages: prev.pages.map((p, i) => (i === 0 ? { ...p, content: [optimistic, ...(p.content ?? [])] } : p)),
      };

      qc.setQueryData<Pages>(qk, next);
      return { prev };
    },

    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(qk, ctx.prev);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk });
    },
  });
}
