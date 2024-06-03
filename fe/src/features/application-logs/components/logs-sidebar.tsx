import { FancyMultiSelect } from "@/components/shared/fancy-multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import { ApplicationInnerSidebar } from "@/features/application-dashboard/components/application-inner-sidebar";
import { useFindFunction } from "@/services/functions/hooks/use-find-function";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { useLogsPage } from "../hooks/use-logs-page";
import { FUNCTION_STATUS, LOG_SEVERITY } from "../utils/constants";

export function LogsSidebar() {
    const { appId } = useParams()
    const { data: functions } = useFindFunction(appId as string)
    const { onSearch, search, isLoading } = useLogsPage()

    return (
        <ApplicationInnerSidebar
            onSearch={onSearch}
            search={search}
            searchPlaceholder="Filter logs..."
            isLoading={isLoading}
            className="space-y-4"
        >
            <div className="space-y-2">
                <p className="text-sm font-medium mb-3">FUNCTIONS</p>
                <FancyMultiSelect
                    data={functions?.map((functionItem) => [...functionItem.methods].reverse().map((method) => {
                        return { label: `${functionItem.displayName}:${method}`, value: `${functionItem.displayName}:${method}` }
                    })).flat()}
                    placeholder="Select functions..."
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center mb-3">
                    <p className="text-sm font-medium">FUNCTION STATUS</p>
                    <QuestionMarkCircledIcon className="ml-2 h-4 w-4" />
                </div>

                {FUNCTION_STATUS.map((status) => (
                    <div
                        key={status.label}
                        className="flex space-x-2 items-center justify-between"
                    >
                        <div className="flex items-center">
                            <Checkbox checked={status.checked} />
                            <p className="ml-2">{status.label}</p>
                        </div>
                        <p>0</p>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <div className="flex items-center mb-3">
                    <p className="text-sm font-medium">LOG SEVERITY</p>
                    <QuestionMarkCircledIcon className="ml-2 h-4 w-4" />
                </div>

                {LOG_SEVERITY.map((status) => (
                    <div
                        key={status.label}
                        className="flex space-x-2 items-center justify-between"
                    >
                        <div className="flex items-center">
                            <Checkbox checked={status.checked} />
                            <p className="ml-2">{status.label}</p>
                        </div>
                        <p>0</p>
                    </div>
                ))}
            </div>
        </ApplicationInnerSidebar>
    )
}