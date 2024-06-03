"use client";

import * as React from "react";

export type IconProps = React.PropsWithChildren & {
  size?: number;
  className?: string;
};

export const Icon = ({
  children,
  className = "fill-black",
  size = 24,
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      className={className}
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
};
