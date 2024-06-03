import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";

export const useCopy = () => {
  const { toast } = useToast();

  const onCopy = useCallback(
    async (text: string, message: string) => {
      await navigator.clipboard.writeText(text);
      toast({ title: message, variant: "success" });
    },
    [toast]
  );

  return { onCopy };
};
