import { ThreeDotsIcon } from "@/components/icons/three-dots";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogPortal
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconProps } from "@/components/ui/icon";
import { MultiDialog } from "@/components/ui/multiple-dialog";
import { useRouter } from "@/hooks/use-router";
import { DATA_THREE_DOTS_MENU, type DataThreeDotsMenu } from "../utils/constants";

export type DataThreeDotsMenuModals = DataThreeDotsMenu["label"]

export interface DataThreeDotsMenuProps { }

export function DataThreeDotsMenu() {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button variant="outline">
                    <ThreeDotsIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <Drawer direction="right">
                <MultiDialog<DataThreeDotsMenuModals>>
                    {(mdb) => (<>
                        <DropdownMenuContent align="end">
                            {DATA_THREE_DOTS_MENU.map((menu) => {
                                const Icon = menu.icon as React.FC<IconProps>;

                                if (menu.type === "drawer") {
                                    return (
                                        <DrawerTrigger key={menu.label} asChild>
                                            <DropdownMenuItem
                                                style={{ color: menu.color }}
                                            >
                                                <Icon className="mr-2 h-4 w-4" />
                                                {menu.label}
                                            </DropdownMenuItem>
                                        </DrawerTrigger>
                                    )
                                }

                                return (
                                    <mdb.Trigger
                                        key={menu.label}
                                        value={menu.label}
                                    >
                                        <DropdownMenuItem
                                            style={{ color: menu.color }}
                                            onClick={() => menu.path ? router.push(menu.path) : null}
                                        >
                                            <Icon className="mr-2 h-4 w-4" />
                                            {menu.label}
                                        </DropdownMenuItem>
                                    </mdb.Trigger>
                                )
                            })}
                        </DropdownMenuContent>

                        {DATA_THREE_DOTS_MENU.map((menu) => {
                            if (menu.type === "drawer") return (
                                <DrawerContent
                                    showBar={false}
                                    className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'
                                >
                                    <DrawerHeader>
                                        <DrawerTitle>
                                            {menu.label}
                                        </DrawerTitle>
                                        <DrawerDescription>
                                            {menu.content}
                                        </DrawerDescription>
                                    </DrawerHeader>
                                </DrawerContent>
                            )

                            return (
                                <mdb.Container key={menu.label} value={menu.label}>
                                    <Dialog>
                                        <DialogPortal>
                                            {menu.content}
                                        </DialogPortal>
                                    </Dialog>
                                </mdb.Container>
                            )
                        })}
                    </>)}
                </MultiDialog>
            </Drawer>


        </DropdownMenu>
    )
}
