import { JSX } from "react";

import { combineClass } from "@/utils/functions/format";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Section({ children, className, ...rest }: Props): JSX.Element {
  return (
    <div
      className={combineClass(
        "p-6 rounded-2xl border border-slate-300",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
