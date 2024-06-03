"use client";

import type { IconProps } from "../ui/icon";
import { Icon } from "../ui/icon";

export function LogoutOutline({
  className,
  size,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <Icon className={className} size={size} {...props}>
      <path
        d="M17.4399 14.62L19.9999 12.06L17.4399 9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M9.76001 12.06H19.93"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </Icon>
  );
}
