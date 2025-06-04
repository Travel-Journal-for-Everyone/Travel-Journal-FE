"use client";

import { TopBar } from "@/features/common/TopBar";
import {
  unblockUser,
  useBlockList,
} from "@/features/member/hooks/useBlockList";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function BlockMember() {
  const { data } = useBlockList();
  const queryClient = useQueryClient();

  const handleUnBlock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    blockedId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("차단을 해제하시겠습니까?")) return;

    try {
      await unblockUser(blockedId);
      alert("차단 해제가 완료되었습니다.");

      // ✅ 캐시 무효화 → 새로운 리스트 반영
      queryClient.invalidateQueries({ queryKey: ["block-list"] });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("차단 해제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <TopBar title="차단 회원 관리" center />
      <ul className="space-y-4 mt-4 py-4 border-t">
        {data?.content && data.content.length > 0 ? (
          data.content.map((user) => (
            <li
              key={user.memberId}
              className="flex justify-between items-center"
            >
              <Link
                href={`/member/${user.memberId}`}
                className="flex items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <div className="relative w-14 h-14 ">
                    <Image
                      src={user.profileImageUrl}
                      alt="userProfile"
                      className="rounded-full"
                      fill
                    />
                  </div>
                  <span>{user.nickname}</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={(e) => handleUnBlock(e, user.memberId)}
                className="px-4 py-1 border rounded"
              >
                해제
              </button>
            </li>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            리스트가 존재하지 않습니다.
          </div>
        )}
      </ul>
    </>
  );
}
