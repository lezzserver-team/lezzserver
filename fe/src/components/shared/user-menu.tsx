"use client";

// import { useRouter } from "next/navigation";
import type { JSX } from "react";

// import { useAuthLogout } from "@/services/auth/hooks/use-auth-logout";
// import { useSession } from "@/services/me/hooks/use-session";

import { getInitial } from "@/utils/functions/format";
import { LogoutOutline } from "../icons/logout-outline";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function UserMenu(): JSX.Element {
  // const router = useRouter();
  // const { data: user } = useSession();
  // const { mutateAsync: logout } = useAuthLogout();

  // const handleLogout = async () => {
  //   await logout();
  //   router.replace("/login");
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarFallback className="uppercase bg-primary text-white">
            {getInitial("Test")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{"Test"}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => { }}>
          <LogoutOutline
            className="fill-transparent stroke-foreground mr-2"
            size={20}
          />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export { UserMenu };
