import {
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/components/ui/drawer";
import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

interface DrawerMenuProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
    direction?: "right" | "left" | "top" | "bottom",
    drawerTrigger: React.ReactNode
}

export function DrawerMenu({
    direction = "right",
    children,
    drawerTrigger
}: Readonly<DrawerMenuProps>) {
    return (
        <Drawer direction={direction}>
            <DrawerTrigger asChild>
                {drawerTrigger}
            </DrawerTrigger>
            <DrawerContent
                showBar={false}
                className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
                {children}
            </DrawerContent>
        </Drawer>
    )
}