import { useState } from "react";

export interface UseFunctionScheduleProps { }

export const useFunctionSchedule = () => {
    const [scheduleRunCount, setScheduleRunCount] = useState(0)

    return {
        scheduleRunCount
    };
};
