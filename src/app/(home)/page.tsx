"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMyInfo } from "@/features/member/hooks/useMemberInfo";
import { Search } from "lucide-react";
import { regionMapData } from "@/features/map/constants/RegionMapData";
import RegionDetailPanel from "@/features/map/components/RegionData";
import RegionBottomSheet from "@/features/map/components/RegionDataMobile";
import RegionMap from "@/features/map/RegionMap";
import ProfileCard from "@/features/common/ProfileCard";
import Image from "next/image";
import LoginGuide from "@/features/common/LoginGuide";

export default function Home() {
  const router = useRouter();
  const { data, isError } = useMyInfo();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
  }, [isError, router]);

  if (!data) {
    return <LoginGuide />;
  }

  const regions = data.regions ?? [];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-24 justify-center md:justify-normal md:mt-20 md:mx-20">
      {/* 데스크탑: 검색 + 안내문 */}
      <div className="hidden md:flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">
          어떤 멋진 여행을 계획 하시나요? <span className="ml-1">😎</span>
        </h2>
        <div className="relative w-80">
          <input
            type="text"
            placeholder="장소 검색하기"
            className="w-full px-4 py-2 pr-10 border rounded-md shadow-sm outline-none text-sm placeholder-gray-400"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* 모바일: 프로필 카드 */}
      <div className="block md:hidden">
        <ProfileCard
          memberId={data.memberId}
          mobile={true}
          nickname={data.profileInfo.nickname}
          profileImageUrl={data.profileInfo.profileImageUrl}
          accountScope={data.profileInfo.accountScope}
          followerCount={data.profileInfo.followerCount}
          followingCount={data.profileInfo.followingCount}
          travelDiaryCount={data.profileInfo.travelDiaryCount}
          placesCount={data.profileInfo.placesCount}
        />
      </div>

      {/* ✅ 지도 및 라벨 + 패널 */}
      <section className="flex justify-center items-center">
        <div className="relative w-full mt-8 md:m-0 px-2 md:p-0 md:min-w-[450px] ">
          <RegionMap onSelectRegion={(region) => setSelectedRegion(region)} />

          {Object.entries(regionMapData).map(([regionKey, { label, x, y }]) => {
            const regionData = regions.find((r) =>
              label === "서울 · 경기 · 인천"
                ? r.regionName === "수도권"
                : r.regionName === label
            );

            return (
              <div
                key={regionKey}
                className="absolute text-center md:text-sm text-xs pointer-events-none md:max-w-full md:min-w-[100px] min-w-[80px]"
                style={{ top: y, left: x }}
              >
                <p className="font-semibold mt-2 md:mt-0">{label}</p>
                {regionData && (
                  <div className="hidden md:flex flex-wrap gap-1 items-center mt-1.5">
                    <div className="flex flex-wrap">
                      <div className="relative w-4 h-4">
                        <Image
                          src="/icons/Icon-paper-gray-18px.svg"
                          alt="Diary"
                          fill
                        />
                      </div>
                      <span className="text-gray7">
                        {regionData.travelDiaryCount > 99
                          ? "99+"
                          : regionData.travelDiaryCount}
                        일지
                      </span>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="relative w-4 h-4">
                        <Image
                          src="/icons/Icon-pin-gray-18px.svg"
                          alt="place"
                          fill
                        />
                      </div>
                      <span className="text-gray7">
                        {regionData.placesCount > 99
                          ? "99+"
                          : regionData.placesCount}
                        곳
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ✅ 모바일: 하단 시트 */}
      <div className="block md:hidden">
        <RegionBottomSheet
          isOpen={!!selectedRegion}
          onClose={() => setSelectedRegion(null)}
          regionName={selectedRegion || ""}
        />
      </div>

      {/* ✅ 데스크탑: 사이드 패널 */}
      <div className="hidden md:block">
        <RegionDetailPanel
          isOpen={!!selectedRegion}
          onClose={() => setSelectedRegion(null)}
          regionName={selectedRegion || ""}
        />
      </div>
    </div>
  );
}
