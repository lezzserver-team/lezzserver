"use client";

import * as React from "react";

import { combineClass } from "@/utils/functions/format";

import { Input } from "@/components/ui/input";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { useAppsMenu } from "@/features/applications/hooks/use-apps-menu";

export function AppsMenu(): React.JSX.Element {
    const {
        filteredApplications,
        search,
        onAdd,
        onClick,
        onSearchChange,
    } = useAppsMenu();

    return (
        <Menubar className="border-none shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                    <p>{"Applications"}</p>
                </MenubarTrigger>
                <MenubarContent className="w-96 px-0 py-0 bg-white">
                    <div className="flex gap-6 px-6 py-3">
                        <Input
                            className="w-full border-0 outline:none focus:outline-none"
                            onChange={(e) => {
                                onSearchChange(e.target.value);
                            }}
                            placeholder="Search"
                            value={search}
                        />
                    </div>

                    {filteredApplications.map((app) => (
                        <MenubarItem
                            className={combineClass(
                                "px-6 py-3",
                                // app.id === application?.id ? "bg-slate-100" : ""
                            )}
                            key={app.id}
                            onClick={() => {
                                onClick(app.id);
                            }}
                        >
                            {app.name}
                        </MenubarItem>
                    ))}

                    <MenubarItem
                        className="bg-primary gap-2 px-6 py-2 bg-slate-50 border-t"
                        onClick={onAdd}
                    >
                        <p className="text-xl text-bold text-primary">+</p>
                        <p className="text-primary">Create New Project</p>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
