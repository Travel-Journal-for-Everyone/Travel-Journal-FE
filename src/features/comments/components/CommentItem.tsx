"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import type { CommentModel } from "../types/comment";
import { useUpdateComment } from "../hooks/useUpdateComment";
import { useHideComment } from "../hooks/useHideComment";
import { useToggleLike } from "../hooks/useToggleLike";
import { Loader2 } from "lucide-react";

interface Props {
  item: CommentModel;
  journalId: number;
}

function timeAgo(s: string) {
  const d = new Date(s.replace(" ", "T"));
  const sec = Math.max(1, Math.floor((Date.now() - d.getTime()) / 1000));
  if (sec < 60) return "방금 전";
  const m = Math.floor(sec / 60);
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}

export default function CommentItem({ item, journalId }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.content);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const updateMut = useUpdateComment(journalId, 20);
  const hideMut = useHideComment(journalId, 20);
  const likeMut = useToggleLike(journalId, 20);

  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const replyRef = useRef<HTMLTextAreaElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [menuOpen]);

  const beginEdit = () => {
    setDraft(item.content);
    setEditing(true);
    setTimeout(() => editorRef.current?.focus(), 0);
  };
  const saveEdit = useCallback(async () => {
    const v = draft.trim();
    if (!v || v === item.content) {
      setEditing(false);
      setDraft(item.content);
      return;
    }
    try {
      setPending(true);
      await updateMut.mutateAsync({ commentId: item.commentId, content: v });
      setEditing(false);
    } finally {
      setPending(false);
    }
  }, [draft, item, updateMut]);

  const hideComment = async () => {
    await hideMut.mutateAsync(item.commentId);
  };

  // ⬇️ 답글 제출 훅은 기존 useCreateComment 사용(상위 CommentList에서 onReply로 넘겨도 OK)
  const submitReply = async () => {
    const v = replyText.trim();
    if (!v) return;
    // 필요 시 createComment API 직접 호출 or 상위에서 onReply prop으로 처리
    // 여기선 간단히 이벤트 디스패치만 남깁니다:
    const evt = new CustomEvent("comment:reply", { detail: { parentId: item.commentId, content: v } });
    window.dispatchEvent(evt);
    setReplyText("");
    setReplyOpen(false);
  };

  return (
    <div className="py-3">
      <div className="flex items-start gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-100">
          <Image
            src={item.author.profileImage || "/images/default-avatar.png"}
            alt={item.author.nickname}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          {/* 헤더 */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="truncate text-sm font-medium">{item.author.nickname}</span>
                <span className="shrink-0 text-xs text-gray-500">{timeAgo(item.createdAt)}</span>
              </div>
            </div>
            {/* 순정 … 메뉴 */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-50"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="sr-only">메뉴</span>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-10 mt-1 w-36 overflow-hidden rounded-md border bg-white shadow-lg"
                >
                  {item.isMine && (
                    <button
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        beginEdit();
                      }}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      수정
                    </button>
                  )}
                  {item.isMine && <div className="h-px bg-gray-100" />}
                  <button
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      void hideComment();
                    }}
                    className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 본문 */}
          {!editing ? (
            item.isHidden ? (
              <div className="mt-1 text-sm text-gray-400">삭제된 댓글입니다.</div>
            ) : (
              <div className="mt-1 whitespace-pre-wrap break-words text-sm">{item.content}</div>
            )
          ) : (
            <div className="mt-2 rounded-md border p-2">
              <textarea
                ref={editorRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="h-24 w-full resize-none bg-transparent text-sm outline-none"
                placeholder="댓글 수정…"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void saveEdit();
                  }
                  if (e.key === "Escape") setEditing(false);
                }}
                disabled={pending}
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setDraft(item.content);
                  }}
                  className="rounded border px-2 py-1 text-xs"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={pending || draft.trim().length === 0}
                  className="rounded bg-black px-3 py-1 text-xs text-white disabled:opacity-50"
                >
                  저장
                </button>
              </div>
            </div>
          )}

          {/* 하단 인라인 액션바 */}
          <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
            {!item.isHidden && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setReplyOpen((v) => !v);
                    setTimeout(() => replyRef.current?.focus(), 0);
                  }}
                  className="rounded px-1 py-0.5 hover:bg-gray-50"
                >
                  답글 달기
                </button>

                <button
                  type="button"
                  onClick={() => likeMut.mutate(item.commentId)}
                  disabled={likeMut.isPending}
                  className="rounded px-1 py-0.5 hover:bg-gray-50"
                >
                  {item.isLiked ? "좋아요 취소" : "좋아요"} {item.likeCount > 0 ? `(${item.likeCount})` : ""}
                </button>
              </>
            )}
            {!!item.replyCount && <span className="text-gray-500">답글 {item.replyCount}</span>}
            {editing && <span className="text-gray-400">편집 중…</span>}
            {item.isHidden && <span className="text-gray-400">숨김 처리됨</span>}
          </div>

          {replyOpen && !item.isHidden && (
            <div className="flex gap-2">
              <div
                className={[
                  "flex flex-1 items-center rounded-md border bg-white shadow-sm overflow-hidden",
                  "focus-within:ring-2 focus-within:ring-black/5",
                ].join(" ")}
              >
                <textarea
                  ref={replyRef}
                  className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-gray-400 px-2 py-2"
                  placeholder="답글을 입력하세요 (Enter: 등록, Shift+Enter: 줄바꿈)"
                  rows={1}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void submitReply();
                    }
                    if (e.key === "Escape") {
                      setReplyOpen(false);
                      setReplyText("");
                    }
                  }}
                />
              </div>
              <div className="flex self-stretch">
                <button
                  type="button"
                  onClick={() => {
                    setReplyOpen(false);
                    setReplyText("");
                  }}
                  className="rounded border px-2 py-1 text-xs"
                >
                  취소
                </button>

                <button
                  type="button"
                  onClick={submitReply}
                  disabled={replyText.trim().length === 0 || pending}
                  aria-label="댓글 등록"
                  className={[
                    "inline-flex self-stretch w-12 items-center justify-center",
                    replyText.trim().length > 0 ? "bg-primary-main text-white" : "bg-gray-200 text-gray-500",
                    "transition-colors",
                  ].join(" ")}
                >
                  {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-sm">등록</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
