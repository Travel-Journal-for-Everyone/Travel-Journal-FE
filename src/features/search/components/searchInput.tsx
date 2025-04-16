import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="장소, 사람 검색하기"
        className="w-full px-4 py-2 pr-10 border rounded-md text-sm shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={16}
      />
    </div>
  );
}
