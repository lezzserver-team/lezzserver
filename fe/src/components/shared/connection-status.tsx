export interface ConnectionStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant: "green" | "red"
}

export function ConnectionStatus({
    children,
    variant
}: Readonly<ConnectionStatusProps>) {
    if (variant === "green") {
        return (
            <div className="flex items-center">
                <span className="w-4 h-4 rounded-xl mr-2 border bg-green-300 dark:bg-green-900 animate-pulse"></span>
                {children}
            </div>

        )
    }

    return (
        <div className="flex items-center">
            <span className="w-4 h-4 rounded-xl mr-2 border bg-red-300 dark:bg-red-900 animate-pulse"></span>
            {children}
        </div>
    )
}