import Markdown, { Options } from "react-markdown";
import { CodeSnippet } from "./code-snippet";

type Props = Options & {
  highlightLine?: number
};

export const CustomMarkdown = ({ children, highlightLine, ...rest }: Props): JSX.Element => {
  return (
    <Markdown
      components={{
        code: ({ ...rest }) => CodeSnippet({ highlightLine, ...rest }),
      }}
      {...rest}
    >
      {children as string}
    </Markdown>
  );
};
