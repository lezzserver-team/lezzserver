import type { UndefinedInitialDataInfiniteOptions } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { BaseApi } from "../api";
import { QueryKeyFactory } from "../query-key.factory";
import type { BaseFindRecordsDto, InfiniteRecord } from "../types";

export const useBaseInfiniteFindRecord = <T>(
  endpoint: string,
  payload: { dto?: BaseFindRecordsDto<T> },
  options?: Pick<
    UndefinedInitialDataInfiniteOptions<InfiniteRecord<T>>,
    "enabled"
  >,
) => {
  const baseApi = new BaseApi<T>(endpoint);
  const queryKeyFactory = new QueryKeyFactory<T>(endpoint);

  const query = useInfiniteQuery<InfiniteRecord<T>>({
    queryKey: queryKeyFactory.pagination(payload.dto),
    queryFn: ({ pageParam = 0 }) => {
      return baseApi.findAllConnectionInfinite(
        payload.dto ?? {},
        pageParam as number,
      );
    },
    getNextPageParam: ({ hasMore }) => hasMore,
    initialPageParam: 0,
    ...options,
  });

  const mappedData = useMemo(() => {
    if (!query.data) return [];

    let result: T[] = [];

    query.data.pages.forEach((page) => {
      if (Array.isArray(page.data)) {
        result = result.concat(page.data);
      }
    });

    return result;
  }, [query.data]);

  return { mappedData, ...query };
};
