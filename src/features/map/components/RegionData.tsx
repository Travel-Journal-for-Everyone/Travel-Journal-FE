"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useJournalRegion } from "../hooks/useJournalRegion";
import { useJournalPlace } from "../hooks/useJournalPlace";
import Image from "next/image";

interface RegionDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  regionName: string;
}

export default function RegionDetailPanel({
  isOpen,
  onClose,
  regionName,
}: RegionDetailPanelProps) {
  const [tab, setTab] = useState<"diary" | "place">("diary");
  const { data: journalData, isLoading: isJournalLoading } =
    useJournalRegion(regionName);
  const { data: placeData, isLoading: isPlaceLoading } =
    useJournalPlace(regionName);

  const diaries = journalData?.content ?? [];
  const places = placeData?.content ?? [];
  const isLoading = tab === "diary" ? isJournalLoading : isPlaceLoading;

  return (
    <>
      <motion.button
        onClick={onClose}
        animate={{
          right: isOpen ? 400 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-64 right-0 transform bg-white border rounded-sm py-4 z-50"
        style={{ zIndex: 60 }}
      >
        {isOpen ? <ChevronRight /> : <ChevronLeft />}
      </motion.button>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-lg font-bold text-center">{regionName}</h2>

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
              className={`w-full py-2 text-sm font-medium ${
                tab === "place"
                  ? "border-b-2 border-primary-main"
                  : "text-gray-400"
              }`}
            >
              플레이스 {places.length}
            </button>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-400 mt-10">로딩 중...</div>
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
                  <div className="text-sm font-semibold mt-2">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.region}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
