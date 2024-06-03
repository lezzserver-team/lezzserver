export const useSchedulesCronsPage = () => {
  const MDEmptyCrons = `import { cronJobs } from "lezzserver/server";
import { api, internal } from "./_generated/api";

const crons = cronJobs();
crons.interval("clear presence data", { seconds: 60 }, internal.presence.clear);
crons.daily("another cron job", { hourUTC: 19, minuteUTC: 30 }, api.another.default);
export default crons;`;

  return {
    MDEmptyCrons,
  };
};
