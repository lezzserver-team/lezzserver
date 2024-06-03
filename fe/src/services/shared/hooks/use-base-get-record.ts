"use client";

import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { BaseApi } from "../api";
import { QueryKeyFactory } from "../query-key.factory";
import type { BaseFindOneRecordDto } from "../types";

export const useBaseGetRecord = <T>(
  endpoint: string,
  payload: { id: string; dto?: BaseFindOneRecordDto<T> },
  options?: Pick<UseQueryOptions<T>, "enabled" | "queryFn">,
) => {
  const baseApi = new BaseApi<T>(endpoint);
  const queryKeyFactory = new QueryKeyFactory<T>(endpoint);

  return useQuery<T>({
    queryKey: queryKeyFactory.detail(payload.id, payload.dto),
    queryFn: () => baseApi.findOne(payload.id, payload.dto),
    ...options,
  });
};
