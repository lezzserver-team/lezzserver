import {
  AreaChartIcon,
  DeleteIcon,
  FolderArchiveIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";

export interface DataThreeDotsMenu {
  icon: React.ComponentType<{ className?: string }>;
  label:
  | "Schema and Indexes"
  | "Metrics"
  | "Clear Table"
  | "Delete Table and Indexes";
  color?: string;
  path?: string;
  type: ThreeDotsMenuType["type"];
  content?: React.ReactNode
}

type ThreeDotsMenuType =
  | ThreeDotsMenuTypeModal
  | ThreeDotsMenuTypeDrawer
  | ThreeDotsMenuTypeLink;

type ThreeDotsMenuTypeModal = {
  type: "modal";
};

type ThreeDotsMenuTypeDrawer = {
  type: "drawer";
};

type ThreeDotsMenuTypeLink = {
  type: "link";
  path: string;
};

export const DATA_THREE_DOTS_MENU: DataThreeDotsMenu[] = [
  {
    icon: FolderArchiveIcon,
    label: "Schema and Indexes",
    color: "black",
    type: "drawer",
  },
  {
    icon: AreaChartIcon,
    label: "Metrics",
    color: "black",
    type: "modal",
    get content() {
      return (
        <DialogContent className="max-w-2xl">
          <DialogHeader className="text-lg font-bold">
            {this.label}
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4">
            </div>
          </DialogDescription>
        </DialogContent>
      );
    }
  },
  {
    icon: DeleteIcon,
    label: "Clear Table",
    color: "red",
    type: "modal",
    get content() {
      return (
        <DialogContent className="max-w-2xl">
          <DialogHeader className="text-lg font-bold">
            {this.label}
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4">
              <p>Delete all documents in this table?</p>
              <p>Clearing a large table may take a few minutes to complete. Keep this dialogue open while clearing is in progress. Documents that are created during the clear operation may not be deleted.</p>
            </div>
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
      );
    }
  },
  {
    icon: TrashIcon,
    label: "Delete Table and Indexes",
    color: "red",
    type: "modal",
    get content() {
      return (
        <DialogContent className="max-w-2xl">
          <DialogHeader className="text-lg font-bold">
            {this.label}
          </DialogHeader>
          <DialogDescription>
            <p>Are you sure you want to permanently delete this table and its indexes?</p>
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
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      );
    }
  },
];
