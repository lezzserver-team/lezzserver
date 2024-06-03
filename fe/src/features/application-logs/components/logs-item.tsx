import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface LogsItemProps {
    date: string,
    hours: string,
    ms: string,
    status: string,
    type: string,
    query: string
}

export function LogsItem({
    date,
    hours,
    ms,
    status,
    type,
    query,
    className,
    ...props
}: Readonly<LogsItemProps & React.HTMLAttributes<HTMLDivElement>>) {
    return (
        <div className={cn("flex space-x-4", className)} {...props}>
            <p className="text-sm min-w-[100px]">{date},</p>
            <p className="text-sm min-w-[100px]">{hours}</p>
            <p className="text-sm min-w-[100px]">{ms}</p>
            <p className="text-sm min-w-[100px] text-green-500">{status}</p>
            <Badge className="flex justify-center text-center text-black bg-slate-300 hover:bg-slate-300 min-w-[100px]">
                {type}
            </Badge>
            <p className="text-sm min-w-[100px]">{query}</p>
        </div>
    )
}