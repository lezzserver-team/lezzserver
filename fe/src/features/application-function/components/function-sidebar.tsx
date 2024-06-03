import { FunctionGroupIcon } from "@/components/icons/function-group";
import { FunctionItemIcon } from "@/components/icons/function-item";
import { SidebarItem } from "@/components/shared/sidebar-item";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ApplicationInnerSidebar } from "@/features/application-dashboard/components/application-inner-sidebar";
import { useRouter } from "@/hooks/use-router";
import { usePathname } from "next/navigation";
import { useFunctionPage } from "../hooks/use-function-page";

export function FunctionSidebar() {
    const {
        functionParams,
        results,
        search,
        onSearch,
        isLoading
    } = useFunctionPage()

    const router = useRouter()
    const pathname = usePathname()

    return (
        <ApplicationInnerSidebar onSearch={onSearch} search={search} isLoading={isLoading}>
            {results.map((item) => (
                <Collapsible key={item.filename} defaultOpen={functionParams.displayName.includes(item.displayName)}>
                    <CollapsibleTrigger
                        className="w-full"
                    >
                        <SidebarItem
                            isActive={functionParams.displayName.includes(item.displayName)}
                            className="w-full"
                        >
                            <FunctionGroupIcon className="mr-2 h-4 w-4" />
                            {item.displayName}
                        </SidebarItem>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col mx-2">
                        <div className="flex flex-col space-y-2 border-l-2 mt-2">
                            {[...item.methods].reverse().map((method) => {
                                return (
                                    <SidebarItem
                                        key={method}
                                        isActive={functionParams.method.includes(method)}
                                        onClick={() => {
                                            const functionParams = encodeURIComponent(`${item.displayName}:${method}`)
                                            router.push(`${pathname}?function=${functionParams}`)
                                        }}
                                        className="w-full ml-2"
                                    >
                                        <FunctionItemIcon className="mr-2 h-4 w-4" />
                                        {method}
                                    </SidebarItem>
                                );
                            })}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )
            )}
        </ApplicationInnerSidebar>
    )
}