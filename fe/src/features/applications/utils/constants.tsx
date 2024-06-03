import { EyeOpenIcon, GearIcon, TrashIcon } from "@radix-ui/react-icons";
import { RadioIcon, ScanEyeIcon, TerminalSquareIcon } from "lucide-react";

export interface AppThreeDotsMenu {
  icon: React.ComponentType<{ className?: string }>;
  label: "Settings" | "Lost Access" | "Delete Project";
  color: string;
  path?: string
}

export const APP_CARD_THREE_DOTS_MENU: AppThreeDotsMenu[] = [
  {
    icon: GearIcon,
    label: "Settings",
    color: "black",
    path: "/dashboard/settings",
  },
  {
    icon: EyeOpenIcon,
    label: "Lost Access",
    color: "black",
  },
  {
    icon: TrashIcon,
    label: "Delete Project",
    color: "red",
  },
];

export const ENVIRONMENTS_MENU_TOP = [
  {
    icon: RadioIcon,
    label: "Production",
  },
  {
    icon: TerminalSquareIcon,
    label: "Development",
  },
  {
    icon: ScanEyeIcon,
    label: "Preview",
  },
];

export const ENVIRONMENTS_MENU_BOTTOM = [
  {
    icon: GearIcon,
    label: "Project Settings",
  },
];
