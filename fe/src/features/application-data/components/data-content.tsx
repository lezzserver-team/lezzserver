import { ContentWrapperLoading } from "@/components/shared/content-wrapper-loading";
import { cn } from "@/lib/utils";
import React from "react";
import { DataContentTable } from "./data-content-table";

import { Button } from "@/components/ui/button";

import { CodeEditor } from "@/components/shared/code-editor";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DrawerMenu } from "@/features/applications/layouts/drawer-menu";
import { PlusIcon } from "@radix-ui/react-icons";
import { FilterIcon } from "lucide-react";
import Link from "next/link";
import { useDataContent } from "../hooks/use-data-content";
import { DataThreeDotsMenu } from "./data-three-dots-menu";

export interface DataContentProps
    extends React.HTMLAttributes<HTMLDivElement> {
    appId: string;
    selectedTable: string;
}

export function DataContent({
    appId,
    selectedTable,
    className,
    ...props
}: Readonly<DataContentProps>) {
    const { isLoading, addDocumentDefaultJson } = useDataContent()

    return (
        <ContentWrapperLoading
            isLoading={isLoading}
            className={cn("w-full h-full space-y-4", className)}
            {...props}
        >
            <div className="space-y-2">
                <div className="w-full flex items-center justify-between">
                    <p className="text-lg font-bold">todo</p>
                    <div className="space-x-2">
                        <DrawerMenu
                            drawerTrigger={
                                <Button variant="outline">
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Add Documents
                                </Button>
                            }
                        >
                            <div className='mx-auto w-full p-5'>
                                <DrawerHeader>
                                    <DrawerTitle>
                                        Add new documents
                                        <p className="text-sm font-normal">
                                            <Link href="#" className="text-primary hover:underline">Learn more</Link> about adding documents.
                                        </p>
                                    </DrawerTitle>
                                    <DrawerDescription>

                                    </DrawerDescription>
                                </DrawerHeader>
                                <CodeEditor defaultValue={addDocumentDefaultJson} />
                            </div>
                        </DrawerMenu>

                        <Button variant="outline">
                            <FilterIcon className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <DataThreeDotsMenu />
                    </div>
                </div>
                <p className="text-xs"><span className="font-bold">3</span> documents</p>
            </div>
            <DataContentTable />
        </ContentWrapperLoading>
    );
}
