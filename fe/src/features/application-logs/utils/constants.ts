export interface LogsCheckboxItem {
  label: string;
  checked: boolean;
}

export const FUNCTION_STATUS: LogsCheckboxItem[] = [
  {
    label: "success",
    checked: true,
  },
  {
    label: "failure",
    checked: true,
  },
];

export const LOG_SEVERITY: LogsCheckboxItem[] = [
  {
    label: "error",
    checked: true,
  },
  {
    label: "warn",
    checked: true,
  },
  {
    label: "log / info",
    checked: true,
  },
  {
    label: "debug",
    checked: true,
  },
  {
    label: "no log lines",
    checked: true,
  },
];
