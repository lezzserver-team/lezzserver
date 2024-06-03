"use client";

import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { BaseApi } from "../api";
import { QueryKeyFactory } from "../query-key.factory";
import type { BaseFindRecordsDto } from "../types";

export const useBaseFindRecord = <T>(
  endpoint: string,
  payload: { dto?: BaseFindRecordsDto<T> },
  options?: Omit<UseQueryOptions<T[]>, "initialData" | "queryKey">,
) => {
  const baseApi = new BaseApi<T>(endpoint);
  const queryKeyFactory = new QueryKeyFactory<T>(endpoint);

  return useQuery<T[]>({
    queryKey: queryKeyFactory.list(payload.dto),
    queryFn: () => baseApi.findAll(payload.dto),
    initialData: [],
    ...options,
  });
};
