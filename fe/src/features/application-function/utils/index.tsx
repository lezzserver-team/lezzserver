import { SyntaxHighlighterProps } from "react-syntax-highlighter";

export function markdownCode(
    language: SyntaxHighlighterProps["language"],
    code?: string,
): string {
    return `
\`\`\`${language}
${code}
\`\`\`
`;
}