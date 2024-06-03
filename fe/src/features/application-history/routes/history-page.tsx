import { DatePicker } from "@/components/shared/date-picker";
import { ContentWrapper } from "@/components/ui/content-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CardWrapper } from "@/features/applications/layouts/card-wrapper";
import { HistoryItem } from "../components/history-item";

export function HistoryPage() {
    return (
        <ContentWrapper className="space-y-2 p-5 overflow-hidden">
            <CardWrapper>
                <div className="w-full h-fit space-y-2 py-2">
                    <p className="text-sm font-medium">DATES</p>
                    <div className="flex space-x-2 items-center">
                        <DatePicker placeholder="Start Date" />
                        <p className="text-sm">-</p>
                        <DatePicker placeholder="End Date" />
                    </div>
                </div>
                <Separator />
                <ScrollArea className="w-full h-[60vh] pt-2">
                    {Array.from({ length: 10 }, (_, i) => <HistoryItem key={i} />)}
                </ScrollArea>
            </CardWrapper>
        </ContentWrapper>
    )
}