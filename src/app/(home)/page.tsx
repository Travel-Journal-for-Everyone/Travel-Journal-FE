"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMyInfo } from "@/features/member/hooks/useMemberInfo";
import { Search } from "lucide-react";
import { regionMapData } from "@/features/map/constants/RegionMapData";
import { SetStateAction, useState } from "react";
import RegionDetailPanel from "@/features/map/components/RegionData";
import RegionMap from "@/features/map/RegionMap";
import ProfileCard from "@/features/common/ProfileCard";
import Image from "next/image";
import RegionBottomSheet from "@/features/map/components/RegionDataMobile";

export default function Home() {
  const router = useRouter();
  const { data, isError } = useMyInfo();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const regions = data?.regions ?? [];

  useEffect(() => {
    if (isError) {
      console.log("로그인 필요! (isError)", data);
      router.push("/login");
    }
  }, [isError, router]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-24  md:max-w-screen-lg justify-center md:justify-normal  md:mt-24 md:mx-20">
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
          {!data ? (
            <div></div>
          ) : (
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
          )}
        </div>
        <section>
          <div className="flex justify-center items-center">
            <div className="relative w-full md:min-w-[500px]">
              {!data ? (
                <RegionMap />
              ) : (
                <>
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
                          className="absolute text-center md:text-sm text-xs pointer-events-none md:max-w-full md:min-w-[100px] min-w-[80px]"
                          style={{ top: y, left: x }}
                        >
                          <p className="font-semibold mt-2 md:mt-0">{label}</p>
                          {regionData ? (
                            <>
                              <div className="hidden md:flex flex-wrap gap-1 items-center mt-1.5 ">
                                <div className="flex flex-wrap">
                                  <div className="relative w-4 h-4">
                                    <Image
                                      src="/icons/Icon-paper-gray-18px.svg"
                                      alt="Diary"
                                      fill
                                    />
                                  </div>
                                  <span className=" text-gray7">
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
                                      alt="profile"
                                      fill
                                    />
                                  </div>
                                  <span className=" text-gray7 ">
                                    {regionData.placesCount > 99
                                      ? "99+"
                                      : regionData.placesCount}
                                    곳
                                  </span>
                                </div>
                              </div>

                              <RegionDetailPanel
                                isOpen={!!selectedRegion}
                                onClose={() => setSelectedRegion(null)}
                                regionName={selectedRegion || ""}
                              />
                            </>
                          ) : (
                            <div className="min-w-full"></div>
                          )}
                        </div>
                      );
                    }
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        <div className="block md:hidden">
          <RegionBottomSheet
            isOpen={!!selectedRegion}
            onClose={() => setSelectedRegion(null)}
            regionName={selectedRegion || ""}
          />
        </div>

        <div className="hidden md:block">
          <RegionDetailPanel
            isOpen={!!selectedRegion}
            onClose={() => setSelectedRegion(null)}
            regionName={selectedRegion || ""}
          />
        </div>
      </div>
    </>
  );
}
