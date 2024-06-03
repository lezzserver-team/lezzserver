"use client";

import { useBaseFindRecord } from "@/services/shared/hooks/use-base-find-record";
import { BaseFindRecordsDto } from "@/services/shared/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { ApplicationEntity } from "../types";

export const useFindApplication = (
  dto?: BaseFindRecordsDto<ApplicationEntity>,
  options?: Omit<UseQueryOptions<ApplicationEntity[]>, "initialData">,
) => {
  return useBaseFindRecord<ApplicationEntity>("projects", { dto }, options);
};
