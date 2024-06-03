import { ContentWrapperLoading } from "@/components/shared/content-wrapper-loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomMarkdown } from "@/components/ui/custom-markdown";
import { useApplicationDashboardLayout } from "@/features/application-dashboard/hooks/use-application-dashboard-layout";
import { cn } from "@/lib/utils";
import { PlayIcon } from "@radix-ui/react-icons";
import { useFunctionContent } from "../hooks/use-function-content";
import { markdownCode } from "../utils";
import { FunctionMetrics } from "./function-metrics";
import { FunctionSchedule } from "./function-schedule";

export interface FunctionContentProps
    extends React.HTMLAttributes<HTMLDivElement> {
    appId: string;
    filename: string;
    selectedMethod: string;
}

export function FunctionContent({
    appId,
    filename,
    className,
    selectedMethod,
    ...props
}: Readonly<FunctionContentProps>) {
    const {
        data: code,
        isLoading,
        method,
    } = useFunctionContent({
        appId,
        filename,
        selectedMethod,
    });

    const {
        refResize
    } = useApplicationDashboardLayout()

    return (
        <ContentWrapperLoading
            isLoading={isLoading}
            className={cn("w-full h-full space-y-4", className)}
            {...props}
        >
            <div className="flex justify-between">
                <div className="flex items-center">
                    <p className="text-lg font-bold">{selectedMethod}</p>
                    <Badge className="text-black bg-slate-300 hover:bg-slate-300 ml-2">
                        {method?.type}
                    </Badge>
                </div>
                <Button
                    onClick={() => refResize.current?.resize(75)}
                    className="text-white"
                    variant="default"
                >
                    <PlayIcon className="mr-2 h-4 w-4" />
                    Run Function
                </Button>
            </div>
            <Badge className="text-black bg-slate-300 hover:bg-slate-300 max-w-fit">
                {`${filename}:${selectedMethod}`}
            </Badge>

            <FunctionMetrics />

            <FunctionSchedule />

            <CustomMarkdown
                highlightLine={method?.handlerLine}
            >
                {markdownCode("typescript", code)}
            </CustomMarkdown>
        </ContentWrapperLoading>
    );
}
