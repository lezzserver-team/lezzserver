import Link from "next/link";
import { HTMLAttributes, JSX } from "react";

import { combineClass } from "@/utils/functions/format";
import { AltArrowRightOutline } from "../icons/alt-arrow-right-outline";

interface BreadcrumbsProps {
  links: BreadcrumbsLink[];
  currentPath?: string;
  separator?: JSX.Element;
}

export interface BreadcrumbsLink {
  label?:
  | string
  | JSX.Element
  | ((props: HTMLAttributes<HTMLDivElement>) => JSX.Element);
  path: string;
}

export function Breadcrumbs({
  links,
  currentPath,
  separator = (
    <AltArrowRightOutline className="fill-muted-foreground" size={16} />
  ),
}: Readonly<BreadcrumbsProps>): React.JSX.Element {
  return (
    <ul className="list-none flex items-center gap h-8">
      {links.map((link) => {
        const linkClassName = combineClass(
          "text-muted-foreground text-sm px-3",
          currentPath === link.path && "text-muted-foreground/60"
        );

        return (
          <li
            className="h-8 flex items-center"
            key={`${typeof link.label === "string" && link.label}-${link.path}`}
          >
            {separator}

            {typeof link.label === "string" && (
              <Link href={link.path}>
                <p className={linkClassName}>{link.label}</p>
              </Link>
            )}

            {typeof link.label === "object" && link.label}

            {typeof link.label === "function" &&
              link.label({ className: linkClassName })}
          </li>
        );
      })}
    </ul>
  );
}
