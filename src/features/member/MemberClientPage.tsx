"use client";

import { useMemberInfo } from "@/features/member/hooks/useMemberInfo";
import { regionMapData } from "@/features/map/constants/RegionMapData";
import { SetStateAction, useState } from "react";
import RegionDetailPanel from "@/features/map/components/RegionData";
import RegionMap from "@/features/map/RegionMap";
import ProfileCard from "@/features/common/ProfileCard";

interface Props {
  memberId: number;
}

export default function MemberClientPage({ memberId }: Props) {
  const { data, isLoading } = useMemberInfo(memberId);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  if (isLoading) return <div>로딩 중...</div>;
  if (!data) return <div>유저 정보를 불러올 수 없습니다.</div>;

  const accountScope = data.profileInfo.accountScope;
  const regions = data.regions ?? [];

  return (
    <div className="mt-20">
      <ProfileCard
        mobile={false}
        nickname={data.profileInfo.nickname}
        profileImageUrl={data.profileInfo.profileImageUrl}
        accountScope={data.profileInfo.accountScope}
        followerCount={data.profileInfo.followerCount}
        followingCount={data.profileInfo.followingCount}
        travelDiaryCount={data.profileInfo.travelDiaryCount}
        placesCount={data.profileInfo.placesCount}
      />

      {accountScope === "PUBLIC" ? (
        <>
          <section>
            <div className="flex justify-center items-center">
              <div className="relative w-full md:min-w-[400px] max-w-[400px]">
                <RegionMap
                  onSelectRegion={(region: SetStateAction<string | null>) =>
                    setSelectedRegion(region)
                  }
                />
                {Object.entries(regionMapData).map(
                  ([regionKey, { label, x, y }]) => {
                    const regionData = regions?.find(
                      (r: { regionName: string }) =>
                        label === "서울 · 경기 · 인천"
                          ? r.regionName === "수도권"
                          : r.regionName === label
                    );
                    return (
                      <div
                        key={regionKey}
                        className="absolute text-center text-sm pointer-events-none"
                        style={{ top: y, left: x }}
                      >
                        <p className="font-semibold">{label}</p>
                        {regionData ? (
                          <span className="text-xs text-gray-500">
                            {regionData.travelDiaryCount}일지 /{" "}
                            {regionData.placesCount}곳
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400"></span>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </section>

          <RegionDetailPanel
            isOpen={!!selectedRegion}
            onClose={() => setSelectedRegion(null)}
            regionName={selectedRegion || ""}
          />
        </>
      ) : (
        <div className="text-center text-sm text-gray-500 w-full">
          <div className="flex justify-center items-center">
            <div className="relative w-full md:min-w-[400px] max-w-[400px]">
              <div className="absolute w-full h-full backdrop-blur-md flex justify-center items-center">
                <span className="text-gray-600 text-sm font-medium">
                  {accountScope === "PRIVATE"
                    ? "나만 보기 계정입니다"
                    : "친구만 보기 계정입니다"}
                </span>
              </div>
              <RegionMap />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
