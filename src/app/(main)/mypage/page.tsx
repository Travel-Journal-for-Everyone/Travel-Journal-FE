"use client";

import Image from "next/image";
import { useMemberInfo } from "../../features/member/hooks/useMemberInfo";
import MyPageMenu from "./components/mypageMenu";

export default function MyPage() {
  const { data: member, isLoading } = useMemberInfo();

  if (isLoading || !member) return <div>로딩 중...</div>;

  const profile = member.profileInfo;
  return (
    <>
      <div className="mx-auto px-4 py-8">
        {/* 닉네임 + 프로필 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={profile.profileImageUrl || "/default-avatar.png"}
              alt="프로필 이미지"
              width={72}
              height={72}
              className="rounded-full object-cover"
            />
            <div className="text-xl font-semibold">{profile.nickname}</div>
          </div>
        </div>

        {/* 통계 */}
        <div className="flex justify-around mt-6 text-center">
          <div>
            <div className="text-lg font-bold">{profile.followerCount}</div>
            <div className="text-sm text-gray-500">팔로워</div>
          </div>
          <div>
            <div className="text-lg font-bold">{profile.followingCount}</div>
            <div className="text-sm text-gray-500">팔로잉</div>
          </div>
          <div>
            <div className="text-lg font-bold">{profile.travelDiaryCount}</div>
            <div className="text-sm text-gray-500">여행일지</div>
          </div>
          <div>
            <div className="text-lg font-bold">{profile.placesCount}</div>
            <div className="text-sm text-gray-500">플레이스</div>
          </div>
        </div>
      </div>
      <MyPageMenu></MyPageMenu>
    </>
  );
}
