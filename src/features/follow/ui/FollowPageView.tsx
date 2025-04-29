"use client";

import { useState } from "react";
import {
  useFollowers,
  useFollowings,
  useFollowCount,
} from "../hooks/useIsFollowing";
import { useAuthStore } from "@/store/useAuthStore";
import FollowList from "../components/followList";
import { FollowTab } from "../components/followTab";

interface Props {
  memberId?: number;
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
      <FollowTab
        count={{
          followerCount: count?.followerCount ?? 0,
          followings: count?.followings ?? 0,
        }}
        tab={tab}
        onTabChange={setTab}
      />

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
