import { cn } from "@/lib/utils"

export interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function ContentWrapper({
    children,
    className,
    ...props
}: Readonly<ContentWrapperProps>) {
    return (
        <div
            className={cn("bg-primary-foreground/5 w-full h-[90vh] overflow-auto", className)}
            {...props}
        >
            {children}
        </div>
    )
}