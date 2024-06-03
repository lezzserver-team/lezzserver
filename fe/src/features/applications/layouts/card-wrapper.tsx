import {
    Card,
    CardContent
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function CardWrapper({
    children,
    className,
    ...props
}: Readonly<CardWrapperProps>) {
    return (
        <Card>
            <CardContent
                className={cn("overflow-auto p-5", className)}
                {...props}
            >
                {children}
            </CardContent>
        </Card>
    )
}