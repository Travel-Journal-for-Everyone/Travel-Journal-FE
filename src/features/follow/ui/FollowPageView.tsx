"use client";

import { useState } from "react";
import {
  useFollowers,
  useFollowings,
  useFollowCount,
} from "../hooks/useIsFollowing";
import { useAuthStore } from "@/store/useAuthStore";
import FollowList from "../components/followList";

interface Props {
  memberId?: number; // 없으면 내 정보
}

export default function FollowPageView({ memberId }: Props) {
  const myMemberId = useAuthStore((state) => state.user?.memberId);
  const isMyPage = !memberId || memberId === myMemberId;
  const targetId = memberId ?? myMemberId;

  const { data: count } = useFollowCount(targetId!);
  const { data: followers } = useFollowers(targetId!);
  const { data: followings } = useFollowings(targetId!);

  const [tab, setTab] = useState<"followers" | "followings">("followers");

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <div className="flex justify-around border-b pb-2">
        <button onClick={() => setTab("followers")}>
          팔로워 {count?.followerCount ?? 0}
        </button>
        <button onClick={() => setTab("followings")}>
          팔로잉 {count?.followings ?? 0}
        </button>
      </div>

      {tab === "followers" ? (
        <FollowList
          data={followers ?? []}
          type="followers"
          isMyPage={isMyPage}
        />
      ) : (
        <FollowList
          data={followings ?? []}
          type="followings"
          isMyPage={isMyPage}
        />
      )}
    </div>
  );
}
