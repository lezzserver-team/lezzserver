import { NewTabIcon } from "@/components/icons/new-tab";
import { CustomMarkdown } from "@/components/ui/custom-markdown";
import { markdownCode } from "@/features/application-function/utils";
import { CardWrapper } from "@/features/applications/layouts/card-wrapper";
import Link from "next/link";
import { useSchedulesCronsPage } from "../hooks/use-schedules-crons-page";

export function SchedulesCronsPage() {
    const { MDEmptyCrons } = useSchedulesCronsPage()

    return (
        <div className="space-y-4">
            <CardWrapper className="p-10 flex flex-col space-y-4 items-center justify-center">
                <p className="text-3xl">Run backend code on a regular schedule</p>
                <p className="text-md">Cron jobs are defined in the lezzserver/crons.js file.</p>

                <CustomMarkdown className="w-max-[500px]">
                    {markdownCode("typescript", MDEmptyCrons)}
                </CustomMarkdown>

                <p className="flex items-center text-md font-normal text-primary hover:underline">
                    <Link href="#">Learn more about cron jobs</Link>
                    <NewTabIcon className="ml-2 h-4 w-4" />
                </p>
            </CardWrapper>
        </div>
    )
}