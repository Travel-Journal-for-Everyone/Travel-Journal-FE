"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useJournalRegion } from "../hooks/useJournalRegion";
import { useJournalPlace } from "../hooks/useJournalPlace";
import Image from "next/image";

interface RegionDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  regionName: string;
}

export default function RegionBottomSheet({
  isOpen,
  onClose,
  regionName,
}: RegionDetailPanelProps) {
  const [tab, setTab] = useState<"diary" | "place">("diary");
  const { data: journalData, isLoading: isJournalLoading } =
    useJournalRegion(regionName);
  const { data: placeData, isLoading: isPlaceLoading } =
    useJournalPlace(regionName);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // ✅ 640px 이하만 모바일로 본다
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return null; // ✅ PC에서는 아예 렌더링 안 함

  const diaries = journalData?.content ?? [];
  const places = placeData?.content ?? [];
  const isLoading = tab === "diary" ? isJournalLoading : isPlaceLoading;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 딤 배경 */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 바텀시트 */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onTouchStart={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest(".scrollable-content")) {
                e.stopPropagation();
              }
            }}
            className="fixed bottom-0 left-0 w-full h-[80%] bg-white z-50 rounded-t-2xl shadow-xl overflow-y-scroll"
          >
            <div className="p-6 scrollable-content">
              <h2 className="text-lg font-bold text-center">{regionName}</h2>

              {/* 탭 */}
              <div className="flex justify-center mt-4 mb-2 border-b">
                <button
                  onClick={() => setTab("diary")}
                  className={`py-2 text-sm font-medium w-full ${
                    tab === "diary"
                      ? "border-b-2 border-primary-main"
                      : "text-gray-400"
                  }`}
                >
                  여행 일지 {diaries.length}
                </button>
                <button
                  onClick={() => setTab("place")}
                  className={`py-2 text-sm font-medium w-full ${
                    tab === "place"
                      ? "border-b-2 border-primary-main"
                      : "text-gray-400"
                  }`}
                >
                  플레이스 {places.length}
                </button>
              </div>

              {/* 콘텐츠 */}
              {isLoading ? (
                <div className="text-center text-gray-400 mt-10">
                  로딩 중...
                </div>
              ) : tab === "diary" ? (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {diaries.map((item) => (
                    <div
                      key={item.journalId}
                      className="border rounded-md p-3 shadow-sm"
                    >
                      <div className="text-xs text-primary my-1 flex gap-2 ">
                        {item.hashTag.map((tag, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-primary-main mt-1 bg-primary-light p-2 py-1 rounded-full"
                          >
                            #{tag}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm font-semibold">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <span className="font-semibold">
                          {item.nights}박 {item.days}일
                        </span>
                        {item.startDate} ~ {item.endDate}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {places.map((item) => (
                    <div key={item.placeId}>
                      <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        width={360}
                        height={360}
                        className="w-full object-cover rounded-md aspect-square"
                      />
                      <div className="text-sm font-semibold mt-2">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">{item.region}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
