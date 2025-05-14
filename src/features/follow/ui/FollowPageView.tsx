"use client";

import { useState } from "react";
import {
  useFollowers,
  useFollowings,
  useFollowCount,
} from "../hooks/useIsFollowing";
import { useAuthStore } from "@/store/useAuthStore";
import FollowList from "@/features/follow/components/followList";
import { FollowTab } from "../components/followTab";
import { TopBar } from "@/features/common/TopBar";
import { useMemberInfo } from "@/features/member/hooks/useMemberInfo";
import FollowRequestList from "../components/followRequestList";

interface Props {
  memberId?: number;
}

export default function FollowPageView({ memberId }: Props) {
  const myMemberId = useAuthStore((state) => state.user?.memberId);
  const myNickname = useAuthStore((state) => state.profileInfo?.nickname);
  const isMyPage = !memberId || memberId === myMemberId;
  const targetId = memberId ?? myMemberId;

  const { data: count } = useFollowCount(targetId!);
  const { data: followers } = useFollowers(targetId!);
  const { data: followings } = useFollowings(targetId!);
  const [tab, setTab] = useState<"followers" | "followings">("followings");

  const { data: otherUser } = useMemberInfo(!isMyPage ? targetId! : 0);
  const nickname = isMyPage
    ? myNickname ?? "내 프로필"
    : otherUser?.profileInfo.nickname ?? "회원";

  return (
    <div className="max-w-xl mx-auto">
      <TopBar title={nickname} center={true} />

      {/* 팔로잉 / 팔로워 탭 */}
      <FollowTab
        count={{
          followerCount: count?.followerCount ?? 0,
          followings: count?.followings ?? 0,
        }}
        tab={tab}
        onTabChange={setTab}
      />

      {/* 항상 보이는 요청 리스트 */}
      <section className="pt-4">
        <FollowRequestList />
      </section>

      {/* 구분선 */}
      <hr className="my-6 border-gray-300" />

      {/* 팔로워 / 팔로잉 리스트 */}
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
