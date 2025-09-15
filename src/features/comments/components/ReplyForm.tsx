// features/comments/components/ReplyForm.tsx
"use client";
import { useState } from "react";

export default function ReplyForm({
  onSubmit,
  onCancel,
  disabled,
  maxLength = 1000,
}: {
  onSubmit: (content: string) => Promise<void> | void;
  onCancel?: () => void;
  disabled?: boolean;
  maxLength?: number;
}) {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);

  const remain = maxLength - value.length;
  const canSubmit = !disabled && !pending && value.trim().length > 0 && value.length <= maxLength;

  const submit = async () => {
    try {
      setPending(true);
      await onSubmit(value.trim());
      setValue("");
      onCancel?.();
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mt-2 rounded-lg border p-2">
      <textarea
        className="w-full rounded border px-2 py-1 text-sm"
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="답글을 입력하세요"
        disabled={disabled || pending}
        maxLength={maxLength}
      />
      <div className="mt-1 flex items-center justify-between text-xs">
        <span className={remain < 0 ? "text-red-500" : "text-gray-500"}>
          {remain < 0 ? `글자수 초과 (${remain})` : `남은 글자수 ${remain}`}
        </span>
        <div className="flex gap-2">
          {onCancel && (
            <button className="rounded border px-2 py-1" onClick={onCancel} disabled={pending}>
              취소
            </button>
          )}
          <button className="rounded border px-2 py-1 disabled:opacity-50" onClick={submit} disabled={!canSubmit}>
            {pending ? "등록 중…" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
