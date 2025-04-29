"use client";

import Image from "next/image";
import MyPageMenu from "@/features/mypage/components/mypageMenu";
import { Globe, Lock, User } from "lucide-react";
import { useProfile } from "@/features/member/hooks/useProfile";

import ProfileCard from "@/features/common/ProfileCard";
import { TopBar } from "@/features/common/TopBar";
import { BtnLogout } from "@/features/common/btnLogout";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function MyPage() {
  const { data, isLoading } = useProfile();
  const userId = useAuthStore.getState().user?.memberId;
  if (isLoading || !data) return <div>로딩 중...</div>;

  return (
    <>
      <div className="hidden md:block">
        <TopBar title="마이페이지" backTo="/" />
      </div>
      <div className="hidden md:flex mx-auto px-4 py-8 gap-4">
        <div className="flex items-center">
          <Image
            src={data.profileImageUrl || "/default-avatar.png"}
            alt="프로필 이미지"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center mb-4 gap-1">
            <h2 className="text-xl font-bold">{data.nickname}</h2>
            <div className="text-gray-500">
              {data.accountScope === "PUBLIC" && <Globe className="w-4" />}
              {data.accountScope === "FRIENDS" && <User className="w-4" />}
              {data.accountScope === "PRIVATE" && <Lock className="w-4" />}
            </div>
          </div>
          <dl className="flex justify-between">
            <Link href={`/follow/${userId}`}>
              <div className="flex items-center gap-2">
                <dt className="text-gray-500">팔로워</dt>
                <dd className="font-semibold">{data.followerCount}</dd>
              </div>
            </Link>
            <Link href={`/follow/${userId}`}>
              <div className="flex items-center gap-2">
                <dt className="text-gray-500">팔로잉</dt>
                <dd className="font-semibold">{data.followingCount}</dd>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <dt className="text-gray-500">여행일지</dt>
              <dd className="font-semibold">{data.travelDiaryCount}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-gray-500">플레이스</dt>
              <dd className="font-semibold">{data.placesCount}</dd>
            </div>
          </dl>
        </div>
      </div>
      {!data ? (
        <div></div>
      ) : (
        <ProfileCard
          memberId={userId}
          mobile={true}
          nickname={data.nickname}
          profileImageUrl={data.profileImageUrl}
          accountScope={data.accountScope}
          followerCount={data.followerCount}
          followingCount={data.followingCount}
          travelDiaryCount={data.travelDiaryCount}
          placesCount={data.placesCount}
        />
      )}
      <MyPageMenu />
      <div className="px-4 py-4 text-sm font-medium text-red-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
        <BtnLogout />
      </div>
    </>
  );
}
