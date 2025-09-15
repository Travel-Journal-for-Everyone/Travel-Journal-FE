import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getCommentsByJournal } from "../api";
import { mapDTOtoModel, type CommentListPageDTO, type CommentModel } from "../types/comment";
import { commentKeys } from "../keys";

export function useCommentsInfinite(journalId: number, size = 20, pageStartsAt: 0 | 1 = 0) {
  return useInfiniteQuery<
    CommentListPageDTO,
    Error,
    InfiniteData<{ content: CommentModel[]; page?: CommentListPageDTO["page"] }>,
    ReturnType<typeof commentKeys.journal>,
    number
  >({
    queryKey: commentKeys.journal(journalId, size),
    queryFn: ({ pageParam, signal }) => getCommentsByJournal(journalId, pageParam, size, signal),
    initialPageParam: pageStartsAt,
    getNextPageParam: (last, _all, lastPageParam) => {
      const page = (last as any)?.page;
      const content = (last as any)?.content ?? [];

      if (page && Number.isFinite(page.totalPages) && Number.isFinite(page.number)) {
        if (pageStartsAt === 0) {
          return page.number + 1 < page.totalPages ? page.number + 1 : undefined;
        }
        return page.number < page.totalPages ? page.number + 1 : undefined;
      }

      if (Array.isArray(content)) {
        return content.length >= size
          ? Number.isFinite(lastPageParam)
            ? (lastPageParam as number) + 1
            : pageStartsAt + 1
          : undefined;
      }

      // 3) 어떤 정보도 없으면 종료
      return undefined;
    },
    // UI에서 p.content 접근을 유지
    select: (data) => ({
      pageParams: data.pageParams,
      pages: data.pages.map((p) => ({
        content: (p.content ?? []).map(mapDTOtoModel),
        page: p.page, // 일부 응답에서 없을 수 있으니 optional로 둠
      })),
    }),
  });
}
