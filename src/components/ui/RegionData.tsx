/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface RegionDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  regionName: string;
  diaries: { title: string; image: string; location: string }[];
  places: { title: string; image: string; location: string }[];
}

export default function RegionDetailPanel({
  isOpen,
  onClose,
  regionName,
  diaries,
  places,
}: RegionDetailPanelProps) {
  const [tab, setTab] = useState<"diary" | "place">("diary");

  return (
    <>
      <motion.button
        onClick={onClose}
        animate={{
          right: isOpen ? 400 : 0, // 패널 열리면 400px 밖, 닫히면 우측 끝
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-64 transform bg-white border rounded-sm  py-4 z-50"
        style={{ zIndex: 60 }} // 패널보다 위
      >
        {isOpen ? <ChevronRight /> : <ChevronLeft />}
      </motion.button>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-xl z-50 overflow-y-auto "
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

          <div className="grid grid-cols-2 gap-4 mt-4">
            {(tab === "diary" ? diaries : places).map((item, i) => (
              <div key={i}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-24 object-cover rounded-md"
                />
                <div className="text-sm mt-1 font-medium">{item.title}</div>
                <div className="text-xs text-gray-500">{item.location}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
