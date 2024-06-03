"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { BaseApi } from "../api";
import { QueryKeyFactory } from "../query-key.factory";
import type { BaseUpdateDto } from "../types";

export const useBaseUpdateRecord = <Entity, Dto>(
  endpoint: string,
  options?: UseMutationOptions<Entity, Error, BaseUpdateDto<Dto>>,
) => {
  const baseApi = new BaseApi<Entity>(endpoint);
  const queryKeyFactory = new QueryKeyFactory<Entity>(endpoint);

  return useMutation<Entity, Error, BaseUpdateDto<Dto>>({
    mutationFn: (dto) => baseApi.update<Dto>(dto.id, dto.data),
    mutationKey: queryKeyFactory.update(),
    ...options,
  });
};
