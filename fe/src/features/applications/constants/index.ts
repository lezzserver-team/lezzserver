import {
  ActivityLogIcon,
  CodeIcon,
  CountdownTimerIcon,
  FileIcon,
  GearIcon,
  StopwatchIcon,
  TableIcon,
} from "@radix-ui/react-icons";

export const SIDEBAR_ITEMS_TOP = [
  { label: "Functions", path: "/functions", icon: CodeIcon },
  { label: "Data", path: "/data", icon: TableIcon },
  { label: "Files", path: "/files", icon: FileIcon },
  { label: "Schedules", path: "/schedules", icon: StopwatchIcon },
  { label: "Logs", path: "/logs", icon: ActivityLogIcon },
  { label: "History", path: "/history", icon: CountdownTimerIcon },
];

export const SIDEBAR_ITEMS_BOTTOM = [
  { label: "Settings", path: "/settings", icon: GearIcon },
];
