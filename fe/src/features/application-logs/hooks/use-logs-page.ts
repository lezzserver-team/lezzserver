import { useContext } from "react";
import { LogsPageContext } from "../context/logs-page-context";

export const useLogsPage = () => {
  const context = useContext(LogsPageContext);
  if (!context) {
    throw new Error("useDataPage must be used within a DataPageProvider");
  }
  return context;
};
