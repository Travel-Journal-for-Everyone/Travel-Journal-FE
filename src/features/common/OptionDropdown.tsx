"use client";

import { MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface OptionDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function OptionDropdown({ onEdit, onDelete }: OptionDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <MoreHorizontal className="w-5 h-5 text-gray-700" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md text-sm z-50">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
