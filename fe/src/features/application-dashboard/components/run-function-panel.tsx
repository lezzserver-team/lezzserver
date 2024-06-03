import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PropsWithChildren, RefObject } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { RunFunctionInput } from "./run-function-input";
import { RunFunctionQueryOutput } from "./run-function-query-output";

export interface RunFunctionPanelProps extends PropsWithChildren {
    refResize: RefObject<ImperativePanelHandle>
}

export function RunFunctionPanel({
    children,
    refResize
}: Readonly<RunFunctionPanelProps>) {
    return (
        <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] w-full rounded-lg border"
        >
            <ResizablePanel defaultSize={50}>
                {children}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={0} ref={refResize}>
                <div className="flex h-full w-full items-center justify-center">
                    <RunFunctionInput />
                    <RunFunctionQueryOutput />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}