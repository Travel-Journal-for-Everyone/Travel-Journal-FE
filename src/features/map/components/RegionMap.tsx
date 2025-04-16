"use client";

import RegionSVG from "@/assets/map/map.svg";

interface RegionMapComponentProps {
  onSelectRegion: (region: string) => void;
}
const decodeUnicodeId = (region: string | undefined) => {
  if (!region) return "";
  try {
    return new Function("return '" + region + "'")();
  } catch {
    return region;
  }
};

export default function RegionMap({ onSelectRegion }: RegionMapComponentProps) {
  return (
    <div className="w-full max-w-[485px]">
      <RegionSVG
        onClickCapture={(e: { target: SVGElement }) => {
          const target = e.target as SVGElement;
          const region = decodeUnicodeId(target.dataset.region);
          if (region) {
            onSelectRegion(region);
          }
        }}
        className="w-full h-auto cursor-pointer"
      />
    </div>
  );
}
