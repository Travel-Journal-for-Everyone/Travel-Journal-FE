"use client";

import { useMemberInfo } from "./features/member/hooks/useMemberInfo";
import Image from "next/image";
import RegionMapComponent from "@/components/ui/RegioMapComponent";
import { regionMapData } from "./constants/RegionMapData";

export default function Home() {
  const { data: member, isLoading } = useMemberInfo();

  if (isLoading || !member) return <div>로딩 중...</div>;

  const profile = member.profileInfo;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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

      <section className="mt-10">
        <div className="flex justify-center items-center">
          <div className="relative w-[500px] h-[771px]">
            <RegionMapComponent />
            {Object.entries(regionMapData).map(([id, { label, x, y }]) => (
              <div
                key={id}
                className="absolute text-center text-sm"
                style={{ top: y, left: x }}
              >
                <p className="font-semibold">{label}</p>
                <div className="text-xs text-gray-500 flex items-center gap-1 justify-center"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
