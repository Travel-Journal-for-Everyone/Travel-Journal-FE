import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

type TabValue = "member" | "place" | "diary";

interface SearchParams {
  tab: TabValue;
  keyword: string;
  page?: number;
  size?: number;
}

export const useSearch = ({
  tab,
  keyword,
  page = 0,
  size = 10,
}: SearchParams) => {
  const debouncedKeyword = useDebounce(keyword);

  return useQuery({
    queryKey: ["search", tab, debouncedKeyword, page, size],
    queryFn: async () => {
      const endpointMap: Record<TabValue, string> = {
        member: "/v1/search/members",
        place: "/v1/search/places",
        diary: "/v1/search/journals",
      };

      const res = await axiosInstance.get(endpointMap[tab], {
        params: { keyword: debouncedKeyword, page, size },
      });

      return res.data;
    },
    enabled: !!debouncedKeyword,
    staleTime: 1000 * 30,
  });
};
