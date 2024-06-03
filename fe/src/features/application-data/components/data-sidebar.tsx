import { SidebarItem } from "@/components/shared/sidebar-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ApplicationInnerSidebar } from "@/features/application-dashboard/components/application-inner-sidebar";
import { useRouter } from "@/hooks/use-router";
import { PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDataPage } from "../hooks/use-data-page";

export function DataSidebar() {
    const {
        tableParams,
        results,
        search,
        isLoading,
        onSearch,
    } = useDataPage()

    const router = useRouter()
    const pathname = usePathname()

    return (
        <ApplicationInnerSidebar onSearch={onSearch} search={search} isLoading={isLoading}>
            {results.map((item) => (
                <SidebarItem
                    key={item.displayName}
                    onClick={() => {
                        router.push(`${pathname}?table=${item.displayName}`)
                    }}
                    isActive={tableParams?.includes(item.displayName)}
                    className="w-full"
                >
                    {item.displayName}
                </SidebarItem>
            ))}
            <Button variant="ghost" className="flex justify-start items-center text-primary hover:text-primary">
                <PlusIcon className="mr-2 h-4 w-4" />
                <p>Create Table</p>
            </Button>

            <div className="flex flex-col justify-center">
                <Separator className="my-4" />

                <Button variant="secondary" className="muted">
                    Show Schema
                </Button>
            </div>
        </ApplicationInnerSidebar>
    )
}