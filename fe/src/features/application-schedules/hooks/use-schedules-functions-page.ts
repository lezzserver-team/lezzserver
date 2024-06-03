import { useFindFunction } from "@/services/functions/hooks/use-find-function";
import { useParams } from "next/navigation";

export const useSchedulesFunctionsPage = () => {
  const { appId } = useParams();
  const { data: functions } = useFindFunction(appId as string);
  const MDEmptyAllFunctions = `import { mutation, internalMutation } from "./_generated/server";
import { api } from "./_generated/api";

export const delayedClearPresenceData = mutation({
    handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(5000, api.presence.clear);
    },
});`;

  return {
    MDEmptyAllFunctions,
    functions,
  };
};
