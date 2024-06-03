import { NewTabIcon } from "@/components/icons/new-tab";
import { TrashIcon } from "@/components/icons/trash";
import { Button } from "@/components/ui/button";
import { CustomMarkdown } from "@/components/ui/custom-markdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { markdownCode } from "@/features/application-function/utils";
import { CardWrapper } from "@/features/applications/layouts/card-wrapper";
import Link from "next/link";
import { useSchedulesFunctionsPage } from "../hooks/use-schedules-functions-page";

export function SchedulesFunctionsPage() {
    const { MDEmptyAllFunctions, functions } = useSchedulesFunctionsPage()

    return (
        <div className="space-y-4">
            <div className="w-full flex items-center justify-between">
                <p className="text-md ml-4">Total scheduled runs <span className="font-bold">0</span></p>
                <div className="flex space-x-2">
                    <Select
                    // value={selectedValue}
                    // onValueChange={(value) => { onChange(value) }}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="All functions" />
                        </SelectTrigger>
                        <SelectContent>
                            {functions?.map((functionItem) =>
                                [...functionItem.methods].reverse().map((method) => {
                                    return (
                                        <SelectItem
                                            key={`${functionItem.displayName}:${method}`}
                                            value={`${functionItem.displayName}:${method}`}
                                        >
                                            {functionItem.displayName}:{method}
                                        </SelectItem>
                                    )
                                })
                            )}
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Cancel All
                    </Button>
                </div>
            </div>

            <CardWrapper className="p-10 flex flex-col space-y-4 items-center justify-center">
                <p className="text-3xl">Schedule functions to run later</p>
                <p className="text-md">Add scheduling to your Lezzserver project by using the scheduler.</p>

                <CustomMarkdown className="w-max-[500px]">
                    {markdownCode("typescript", MDEmptyAllFunctions)}
                </CustomMarkdown>

                <p className="flex items-center text-md font-normal text-primary hover:underline">
                    <Link href="#">Learn more about scheduled functions</Link>
                    <NewTabIcon className="ml-2 h-4 w-4" />
                </p>
            </CardWrapper>
        </div>
    )
}