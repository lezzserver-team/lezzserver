import { Editor, EditorProps } from "@monaco-editor/react";
import { editor } from 'monaco-editor';

interface CodeEditorProps extends EditorProps {
    options?: editor.IStandaloneEditorConstructionOptions;
}

export function CodeEditor({
    height = "70vh",
    language = "json",
    options = { minimap: { enabled: false } },
    ...props
}: Readonly<CodeEditorProps>) {
    return (
        <Editor
            height={height}
            language={language}
            options={options}
            {...props}
        />
    )
}