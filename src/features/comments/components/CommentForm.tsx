// features/comments/components/CommentBar.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Heart, MessageSquareText, ArrowUp, Loader2 } from "lucide-react";

type Props = {
  journalId: number;
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
  onSubmit: (content: string) => Promise<void> | void;
  // 새로 추가된 액션/표시
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  onToggleLike?: () => Promise<void> | void;
};

export default function CommentBar({
  maxLength = 1000,
  disabled,
  placeholder = "댓글 달기…",
  onSubmit,
  likeCount = 0,
  commentCount = 0,
  isLiked = false,
  onToggleLike,
}: Props) {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const [liking, setLiking] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // ✅ autosize (rows=1 → 내용에 맞게 높이 자동)
  const autosize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`; // 최대 높이 160px
  }, []);
  useEffect(() => {
    autosize();
  }, [value, autosize]);

  const remain = maxLength - value.length;
  const canSubmit = !disabled && !pending && value.trim().length > 0 && value.length <= maxLength;

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!canSubmit) return;
      await submit();
    }
  };

  const submit = async () => {
    try {
      setPending(true);
      const content = value.trim();
      if (!content) return;
      await onSubmit(content);
      setValue("");
      textareaRef.current?.focus();
    } finally {
      setPending(false);
    }
  };

  const toggleLike = async () => {
    if (!onToggleLike) return;
    try {
      setLiking(true);
      await onToggleLike();
    } finally {
      setLiking(false);
    }
  };

  // 80% 이상일 때만 글자수 노출 (시각적 소음 감소)
  const showCounter = useMemo(
    () => value.length >= Math.floor(maxLength * 0.8) || remain < 0,
    [value.length, maxLength, remain]
  );

  return (
    <div className="flex items-center gap-3">
      <div className="flex shrink-0 select-none items-center gap-3">
        <button
          type="button"
          onClick={toggleLike}
          disabled={disabled || liking}
          aria-pressed={isLiked}
          className="inline-flex items-center gap-1 text-gray-700 disabled:opacity-50"
          title={isLiked ? "좋아요 취소" : "좋아요"}
        >
          {liking ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Heart
              className="h-5 w-5"
              // lucide는 stroke 아이콘이지만 fill 줄 수 있음
              fill={isLiked ? "currentColor" : "none"}
            />
          )}
          <span className="text-sm tabular-nums">{likeCount}</span>
        </button>

        <div className="inline-flex items-center gap-1 text-gray-700">
          <MessageSquareText className="h-5 w-5" />
          <span className="text-sm tabular-nums">{commentCount}</span>
        </div>
      </div>

      <div className="relative flex w-full items-end">
        <div
          className={[
            "flex w-full items-center rounded-md border bg-white shadow-sm overflow-hidden",
            "focus-within:ring-2 focus-within:ring-black/5",
            disabled ? "opacity-60" : "",
          ].join(" ")}
        >
          <textarea
            ref={textareaRef}
            className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-gray-400 px-2 py-2"
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || pending}
            maxLength={maxLength}
            aria-label="댓글 입력"
          />

          {/* 전송 버튼(Enter 대체, 모바일 접근성 향상) */}
          <button
            type="button"
            onClick={submit}
            disabled={!canSubmit}
            aria-label="댓글 등록"
            className={[
              "inline-flex self-stretch w-12 items-center justify-center",
              canSubmit ? "bg-primary-main text-white" : "bg-gray-200 text-gray-500",
              "transition-colors",
            ].join(" ")}
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
          </button>
        </div>

        {/* 글자수 카운터 (우하단, 필요시만 표시) */}
        {showCounter && (
          <div className="pointer-events-none absolute -bottom-5 right-2 text-xs">
            <span className={remain < 0 ? "text-red-500" : "text-gray-400"}>
              {remain < 0 ? `글자수 초과 (${remain})` : `${value.length}/${maxLength}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
