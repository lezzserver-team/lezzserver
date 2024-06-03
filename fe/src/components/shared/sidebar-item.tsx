import { HTMLAttributes } from "react";

import { combineClass } from "@/utils/functions/format";
import { Button } from "../ui/button";

interface SidebarItemProps extends HTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
}

export function SidebarItem({
    children,
    className,
    isActive,
    ...props
}: SidebarItemProps): React.JSX.Element {
    return (
        <Button
            className={combineClass(
                "justify-start text-muted-foreground hover:text-primary-foreground hover:bg-primary-foreground/5 h-10 font-normal",
                isActive && "text-primary-foreground bg-primary-foreground/5",
                className
            )}
            variant="ghost"
            {...props}
        >
            {children}
        </Button>
    );
}
