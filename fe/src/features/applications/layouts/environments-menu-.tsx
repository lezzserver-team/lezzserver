"use client";

import * as React from "react";

import { combineClass } from "@/utils/functions/format";

import { ConnectionStatus } from "@/components/shared/connection-status";
import { IconProps } from "@/components/ui/icon";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import { ENVIRONMENTS_MENU_BOTTOM, ENVIRONMENTS_MENU_TOP } from "../utils/constants";

export function EnvironmentsMenu(): React.JSX.Element {
    const currentEnvironment = "Dev"

    return (
        <Menubar className="border-none shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                    {currentEnvironment === "Dev" ?
                        <ConnectionStatus variant="green">
                            <p>Dev</p>
                        </ConnectionStatus>
                        :
                        <ConnectionStatus variant="red">
                            <p>Prod</p>
                        </ConnectionStatus>
                    }
                </MenubarTrigger>
                <MenubarContent className="w-48 px-0 py-5 bg-white">
                    <p className="text-xs px-6 pb-3">Choose Deployment</p>

                    {ENVIRONMENTS_MENU_TOP.map((app) => {
                        const Icon = app.icon as React.FC<IconProps>;
                        return (
                            <MenubarItem
                                className={combineClass(
                                    "px-6 py-3",
                                    // app.id === application?.id ? "bg-slate-100" : ""
                                )}
                                key={app.label}
                                onClick={() => { }}
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                {app.label}
                            </MenubarItem>
                        )
                    })}

                    <Separator className="my-4" />

                    {ENVIRONMENTS_MENU_BOTTOM.map((app) => {
                        const Icon = app.icon as React.FC<IconProps>;
                        return (
                            <MenubarItem
                                className={combineClass(
                                    "px-6 py-3",
                                    // app.id === application?.id ? "bg-slate-100" : ""
                                )}
                                key={app.label}
                                onClick={() => { }}
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                {app.label}
                            </MenubarItem>
                        )
                    })}

                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
