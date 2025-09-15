// src/features/comments/hooks/useCommentList.ts
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getCommentsByJournal } from "../api";
import { mapDTOtoModel, type CommentListPageDTO, type CommentModel } from "../types/comment";
import { commentKeys } from "../keys";

export function useCommentList(journalId: number, size = 20, pageStartsAt: 0 | 1 = 0) {
  return useInfiniteQuery<
    CommentListPageDTO,
    Error,
    InfiniteData<{ items: CommentModel[]; page: CommentListPageDTO["page"] }>,
    ReturnType<typeof commentKeys.journal>,
    number
  >({
    queryKey: commentKeys.journal(journalId, size),
    queryFn: ({ pageParam, signal }) => getCommentsByJournal(journalId, pageParam, size, signal),
    // ✅ TanStack Query v5 필수
    initialPageParam: pageStartsAt, // 서버가 1-based면 1로 세팅
    getNextPageParam: (last) => {
      const { number, totalPages } = last.page;
      // 0-based → 다음은 number+1 < totalPages ? number+1 : undefined
      // 1-based면: number < totalPages ? number+1 : undefined
      return pageStartsAt === 0
        ? number + 1 < totalPages
          ? number + 1
          : undefined
        : number < totalPages
        ? number + 1
        : undefined;
    },
    select: (data) => ({
      pageParams: data.pageParams,
      pages: data.pages.map((p) => ({
        items: p.content.map(mapDTOtoModel),
        page: p.page,
      })),
    }),
  });
}
