"use client";

import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { BaseFindOneRecordDto } from "@/services/shared/types";

import { api } from "@/lib/api";
import { QueryKeyFactory } from "@/services/shared/query-key.factory";
import { FunctionEntity } from "../types";

export const useGetFunction = (
  appId: string,
  filename: string,
  dto?: BaseFindOneRecordDto<FunctionEntity>,
  options?: Omit<UseQueryOptions<string>, "initialData">,
) => {
  const queryKeyFactory = new QueryKeyFactory<string>(
    `/projects/${appId}/module/${filename}/code`,
  );

  return useQuery<string>({
    queryKey: queryKeyFactory.detail(appId, dto),
    queryFn: async () => {
      const baseApi = await api.get(
        `/projects/${appId}/module/${filename}/code`,
      );
      return baseApi.data;
    },
    ...options,
  });
};
