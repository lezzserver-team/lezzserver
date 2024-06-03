import { CodeEditor } from "@/components/shared/code-editor"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PlayIcon, QuestionMarkCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import { useRunFunctionInputArgument } from "../hooks/use-run-function-input-argument"
import { useRunFunctionPanel } from "../hooks/use-run-function-panel"

export function RunFunctionInputArgument() {
    const {
        onMutation,
        onChangeArguments,
        isPendingMutation,
    } = useRunFunctionPanel()

    const { argumentOptions, parsedFunction } = useRunFunctionInputArgument()

    return (
        <div className="flex flex-col w-full space-y-4">
            <div className="flex space-x-2 items-center">
                <Checkbox />
                <p>Act as a user</p>
                <QuestionMarkCircledIcon className="h-4 w-4" />
            </div>

            <p className="font-bold text-sm">ARGUMENTS</p>
            <CodeEditor value={argumentOptions.defaultValue} onChange={onChangeArguments} height={argumentOptions.height} className="border" options={{
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 2
            }} />
            {parsedFunction?.type === "mutation" && (
                <Button
                    disabled={isPendingMutation}
                    onClick={onMutation}
                    className="text-white"
                    variant="default"
                >
                    {isPendingMutation ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <PlayIcon className="mr-2 h-4 w-4" />}
                    Run Mutation
                </Button>
            )}
        </div>
    )
}