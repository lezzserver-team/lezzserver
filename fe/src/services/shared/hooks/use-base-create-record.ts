"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { BaseApi } from "../api";
import { QueryKeyFactory } from "../query-key.factory";

export const useBaseCreateRecord = <Entity, Dto>(
  endpoint: string,
  options?: UseMutationOptions<Entity, Error, Dto>,
) => {
  const baseApi = new BaseApi<Entity>(endpoint);
  const queryKeyFactory = new QueryKeyFactory<Entity>(endpoint);

  return useMutation<Entity, Error, Dto>({
    mutationFn: (dto) => baseApi.create<Dto>(dto),
    mutationKey: queryKeyFactory.create(),
    ...options,
  });
};
