import { ConnectionStatus } from "@/components/shared/connection-status";
import { ContentWrapper } from "@/components/ui/content-wrapper";
import { CardWrapper } from "@/features/applications/layouts/card-wrapper";
import Link from "next/link";
import { LogsItem } from "../components/logs-item";
import { LogsSidebar } from "../components/logs-sidebar";
import { useLogsPage } from "../hooks/use-logs-page";


export function LogsPage() {
    const { results: fakeData } = useLogsPage()

    return (
        <div className="flex">
            <LogsSidebar />
            <ContentWrapper className="p-5 space-y-4">
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <p className="text-lg font-bold">Logs</p>
                        <ConnectionStatus variant="green">
                            <p className="text-sm">Connected</p>
                        </ConnectionStatus>
                    </div>
                    <p className="text-xs">This page is a realtime stream of events occuring within this deployment. Logs will appear here as functions are called. Learn more
                        Want more out of your logs? <Link href="#" className="text-primary hover:underline">Configure a log stream</Link></p>
                </div>
                <CardWrapper className="space-y-4">
                    {fakeData.map((item) =>
                        <LogsItem
                            key={item.date}
                            date={item.date}
                            hours={item.hours}
                            ms={item.ms}
                            status={item.status}
                            type={item.type}
                            query={item.query}
                        />)}
                </CardWrapper>
            </ContentWrapper>
        </div>
    )

}
