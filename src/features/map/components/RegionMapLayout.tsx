// RegionMapLayout.tsx
import Image from "next/image";

interface RegionBlockProps {
  name: string;
  diaryCount: number;
  placeCount: number;
  icon: string;
  className?: string;
}

const RegionBlock = ({
  name,
  diaryCount,
  placeCount,
  icon,
  className,
}: RegionBlockProps) => {
  return (
    <div
      className={`bg-white rounded-[24px] p-4 flex flex-col justify-between shadow-md ${className}`}
    >
      <div>
        <p className="font-semibold whitespace-nowrap text-center text-sm md:text-base">
          {name}
        </p>
        <p className="text-xs text-gray-500 text-center">
          {diaryCount}일지 / {placeCount}곳
        </p>
      </div>
      <div className="w-6 h-6 mt-2 mx-auto">
        <Image src={icon} alt="icon" width={24} height={24} />
      </div>
    </div>
  );
};

export default function RegionMapLayout() {
  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-[3/5]">
      {/* 전체 맵을 퍼즐처럼 배치하기 위해 absolute 사용 */}
      <div className="absolute top-0 left-0 w-[60%] h-[25%]">
        <RegionBlock
          name="서울 · 경기 · 인천"
          diaryCount={57}
          placeCount={88}
          icon="/icons/tower.svg"
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-0 right-0 w-[40%] h-[40%]">
        <RegionBlock
          name="강원도"
          diaryCount={377}
          placeCount={444}
          icon="/icons/mountain.svg"
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-[25%] left-0 w-[40%] h-[25%]">
        <RegionBlock
          name="충청도"
          diaryCount={21}
          placeCount={5}
          icon="/icons/tree.svg"
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-[40%] right-0 w-[40%] h-[25%]">
        <RegionBlock
          name="경상도"
          diaryCount={97}
          placeCount={70}
          icon="/icons/umbrella.svg"
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-[50%] left-0 w-[60%] h-[30%]">
        <RegionBlock
          name="전라도"
          diaryCount={157}
          placeCount={665}
          icon="/icons/house.svg"
          className="w-full h-full"
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[20%]">
        <RegionBlock
          name="제주도"
          diaryCount={999}
          placeCount={1005}
          icon="/icons/stone.svg"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
