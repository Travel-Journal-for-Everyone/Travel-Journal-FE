"use client";
import { useMemo, useCallback } from "react";
import { useCreateComment } from "../hooks/useCreateComment";
import { useCommentsInfinite } from "../hooks/useCommentsInfinite";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

export default function CommentList({
  journalId,
  me,
  pageStartsAt = 0,
}: {
  journalId: number;
  me?: { id: number; nickname: string; profileImage?: string };
  pageStartsAt?: 0 | 1;
}) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } = useCommentsInfinite(
    journalId,
    20,
    pageStartsAt
  );

  const createMut = useCreateComment(journalId, 20, me);

  const flat = useMemo(() => {
    const arr = data?.pages.flatMap((p) => p.content ?? []) ?? [];
    const byId = new Map<number, (typeof arr)[number]>();
    for (const it of arr) {
      if (typeof it?.commentId === "number" && !byId.has(it.commentId)) {
        byId.set(it.commentId, it);
      }
    }
    return Array.from(byId.values());
  }, [data]);

  const handleSubmit = useCallback(
    async (content: string) => {
      await createMut.mutateAsync({ content });
    },
    [createMut]
  );

  if (status === "pending") return <div className="py-4 text-sm text-gray-500">댓글 불러오는 중…</div>;
  if (status === "error") return <div className="py-4 text-sm text-red-500">댓글을 불러오지 못했습니다.</div>;

  return (
    <div>
      <CommentForm journalId={journalId} onSubmit={handleSubmit} disabled={createMut.isPending} />

      <div className="mt-4 divide-y">
        {flat.map((c) => {
          const key =
            typeof c.commentId === "number" && c.commentId > 0
              ? `id-${c.commentId}`
              : `tmp-${Math.abs(Number(c.commentId))}-${c.createdAt ?? ""}`;
          return <CommentItem key={key} item={c} journalId={journalId} />;
        })}
        {flat.length === 0 && <div className="py-6 text-sm text-gray-400">첫 댓글을 남겨보세요.</div>}
      </div>

      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-3 w-full rounded border py-2 text-sm disabled:opacity-60"
          aria-busy={isFetchingNextPage}
        >
          {isFetchingNextPage ? "불러오는 중…" : "더 보기"}
        </button>
      )}
    </div>
  );
}
