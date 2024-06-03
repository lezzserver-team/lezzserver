"use client";

import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes } from "react";

import { combineClass } from "@/utils/functions/format";
import { UserMenu } from "../shared/user-menu";
import { Separator } from "../ui/separator";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  leftContent?: NavbarProps["children"];
  middleContent?: NavbarProps["children"];
  rightContent?: NavbarProps["children"];
}

export function Navbar({
  className,
  leftContent,
  middleContent,
  rightContent,
  ...rest
}: Readonly<NavbarProps>): React.JSX.Element {
  return (
    <nav
      className={combineClass(
        "bg-background border-b flex-grow-0 flex-shrink-0",
      )}
      {...rest}
    >
      <div
        className={combineClass(
          "w-full max-w-screen-2xl h-16 max-h-16 flex items-center justify-between px-6 mx-auto",
          className,
        )}
      >
        <div className="flex-1 flex items-center gap-3">
          <div className="flex items-center justify-start">
            <Link href="/dashboard">
              <Image
                alt="brand image"
                height={21}
                src="/images/brand.svg"
                style={{ objectFit: "contain" }}
                width={110}
              />
            </Link>
            {leftContent}
          </div>
          <div className="flex-1 flex justify-center items-center">
            {middleContent}
          </div>
          <div className="flex-1 flex justify-end items-center">
            {rightContent}
            {Boolean(rightContent) && (
              <Separator className="mx-4 h-5" orientation="vertical" />
            )}
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
