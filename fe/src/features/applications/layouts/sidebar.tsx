"use client";

import { useRouter } from "@/hooks/use-router";
import { useParams, usePathname } from "next/navigation";

import { Sidebar } from "@/components/layouts/side-bar";
import { SidebarItem } from "@/components/shared/sidebar-item";
import { Separator } from "@/components/ui/separator";
import { SIDEBAR_ITEMS_BOTTOM, SIDEBAR_ITEMS_TOP } from "../constants";

export function ApplicationSidebar(): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const { appId } = useParams();

  return (
    <Sidebar className="flex flex-col p-2 border border-primary-foreground/5">
      <div className="flex-shrink-0 flex flex-col gap-2">
        {SIDEBAR_ITEMS_TOP.map((item) => {
          const Icon = item.icon
          return (
            <SidebarItem
              key={item.label}
              isActive={pathname.includes(item.path)}
              onClick={() => {
                router.push(`/dashboard/${appId as string}/${item.path}`);
              }}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </SidebarItem>
          )
        })}
        <Separator />
        {SIDEBAR_ITEMS_BOTTOM.map((item) => {
          const Icon = item.icon
          return (
            <SidebarItem
              key={item.label}
              isActive={pathname.includes(item.path)}
              onClick={() => {
                router.push(`/dashboard/${appId as string}/${item.path}`);
              }}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </SidebarItem>
          )
        })}
      </div>
    </Sidebar>
  );
}
