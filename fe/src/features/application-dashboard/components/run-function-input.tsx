import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRunFunctionPanel } from "../hooks/use-run-function-panel";
import { RunFunctionInputArgument } from "./run-function-input-argument";

export function RunFunctionInput() {
    const {
        onChange,
        functions,
        selectedValue,
    } = useRunFunctionPanel()

    return (
        <div className="border flex-1 h-full items-center justify-center">
            <div className="flex items-center w-full h-[30px] bg-primary-foreground/5 border px-3 py-1">
                <p className="text-sm font-medium">FUNCTION INPUT </p>
            </div>
            <div className="flex flex-col space-y-4 p-2">
                <Select
                    value={selectedValue}
                    onValueChange={(value) => { onChange(value) }}
                >
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select a function..." />
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

                {!!selectedValue && <RunFunctionInputArgument />}
            </div>
        </div>
    )
}