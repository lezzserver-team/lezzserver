"use client";

import { useBaseFindRecord } from "@/services/shared/hooks/use-base-find-record";
import { BaseFindRecordsDto } from "@/services/shared/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { FunctionEntity } from "../types";

export const useFindFunction = (
  appId: string,
  dto?: BaseFindRecordsDto<FunctionEntity>,
  options?: Omit<UseQueryOptions<FunctionEntity[]>, "initialData">,
) => {
  return useBaseFindRecord<FunctionEntity>(
    `projects/${appId}/modules`,
    { dto },
    options,
  );
};
