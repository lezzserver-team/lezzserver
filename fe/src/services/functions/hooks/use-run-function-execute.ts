import { useMutation } from "@tanstack/react-query";
import { runFunctionApi } from "../api";

interface UseRunFunctionProps {
  appId: string;
  filename: string;
  type: string;
  method: string;
}

export const useRunFunction = ({
  appId,
  filename,
  type,
  method,
}: UseRunFunctionProps) => {
  return useMutation<any, Error, any>({
    mutationFn: (dto) =>
      runFunctionApi.mutation(appId, filename, type, method, dto),
  });
};
