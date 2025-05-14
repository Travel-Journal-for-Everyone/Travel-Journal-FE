import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

interface PageableResponse<T> {
  content: T[];
  totalPages: number;
  number: number;
  last: boolean;
}

type QueryParams = Record<string, string | number | boolean | undefined>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface UseInfinitePageOptions<T> {
  queryKey: (string | number)[];
  endpoint: string;
  params?: QueryParams;
  enabled?: boolean;
}

export function useInfinitePage<T>({
  queryKey,
  endpoint,
  params = {},
  enabled = true,
}: UseInfinitePageOptions<T>) {
  return useInfiniteQuery<PageableResponse<T>>({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const page = pageParam as number;
      const queryParams = new URLSearchParams({
        ...params,
        page: page.toString(),
      });

      const res = await axiosInstance.get(`${endpoint}?${queryParams}`);
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    enabled,
  });
}
