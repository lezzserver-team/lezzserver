import { Card, CardContent } from "@/components/ui/card";
import { Code2Icon, RefreshCw } from "lucide-react";

export function HistoryItem() {
    return (
        <div className="flex flex-col space-y-2 mb-5">
            <div className="flex justify-between">
                <div className="flex space-x-2 items-center">
                    <div className="flex">
                        <p>suryaelidanto@gmail.com</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <div className="flex items-center justify-center bg-primary rounded-full w-6 h-6">
                            <Code2Icon className="h-4 w-4 text-white" />
                        </div>
                        <p>updated the configuration</p>
                    </div>
                </div>
                <p className="text-sm">5 hours ago</p>
            </div>
            <Card>
                <CardContent className="flex space-x-2 items-center p-2">
                    <RefreshCw className="h-4 w-4" />
                    <p>deployed functions</p>
                </CardContent>
            </Card>
        </div>
    )
}