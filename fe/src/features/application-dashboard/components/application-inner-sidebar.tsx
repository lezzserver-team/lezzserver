import { Sidebar } from "@/components/layouts/side-bar";
import { ContentWrapperLoading } from "@/components/shared/content-wrapper-loading";
import { InputIcon } from "@/components/shared/input-icon";
import { IconProps } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";


export interface ApplicationInnerSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    search: string,
    onSearch: (e: string) => void,
    isLoading: boolean,
    searchPlaceholder?: string
}

export function ApplicationInnerSidebar({
    children,
    search,
    isLoading,
    onSearch,
    className,
    searchPlaceholder
}: Readonly<ApplicationInnerSidebarProps>) {
    return (
        <Sidebar className="flex flex-col p-2 max-w-[250px] border border-primary-foreground/5">
            <InputIcon
                icon={MagnifyingGlassIcon as React.ComponentType<IconProps>}
                placeholder={searchPlaceholder ?? "Search..."}
                value={search}
                onChange={(e) => onSearch(e.target.value)}
            />

            <Separator className="my-4" />

            <ContentWrapperLoading isLoading={isLoading} className={cn("flex-shrink-0 flex flex-col gap-2", className)}>
                {children}
            </ContentWrapperLoading>
        </Sidebar>
    )
}