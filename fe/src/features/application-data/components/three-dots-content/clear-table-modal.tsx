import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPortal
} from "@/components/ui/dialog";

export function ClearTableModal() {
    return (
        <Dialog>
            <DialogPortal>
                <DialogContent className="max-w-2xl">
                    <DialogHeader className="text-lg font-bold">
                        Clear Table
                    </DialogHeader>
                    <DialogDescription className="space-y-4">
                        <p>
                            Delete all documents in this table?
                        </p>
                        <p>
                            Clearing a large table may take a few minutes to complete. Keep this dialogue open while clearing is in progress. Documents that are created during the clear operation may not be deleted.
                        </p>
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary" className="bg-muted">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={() => { }}
                            variant="destructive"
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}