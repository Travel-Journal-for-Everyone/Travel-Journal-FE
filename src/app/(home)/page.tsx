/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemberInfo } from "@/features/member/hooks/useMemberInfo";
import { Search } from "lucide-react";
import { regionMapData } from "@/features/map/constants/RegionMapData";
import { SetStateAction, useState } from "react";
import RegionDetailPanel from "@/features/map/components/RegionData";
import RegionMap from "@/features/map/RegionMap";
import ProfileCard from "@/features/common/ProfileCard";

export default function Home() {
  const { data } = useMemberInfo();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const member = data?.profileInfo ?? [];
  const regions = data?.regions ?? [];

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-24  md:max-w-screen-lg justify-center md:justify-normal md:mt-24 mt-4 md:mx-20 mx-2">
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
        <div className="block md:hidden">
          <ProfileCard
            nickname={member.nickname}
            profileImageUrl={member.profileImageUrl}
            accountScope={member.accountScope}
            followerCount={member.followerCount}
            followingCount={member.followingCount}
            travelDiaryCount={member.travelDiaryCount}
            placesCount={member.placesCount}
          />
        </div>
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
                      className="absolute text-center text-sm pointer-events-none "
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
      </div>
    </>
  );
}
