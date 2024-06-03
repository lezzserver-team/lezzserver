"use client";

import { Icon, IconProps } from "../ui/icon";

export function SlashOutline({
  className,
  size,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <Icon className={className} size={size} {...props}>
      <path
        clipRule="evenodd"
        d="M6.5744 22.4L15.1456 1.60001H17.3088L8.736 22.4H6.5744Z"
        fillRule="evenodd"
      />
    </Icon>
  );
}
