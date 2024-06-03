"use client";

import { ApplicationEntity } from "../types";
import { CreateApplicationDto } from "../types/dto";
import { useBaseCreateRecord } from "@/services/shared/hooks/use-base-create-record";

export const useCreateApplication = () => {
  return useBaseCreateRecord<ApplicationEntity, CreateApplicationDto>(
    "applications"
  );
};
