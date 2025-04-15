"use client";

import Image from "next/image";
import MyPageMenu from "./components/mypageMenu";
import { ChevronLeft, Globe, Lock, User } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useProfile } from "@/features/member/hooks/useProfile";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const { setProfileInfo } = useAuthStore();
  const { data, isLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (data?.profileInfo) {
      const { nickname, accountScope, profileImageUrl } = data.profileInfo;
      setProfileInfo({ nickname, accountScope, profileImageUrl });
    }
  }, [data]);

  if (isLoading || !data?.profileInfo) return <div>로딩 중...</div>;

  const profile = data.profileInfo;

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <div className="mx-auto px-4 py-8">
        <div className="flex my-4 -ml-2">
          <button onClick={handleBack}>
            <ChevronLeft />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={profile.profileImageUrl || "/default-avatar.png"}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center mb-4 gap-1">
              <h2 className="text-xl font-bold">{profile.nickname}</h2>
              <div className="text-gray-500">
                {profile.accountScope === "PUBLIC" && <Globe className="w-4" />}
                {profile.accountScope === "FRIENDS" && <User className="w-4" />}
                {profile.accountScope === "PRIVATE" && <Lock className="w-4" />}
              </div>
            </div>
            <dl className="flex justify-between">
              <div className="flex items-center gap-2">
                <dt className="text-gray-500">팔로워</dt>
                <dd className="font-semibold">{profile.followerCount}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="text-gray-500">팔로잉</dt>
                <dd className="font-semibold">{profile.followingCount}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="text-gray-500">여행일지</dt>
                <dd className="font-semibold">{profile.travelDiaryCount}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="text-gray-500">플레이스</dt>
                <dd className="font-semibold">{profile.placesCount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <MyPageMenu />
    </>
  );
}
