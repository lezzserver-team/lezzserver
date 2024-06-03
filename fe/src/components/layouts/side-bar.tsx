import { combineClass } from "@/utils/functions/format";
import { HTMLAttributes } from "react";

export function Sidebar({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
    return (
        <div
            className={combineClass(
                "w-sidebar h-dashboard-content border-r flex bg-background",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
