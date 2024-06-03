import { useGetFunction } from "@/services/functions/hooks/use-get-function";
import { parseFunctionCode } from "@/utils/functions/format";
import { useRouter } from "next/navigation";

export interface UseFunctionContentProps {
  appId: string;
  filename: string;
  selectedMethod: string;
}

export const useFunctionContent = ({
  appId,
  filename,
  selectedMethod,
}: UseFunctionContentProps) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetFunction(appId, filename);

  if (isError) {
    router.replace(`/dashboard/${appId}/functions`);
  }

  const method = parseFunctionCode(data ?? "", selectedMethod);

  return {
    data,
    isLoading,
    method,
  };
};
