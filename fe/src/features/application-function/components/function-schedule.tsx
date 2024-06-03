import { FunctionScheduleIcon } from "@/components/icons/function-schedule";
import { NewTabIcon } from "@/components/icons/new-tab";
import { TrashIcon } from "@/components/icons/trash";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFunctionSchedule } from "../hooks/use-function-schedule";

export interface FunctionScheduleProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function FunctionSchedule({ className, ...props }: FunctionScheduleProps) {
    const { scheduleRunCount } = useFunctionSchedule()

    return (
        <Card className={cn("flex items-center justify-between p-5 space-x-2", className)} {...props}>
            <div className="flex space-x-2 items-center">
                <FunctionScheduleIcon className="mr-2" />
                <p className="text-lg">Scheduled Runs</p>
                <p className="text-sm"><span className="font-bold">{scheduleRunCount}</span> runs scheduled</p>
            </div>
            <div className="flex space-x-2 items-center">
                <Button withTooltip={true} tooltipMessage={"There are no runs to view."} disabled={true} className="text-white flex items-center">
                    <NewTabIcon className="mr-2 h-4 w-4" />
                    View All
                </Button>
                <Button withTooltip={true} tooltipMessage={"There are no runs to cancel."} disabled={true} className="text-white" variant="destructive">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Cancel All
                </Button>
            </div>
        </Card>
    )
}