"use client"

import { useCopy } from "@/hooks/use-copy";
import { capitalizeFirstLetter, combineClass } from "@/utils/functions/format";
import type { HTMLAttributes } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyOutline } from "../icons/copy-outline";
import { Button } from "./button";

type CodeSnippetProps = HTMLAttributes<HTMLDivElement> & {
  highlightLine?: number
};

export function CodeSnippet({
  children,
  className,
  highlightLine,
  ...rest
}: CodeSnippetProps) {
  const { onCopy } = useCopy();

  const { node } = rest as unknown as { node: { data: { meta: string } } };

  const name = node.data?.meta;
  const language = className?.split("-")[1] as string;
  const codeString = String(children);

  if (!language) return <code className={className}>{children}</code>;

  return (
    <div
      className={combineClass(
        "w-full flex flex-col rounded-md text-slate-200 overflow-auto bg-[#282C34] px-4 py-2",
        className
      )}
      {...rest}
    >
      <div
        className={combineClass("flex justify-between items-center", className)}
      >
        <div className="flex flex-row items-center text-sm gap-2 text-slate-500">
          {name ?? capitalizeFirstLetter(language)}
        </div>

        <Button
          className="p-1 h-min"
          onClick={() => onCopy(codeString, "Content successfully copied!")}
          variant="ghost"
        >
          <CopyOutline
            className="stroke-slate-200 fill-transparent"
            size={18}
          />
        </Button>
      </div>

      <SyntaxHighlighter
        showLineNumbers={true}
        wrapLines={true}
        lineProps={(lineNumber) => {
          const style: any = { display: "block", width: "fit-content" };
          if (highlightLine == lineNumber) {
            style.backgroundColor = "#FFE04E";
          }
          return { style };
        }}
        customStyle={{ padding: 0 }}
        codeTagProps={{ className: "text-sm" }}
        language={language}
        style={atomOneDark}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
