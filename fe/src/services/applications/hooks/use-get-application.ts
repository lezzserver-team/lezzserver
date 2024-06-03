"use client";

import { UseQueryOptions } from "@tanstack/react-query";

import { useBaseGetRecord } from "@/services/shared/hooks/use-base-get-record";
import { BaseFindOneRecordDto } from "@/services/shared/types";

import { ApplicationEntity } from "../types";

export const useGetApplication = (
  id: string,
  dto?: BaseFindOneRecordDto<ApplicationEntity>,
  options?: Omit<UseQueryOptions<ApplicationEntity>, "initialData">
) => {
  return useBaseGetRecord<ApplicationEntity>(
    "applications",
    { id, dto },
    options
  );
};
