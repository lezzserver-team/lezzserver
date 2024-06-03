import { ThreeDotsIcon } from "@/components/icons/three-dots";
import { Button } from "@/components/ui/button";
import { CustomMarkdown } from "@/components/ui/custom-markdown";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogPortal
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconProps } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { MultiDialog } from "@/components/ui/multiple-dialog";
import { markdownCode } from "@/features/application-function/utils";
import { useRouter } from "@/hooks/use-router";
import { ApplicationEntity } from "@/services/applications/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useAppCardThreeDotsMenu } from "../hooks/use-app-card-three-dots-menu";
import { APP_CARD_THREE_DOTS_MENU, AppThreeDotsMenu } from "../utils/constants";

export type AppCardThreeDotsMenuModals = AppThreeDotsMenu["label"]

export interface AppCardThreeDotsMenuProps {
    application: ApplicationEntity
}

export function AppCardThreeDotsMenu({ application }: Readonly<AppCardThreeDotsMenuProps>) {
    const router = useRouter()
    const {
        onDelete,
        canDelete,
        inputDelete,
        onChangeDelete
    } = useAppCardThreeDotsMenu({ application })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant="ghost" size="sm">
                    <ThreeDotsIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <MultiDialog<AppCardThreeDotsMenuModals>>
                {(mdb) => (<>
                    <DropdownMenuContent>
                        {APP_CARD_THREE_DOTS_MENU.map((menu) => {
                            const Icon = menu.icon as React.FC<IconProps>;
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

                    <mdb.Container value="Lost Access">
                        <Dialog>
                            <DialogPortal>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader className="text-lg font-bold">
                                        Lost Access
                                    </DialogHeader>
                                    <DialogDescription>
                                        <p>
                                            Reinitialize a Lezzserver app in your local directory if you&apos;ve lost your <span className="bg-slate-200 p-1 mx-1 rounded-lg">.env.local</span> file.
                                        </p>
                                        <CustomMarkdown>
                                            {markdownCode("bash", `npx lezzserver dev --configure=existing --project "${application.name}"`)}
                                        </CustomMarkdown>
                                    </DialogDescription>
                                </DialogContent>
                            </DialogPortal>
                        </Dialog>
                    </mdb.Container>

                    <mdb.Container value="Delete Project">
                        <Dialog>
                            <DialogPortal>
                                <DialogContent>
                                    <DialogHeader className="text-lg font-bold">
                                        Delete Project
                                    </DialogHeader>
                                    <DialogDescription className="space-y-4">
                                        <p>
                                            Are you sure you want delete this project? Deleted projects cannot be recovered.
                                        </p>
                                        <p>
                                            Type <span className="bg-slate-200 p-1 m-1 rounded-lg"> {application.name} </span> in the box below to confirm.
                                        </p>

                                        <Input
                                            placeholder={`Enter ${application.name} to continue.`}
                                            value={inputDelete}
                                            onChange={onChangeDelete}
                                        />
                                    </DialogDescription>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="secondary" className="bg-muted">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            disabled={!canDelete}
                                            onClick={onDelete}
                                            variant={canDelete ? "destructive" : "secondary"}
                                        >
                                            Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </DialogPortal>
                        </Dialog>
                    </mdb.Container>
                </>)}
            </MultiDialog>
        </DropdownMenu>
    )
}