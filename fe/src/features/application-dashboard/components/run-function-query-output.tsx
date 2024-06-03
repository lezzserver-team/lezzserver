import { CodeEditor } from "@/components/shared/code-editor"
import { Badge } from "@/components/ui/badge"
import { ExitIcon } from "@radix-ui/react-icons"
import { useApplicationDashboardLayout } from "../hooks/use-application-dashboard-layout"
import { useRunFunctionPanel } from "../hooks/use-run-function-panel"

export function RunFunctionQueryOutput() {
    const { data } = useRunFunctionPanel()
    const { refResize } = useApplicationDashboardLayout()

    return (
        <div className="border flex-1 h-full items-center justify-center">
            <div className="flex items-center w-full h-[30px] justify-between bg-primary-foreground/5 border px-3 py-1">
                <p className="text-sm font-medium">QUERY OUTPUT </p>
                <div>
                    <Badge
                        onClick={() => { refResize.current?.resize(0) }}
                        className="bg-transparent hover:bg-muted/30 cursor-pointer"
                    >
                        <ExitIcon />
                    </Badge>
                </div>
            </div>
            <div className="flex flex-col space-y-4 p-2">
                <CodeEditor
                    value={data}
                    options={
                        {
                            readOnly: true,
                            minimap: { enabled: false },
                            lineNumbers: 'off',
                            lineDecorationsWidth: 0,
                            lineNumbersMinChars: 0
                        }
                    }
                />
            </div>
        </div>
    )
}