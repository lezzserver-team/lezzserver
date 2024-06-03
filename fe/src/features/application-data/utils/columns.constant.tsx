import {
    CaretSortIcon
} from "@radix-ui/react-icons"
import {
    CellContext,
    ColumnDef
} from "@tanstack/react-table"

import { CodeEditor } from "@/components/shared/code-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { DrawerMenu } from "@/features/applications/layouts/drawer-menu"
import { formatJson } from "@/utils/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

export type Todo = {
    _id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<Todo>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "_id",
        header: "_id",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("_id")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionComponent row={row} />
    },
]

function ActionComponent({
    row
}: Readonly<Partial<CellContext<Todo, unknown>>>) {
    const json = JSON.stringify({
        _id: '',
        status: ''
    });

    const [editDocumentDefaultJson, setEditDocumentDefaultJson] = useState<string>("");

    async function getFormattedJson(json: string) {
        const formattedJson = await formatJson(json)
        setEditDocumentDefaultJson(formattedJson)
    }

    useEffect(() => {
        getFormattedJson(json)
    }, [json])

    return (
        <DrawerMenu
            drawerTrigger={
                <Badge className="text-white cursor-pointer">
                    Edit
                </Badge>
            }
        >
            <div className='mx-auto w-full h-screen p-5 relative'>
                <DrawerHeader>
                    <DrawerTitle>
                        <p>
                            Edit document <span className="text-sm">{row?.original._id}</span>
                        </p>
                        <p className="text-sm font-normal">
                            <Link href="#" className="text-primary hover:underline">Learn more</Link> about editing documents.
                        </p>
                    </DrawerTitle>
                    <DrawerDescription>

                    </DrawerDescription>
                </DrawerHeader>

                <CodeEditor defaultValue={editDocumentDefaultJson} />

                <DrawerFooter className="w-full">
                    <Button className="text-white max-w">Save</Button>
                </DrawerFooter>
            </div>
        </DrawerMenu>
    )
}