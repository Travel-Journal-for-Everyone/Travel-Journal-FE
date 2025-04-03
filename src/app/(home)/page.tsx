/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemberInfo } from "../features/member/hooks/useMemberInfo";
import { Search } from "lucide-react";
import RegionMapComponent from "@/components/ui/RegioMapComponent";
import { regionMapData } from "../constants/RegionMapData";
import { SetStateAction, useState } from "react";
import RegionDetailPanel from "@/components/ui/RegionData";

export default function Home() {
  const { data: member, isLoading } = useMemberInfo();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  if (isLoading || !member) return <div>로딩 중...</div>;
  const mockDiaries: Record<string, any[]> = {};
  const mockPlaces: Record<string, any[]> = {};
  const regions = member.regions;
  return (
    <>
      <RegionDetailPanel
        isOpen={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
        regionName={selectedRegion || ""}
        diaries={mockDiaries[selectedRegion ?? ""] || []}
        places={mockPlaces[selectedRegion ?? ""] || []}
      />
      <div className="py-8 flex justify-between mx-20 max-w-screen-lg my-10">
        <div className="flex flex-col items-center gap-4 mt-12">
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

        <section className="mt-10">
          <div className="flex justify-center items-center">
            <div className="relative w-[500px] h-[771px]">
              <RegionMapComponent
                onSelectRegion={(region: SetStateAction<string | null>) =>
                  setSelectedRegion(region)
                }
              />
              {Object.entries(regionMapData).map(
                ([regionKey, { label, x, y }]) => {
                  const regionData = regions?.find(
                    (r: { regionName: string }) => r.regionName === label // ✅ 비교 연산자 고침
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
                        <span className="text-xs text-gray-400">
                          데이터 없음
                        </span>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
